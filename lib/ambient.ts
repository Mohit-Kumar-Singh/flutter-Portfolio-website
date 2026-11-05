import { audioContext, isSoundOn, subscribeSound } from "@/lib/feedback";

// A soft, slowly changing chord pad that plays quietly in the background for as long as the page is open.
// Synthesised with Web Audio (no files to load). It tries to start as soon as the page loads; browsers
// usually block sound until the visitor's first click, tap or key press, so it starts then instead.
// The nav's sound toggle mutes it, and it fades out while the tab is in the background.

// Voice-led chords, each four notes (Hz): Fmaj7 → Em7 → Dm9 → Cadd9.
const CHORDS = [
  [174.61, 220.0, 261.63, 329.63],
  [164.81, 196.0, 246.94, 293.66],
  [146.83, 220.0, 261.63, 329.63],
  [130.81, 196.0, 293.66, 329.63],
];
const CHORD_SECONDS = 9;
// Overall loudness — low, kept under the UI sounds.
const VOLUME = 0.035;
const FADE_IN = 4;

type Pad = { master: GainNode; lfo: OscillatorNode; oscs: OscillatorNode[][] };

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

  return { master, lfo, oscs };
}

export function initAmbient() {
  let pad: Pad | null = null;
  let chord = 0;
  let chordTimer = 0;
  const ctx = audioContext();

  const glideTo = (index: number) => {
    if (!pad) return;
    const now = ctx.currentTime;
    CHORDS[index].forEach((freq, v) => pad!.oscs[v].forEach((o) => o.frequency.setTargetAtTime(freq, now, 1.5)));
  };

  const setLevel = (level: number, seconds: number) => {
    if (!pad) return;
    pad.master.gain.cancelScheduledValues(ctx.currentTime);
    pad.master.gain.setTargetAtTime(level, ctx.currentTime, seconds / 3);
  };

  const play = () => {
    if (!isSoundOn() || document.hidden) return;
    pad ??= buildPad(ctx);
    if (ctx.state === "suspended") ctx.resume();
    setLevel(VOLUME, FADE_IN);
    chordTimer ||= window.setInterval(() => {
      chord = (chord + 1) % CHORDS.length;
      glideTo(chord);
    }, CHORD_SECONDS * 1000);
  };

  const stop = () => {
    setLevel(0, 0.6);
    window.clearInterval(chordTimer);
    chordTimer = 0;
  };

  // Once the audio is actually running, the first-interaction listeners are no longer needed.
  const onInteract = () => {
    play();
    if (ctx.state === "running" || !isSoundOn()) removeUnlock();
  };
  const unlockEvents = ["pointerdown", "keydown", "touchend"] as const;
  const removeUnlock = () => unlockEvents.forEach((e) => window.removeEventListener(e, onInteract));
  unlockEvents.forEach((e) => window.addEventListener(e, onInteract, { passive: true }));

  const onVisibility = () => (document.hidden ? stop() : play());
  const unsubscribe = subscribeSound(() => (isSoundOn() ? play() : stop()));
  document.addEventListener("visibilitychange", onVisibility);

  // Try right away — works where the browser already allows sound for this site.
  play();

  return () => {
    removeUnlock();
    document.removeEventListener("visibilitychange", onVisibility);
    unsubscribe();
    window.clearInterval(chordTimer);
    if (pad) {
      pad.master.disconnect();
      [pad.lfo, ...pad.oscs.flat()].forEach((o) => o.stop());
    }
  };
}
