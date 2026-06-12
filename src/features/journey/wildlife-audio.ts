/**
 * Procedural wildlife sounds — seagulls & fish.
 */

const WILDLIFE_VOLUME = 0.62;

export function playSeagullCall(
  ctx: AudioContext,
  destination: AudioNode,
  time: number,
): void {
  const t = time;
  const pan = ctx.createStereoPanner();
  pan.pan.value = (Math.random() - 0.5) * 1.4;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.055 * WILDLIFE_VOLUME, t + 0.05);
  gain.gain.linearRampToValueAtTime(0.035 * WILDLIFE_VOLUME, t + 0.35);
  gain.gain.linearRampToValueAtTime(0, t + 1.1);

  const osc = ctx.createOscillator();
  osc.type = "sine";
  const base = 750 + Math.random() * 350;
  osc.frequency.setValueAtTime(base, t);
  osc.frequency.exponentialRampToValueAtTime(base * 0.42, t + 0.4);
  osc.frequency.linearRampToValueAtTime(base * 0.58, t + 0.65);

  const osc2 = ctx.createOscillator();
  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(base * 1.35, t + 0.08);
  osc2.frequency.exponentialRampToValueAtTime(base * 0.5, t + 0.45);

  osc.connect(gain);
  osc2.connect(gain);
  gain.connect(pan);
  pan.connect(destination);

  osc.start(t);
  osc.stop(t + 1.2);
  osc2.start(t + 0.08);
  osc2.stop(t + 0.7);
}

function playBubblePop(
  ctx: AudioContext,
  destination: AudioNode,
  time: number,
): void {
  const t = time;
  const pan = ctx.createStereoPanner();
  pan.pan.value = (Math.random() - 0.5) * 1.6;

  const bufferSize = Math.floor(ctx.sampleRate * 0.08);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 600 + Math.random() * 800;
  filter.Q.value = 1.2;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.07 * WILDLIFE_VOLUME, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(pan);
  pan.connect(destination);
  source.start(t);
  source.stop(t + 0.1);
}

function playFishClick(
  ctx: AudioContext,
  destination: AudioNode,
  time: number,
): void {
  const t = time;
  const pan = ctx.createStereoPanner();
  pan.pan.value = (Math.random() - 0.5) * 1.8;

  const osc = ctx.createOscillator();
  osc.type = "sine";
  const freq = 180 + Math.random() * 320;
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.6, t + 0.06);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.045 * WILDLIFE_VOLUME, t + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

  osc.connect(gain);
  gain.connect(pan);
  pan.connect(destination);
  osc.start(t);
  osc.stop(t + 0.15);
}

function playFishFlutter(
  ctx: AudioContext,
  destination: AudioNode,
  time: number,
): void {
  const t = time;
  const pan = ctx.createStereoPanner();
  pan.pan.value = (Math.random() - 0.5) * 1.6;

  for (let i = 0; i < 3; i++) {
    const offset = i * 0.045;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    const freq = 120 + Math.random() * 200;
    osc.frequency.setValueAtTime(freq, t + offset);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.4, t + offset + 0.04);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t + offset);
    gain.gain.linearRampToValueAtTime(0.025 * WILDLIFE_VOLUME, t + offset + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.08);

    osc.connect(gain);
    gain.connect(pan);
    osc.start(t + offset);
    osc.stop(t + offset + 0.1);
  }

  pan.connect(destination);
}

export function playFishSound(
  ctx: AudioContext,
  destination: AudioNode,
  time: number,
): void {
  const roll = Math.random();
  if (roll < 0.45) {
    playBubblePop(ctx, destination, time);
  } else if (roll < 0.8) {
    playFishClick(ctx, destination, time);
  } else {
    playFishFlutter(ctx, destination, time);
  }
}

export function playWaveLap(
  ctx: AudioContext,
  destination: AudioNode,
  time: number,
): void {
  const t = time;
  const bufferSize = Math.floor(ctx.sampleRate * 1.2);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.015 * white) / 1.015;
    const env = Math.sin((i / bufferSize) * Math.PI);
    data[i] = last * env * 0.8;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 480 + Math.random() * 200;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12 * WILDLIFE_VOLUME, t);
  gain.gain.linearRampToValueAtTime(0, t + 1.1);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  source.start(t);
  source.stop(t + 1.2);
}
