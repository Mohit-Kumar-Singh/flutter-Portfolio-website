// Tiny UI sounds (synthesised with Web Audio — no files to load) and haptic taps on phones.
// Only ever triggered by a click or tap, never on page load. Visitors can mute sounds from the nav.

export type Cue = "tap" | "toggle" | "dark" | "open" | "close" | "success";

// [frequency Hz, start s, duration s]
const TONES: Record<Cue, [number, number, number][]> = {
  tap: [[880, 0, 0.05]],
  // Rising for light mode, falling for dark.
  toggle: [
    [660, 0, 0.06],
    [990, 0.05, 0.07],
  ],
  dark: [
    [990, 0, 0.06],
    [660, 0.05, 0.09],
  ],
  open: [
    [520, 0, 0.08],
    [780, 0.06, 0.1],
  ],
  close: [
    [780, 0, 0.08],
    [520, 0.06, 0.1],
  ],
  success: [
    [660, 0, 0.08],
    [880, 0.08, 0.08],
    [1320, 0.16, 0.16],
  ],
};

// Vibration patterns in ms (Android Chrome; iOS Safari doesn't support vibration).
const HAPTICS: Record<Cue, number | number[]> = {
  tap: 8,
  toggle: 12,
  dark: 12,
  open: 14,
  close: 10,
  success: [10, 50, 20],
};

const KEY = "sound";
const listeners = new Set<() => void>();
let ctx: AudioContext | null = null;

export function isSoundOn() {
  try {
    return localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

export function setSoundOn(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {}
  listeners.forEach((l) => l());
}

export function subscribeSound(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function play(cue: Cue) {
  ctx ??= new AudioContext();
  const now = ctx.currentTime;
  for (const [freq, start, dur] of TONES[cue]) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    // Quick fade in/out so there's no click, and kept very quiet.
    gain.gain.setValueAtTime(0, now + start);
    gain.gain.linearRampToValueAtTime(0.035, now + start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + start);
    osc.stop(now + start + dur + 0.02);
  }
}

export function feedback(cue: Cue) {
  if (typeof window === "undefined") return;
  // Browsers block vibration until the visitor has tapped the page at least once.
  if (window.matchMedia("(pointer: coarse)").matches && navigator.userActivation?.hasBeenActive) {
    navigator.vibrate?.(HAPTICS[cue]);
  }
  if (isSoundOn()) {
    try {
      play(cue);
    } catch {}
  }
}

// Haptic only — for playful touches (like the car under the employer's name) where a sound would be too much.
export function haptic(cue: Cue = "tap") {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(pointer: coarse)").matches && navigator.userActivation?.hasBeenActive) {
    navigator.vibrate?.(HAPTICS[cue]);
  }
}
