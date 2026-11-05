import { audioContext, isSoundOn, subscribeSound } from "@/lib/feedback";

// A soft, slowly changing chord pad that swells while the visitor scrolls and fades away when they stop.
// Synthesised with Web Audio (no files to load). Browsers only allow audio after a click, tap or key
// press, so nothing plays until the visitor has interacted once. The nav's sound toggle mutes it.

// Voice-led chords, each four notes (Hz): Fmaj7 → Em7 → Dm9 → Cadd9.
const CHORDS = [
  [174.61, 220.0, 261.63, 329.63],
  [164.81, 196.0, 246.94, 293.66],
  [146.83, 220.0, 261.63, 329.63],
  [130.81, 196.0, 293.66, 329.63],
];
const CHORD_SECONDS = 9;
// Overall loudness while scrolling — kept well under the UI sounds.
const QUIET = 0.03;
const LOUD = 0.055;
const IDLE_MS = 1400;
// After this long with nothing playing, the audio clock is paused to save battery.
const SLEEP_MS = 8000;

type Pad = { master: GainNode; oscs: OscillatorNode[][] };

function impulse(ctx: AudioContext, seconds: number) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  }
  return buf;
}

function buildPad(ctx: AudioContext): Pad {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Warm it up: a low-pass filter whose cutoff breathes slowly.
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.Q.value = 0.3;
  const lfo = ctx.createOscillator();
  const lfoDepth = ctx.createGain();
  lfo.frequency.value = 0.05;
  lfoDepth.gain.value = 300;
  lfo.connect(lfoDepth).connect(filter.frequency);
  lfo.start();

  // Half dry, half through a long generated reverb.
  const dry = ctx.createGain();
  dry.gain.value = 0.55;
  const reverb = ctx.createConvolver();
  reverb.buffer = impulse(ctx, 4);
  const wet = ctx.createGain();
  wet.gain.value = 0.6;
  filter.connect(dry).connect(master);
  filter.connect(reverb).connect(wet).connect(master);

  // Each note: a sine and a slightly detuned triangle, for a gentle chorus.
  const oscs = CHORDS[0].map((freq) => {
    const voice = ctx.createGain();
    voice.gain.value = 0.16;
    voice.connect(filter);
    return (["sine", "triangle"] as const).map((type, i) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;
      osc.detune.value = i === 0 ? -4 : 5;
      osc.connect(voice);
      osc.start();
      return osc;
    });
  });

  return { master, oscs };
}

export function initAmbient() {
  let pad: Pad | null = null;
  let chord = 0;
  let lastY = window.scrollY;
  let lastT = performance.now();
  let idleTimer = 0;
  let sleepTimer = 0;
  let chordTimer = 0;

  const ctx = () => audioContext();

  const glideTo = (index: number) => {
    if (!pad) return;
    const now = ctx().currentTime;
    CHORDS[index].forEach((freq, v) => pad!.oscs[v].forEach((o) => o.frequency.setTargetAtTime(freq, now, 1.5)));
  };

  const fadeOut = (seconds = 1.2) => {
    if (!pad) return;
    const c = ctx();
    pad.master.gain.cancelScheduledValues(c.currentTime);
    pad.master.gain.setTargetAtTime(0, c.currentTime, seconds / 3);
    window.clearInterval(chordTimer);
    chordTimer = 0;
    window.clearTimeout(sleepTimer);
    sleepTimer = window.setTimeout(() => {
      if (ctx().state === "running") ctx().suspend();
    }, SLEEP_MS);
  };

  // Browsers need a real interaction before audio can start; build the pad on the first one.
  const unlock = () => {
    if (!isSoundOn()) return;
    const c = ctx();
    if (c.state === "suspended") c.resume();
    pad ??= buildPad(c);
  };

  const onScroll = () => {
    const t = performance.now();
    const speed = Math.abs(window.scrollY - lastY) / Math.max(t - lastT, 1); // px per ms
    lastY = window.scrollY;
    lastT = t;
    if (!pad || !isSoundOn() || document.hidden) return;

    const c = ctx();
    window.clearTimeout(sleepTimer);
    if (c.state === "suspended") c.resume();

    const level = QUIET + (LOUD - QUIET) * Math.min(1, speed / 3);
    pad.master.gain.cancelScheduledValues(c.currentTime);
    pad.master.gain.setTargetAtTime(level, c.currentTime, 0.4);

    if (!chordTimer) {
      chordTimer = window.setInterval(() => {
        chord = (chord + 1) % CHORDS.length;
        glideTo(chord);
      }, CHORD_SECONDS * 1000);
    }

    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => fadeOut(), IDLE_MS);
  };

  const onVisibility = () => document.hidden && fadeOut(0.3);
  const unsubscribe = subscribeSound(() => !isSoundOn() && fadeOut(0.3));

  const opts = { passive: true } as const;
  window.addEventListener("pointerdown", unlock, opts);
  window.addEventListener("keydown", unlock, opts);
  window.addEventListener("scroll", onScroll, opts);
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onVisibility);
    unsubscribe();
    window.clearTimeout(idleTimer);
    window.clearTimeout(sleepTimer);
    window.clearInterval(chordTimer);
    if (pad) {
      pad.master.disconnect();
      pad.oscs.flat().forEach((o) => o.stop());
    }
  };
}
