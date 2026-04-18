const ctx = typeof window !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;

function play(freq, type, duration, gain = 0.3, delay = 0) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const vol = ctx.createGain();
  osc.connect(vol);
  vol.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
  vol.gain.setValueAtTime(0, ctx.currentTime + delay);
  vol.gain.linearRampToValueAtTime(gain, ctx.currentTime + delay + 0.01);
  vol.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration);
}

export function resumeCtx() {
  if (ctx?.state === 'suspended') ctx.resume();
}

export function playClick() {
  resumeCtx();
  play(440, 'sine', 0.08, 0.15);
}

export function playSuccess() {
  resumeCtx();
  play(523, 'sine', 0.12, 0.2, 0);
  play(659, 'sine', 0.12, 0.2, 0.1);
  play(784, 'sine', 0.18, 0.25, 0.2);
}

export function playFail() {
  resumeCtx();
  play(300, 'sawtooth', 0.15, 0.15, 0);
  play(250, 'sawtooth', 0.15, 0.15, 0.12);
}

export function playFanfare() {
  resumeCtx();
  const notes = [523, 659, 784, 1047];
  notes.forEach((f, i) => play(f, 'sine', 0.25, 0.25, i * 0.13));
  play(1047, 'sine', 0.5, 0.3, notes.length * 0.13);
}

export function playSelect() {
  resumeCtx();
  play(660, 'sine', 0.06, 0.1);
}
