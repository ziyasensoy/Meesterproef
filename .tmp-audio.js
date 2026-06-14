/**
 * Layer-specific procedural soundscapes via Web Audio API.
 */
import { playSeagullCall, playFishSound, playWaveLap } from './wildlife-audio.js';

const LAYER_PROFILES = {
  intro: {
    waterFilter: 1050,
    waterGain: 0.22,
    airGain: 0.1,
    subGain: 0,
    subFreq: 60,
    pulseGain: 0,
    pulseFreq: 0,
    bubbleGain: 0,
    waveWashGain: 0.06,
    lfoRate: 0.07,
    lfoDepth: 110,
    masterGain: 0.28,
  },
  surface: {
    waterFilter: 820,
    waterGain: 0.24,
    airGain: 0.04,
    subGain: 0.015,
    subFreq: 72,
    pulseGain: 0,
    pulseFreq: 0,
    bubbleGain: 0,
    waveWashGain: 0.22,
    lfoRate: 0.045,
    lfoDepth: 75,
    masterGain: 0.32,
  },
  nature: {
    waterFilter: 380,
    waterGain: 0.28,
    airGain: 0,
    subGain: 0,
    subFreq: 60,
    pulseGain: 0,
    pulseFreq: 0,
    bubbleGain: 0.06,
    waveWashGain: 0,
    lfoRate: 0.05,
    lfoDepth: 70,
    masterGain: 0.3,
  },
  pollution: {
    waterFilter: 260,
    waterGain: 0.26,
    airGain: 0,
    subGain: 0.04,
    subFreq: 48,
    pulseGain: 0,
    pulseFreq: 0,
    bubbleGain: 0.02,
    waveWashGain: 0,
    lfoRate: 0.03,
    lfoDepth: 40,
    masterGain: 0.27,
  },
  infrastructure: {
    waterFilter: 180,
    waterGain: 0.18,
    airGain: 0,
    subGain: 0.09,
    subFreq: 55,
    pulseGain: 0.05,
    pulseFreq: 2.4,
    bubbleGain: 0,
    waveWashGain: 0,
    lfoRate: 0.02,
    lfoDepth: 25,
    masterGain: 0.32,
  },
  connection: {
    waterFilter: 480,
    waterGain: 0.24,
    airGain: 0.03,
    subGain: 0.03,
    subFreq: 65,
    pulseGain: 0.025,
    pulseFreq: 1.2,
    bubbleGain: 0.03,
    waveWashGain: 0.08,
    lfoRate: 0.06,
    lfoDepth: 90,
    masterGain: 0.3,
  },
  finale: {
    waterFilter: 880,
    waterGain: 0.2,
    airGain: 0.07,
    subGain: 0,
    subFreq: 60,
    pulseGain: 0,
    pulseFreq: 0,
    bubbleGain: 0,
    waveWashGain: 0.14,
    lfoRate: 0.04,
    lfoDepth: 60,
    masterGain: 0.22,
  },
};

function lerpProfile(a, b, t) {
  const out = {};
  for (const key of Object.keys(a)) {
    out[key] = a[key] + (b[key] - a[key]) * t;
  }
  return out;
}

function createNoiseBuffer(ctx, type = 'brown') {
  const bufferSize = 2 * ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    if (type === 'brown') {
      last = (last + 0.02 * white) / 1.02;
      output[i] = last * 3.5;
    } else {
      output[i] = white * 0.5;
    }
  }
  return buffer;
}

export class OceanAudio {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.layer = 'intro';
    this.depth = 0;
    this.introPin = 0;
    this.nodes = {};
    this.wildlifeTimer = null;
    this.waveLapTimer = null;
  }

  init() {
    if (this.ctx) return;

    const ctx = this.ctx = new AudioContext();

    this.nodes.master = ctx.createGain();
    this.nodes.master.gain.value = 0;
    this.nodes.master.connect(ctx.destination);

    // Water (brown noise → lowpass)
    this.nodes.waterFilter = ctx.createBiquadFilter();
    this.nodes.waterFilter.type = 'lowpass';
    this.nodes.waterGain = ctx.createGain();

    const waterNoise = ctx.createBufferSource();
    waterNoise.buffer = createNoiseBuffer(ctx, 'brown');
    waterNoise.loop = true;
    waterNoise.connect(this.nodes.waterFilter);
    this.nodes.waterFilter.connect(this.nodes.waterGain);
    this.nodes.waterGain.connect(this.nodes.master);
    waterNoise.start();

    // Gentle wave wash - slow rolling swell (surface layer)
    this.nodes.waveWashFilter = ctx.createBiquadFilter();
    this.nodes.waveWashFilter.type = 'lowpass';
    this.nodes.waveWashFilter.frequency.value = 420;
    this.nodes.waveWashGain = ctx.createGain();
    this.nodes.waveWashGain.gain.value = 0;

    const washNoise = ctx.createBufferSource();
    washNoise.buffer = createNoiseBuffer(ctx, 'brown');
    washNoise.loop = true;
    washNoise.connect(this.nodes.waveWashFilter);
    this.nodes.waveWashFilter.connect(this.nodes.waveWashGain);
    this.nodes.waveWashGain.connect(this.nodes.master);
    washNoise.start();

    this.nodes.washLfo = ctx.createOscillator();
    this.nodes.washLfo.type = 'sine';
    this.nodes.washLfo.frequency.value = 0.035;
    this.nodes.washLfoDepth = ctx.createGain();
    this.nodes.washLfoDepth.gain.value = 0.18;
    this.nodes.washLfo.connect(this.nodes.washLfoDepth);
    this.nodes.washLfoDepth.connect(this.nodes.waveWashGain.gain);
    this.nodes.washLfo.start();

    // Air/wind (white noise → highpass)
    this.nodes.airFilter = ctx.createBiquadFilter();
    this.nodes.airFilter.type = 'highpass';
    this.nodes.airFilter.frequency.value = 2200;
    this.nodes.airGain = ctx.createGain();

    const airNoise = ctx.createBufferSource();
    airNoise.buffer = createNoiseBuffer(ctx, 'white');
    airNoise.loop = true;
    airNoise.connect(this.nodes.airFilter);
    this.nodes.airFilter.connect(this.nodes.airGain);
    this.nodes.airGain.connect(this.nodes.master);
    airNoise.start();

    // Sub rumble
    this.nodes.subOsc = ctx.createOscillator();
    this.nodes.subOsc.type = 'sine';
    this.nodes.subGain = ctx.createGain();
    this.nodes.subOsc.connect(this.nodes.subGain);
    this.nodes.subGain.connect(this.nodes.master);
    this.nodes.subOsc.start();

    // Pulse - cable energy
    this.nodes.pulseAmp = ctx.createGain();
    this.nodes.pulseOsc = ctx.createOscillator();
    this.nodes.pulseOsc.type = 'triangle';
    this.nodes.pulseOsc.frequency.value = 160;
    this.nodes.pulseOsc.connect(this.nodes.pulseAmp);
    this.nodes.pulseAmp.connect(this.nodes.master);
    this.nodes.pulseOsc.start();

    this.nodes.pulseLfo = ctx.createOscillator();
    this.nodes.pulseLfo.type = 'sine';
    this.nodes.pulseLfoDepth = ctx.createGain();
    this.nodes.pulseLfoDepth.gain.value = 0;
    this.nodes.pulseLfo.connect(this.nodes.pulseLfoDepth);
    this.nodes.pulseLfoDepth.connect(this.nodes.pulseAmp.gain);
    this.nodes.pulseLfo.start();

    // Bubbles (bandpassed white noise)
    this.nodes.bubbleFilter = ctx.createBiquadFilter();
    this.nodes.bubbleFilter.type = 'bandpass';
    this.nodes.bubbleFilter.frequency.value = 1400;
    this.nodes.bubbleFilter.Q.value = 2;
    this.nodes.bubbleGain = ctx.createGain();

    const bubbleNoise = ctx.createBufferSource();
    bubbleNoise.buffer = createNoiseBuffer(ctx, 'white');
    bubbleNoise.loop = true;
    bubbleNoise.connect(this.nodes.bubbleFilter);
    this.nodes.bubbleFilter.connect(this.nodes.bubbleGain);
    this.nodes.bubbleGain.connect(this.nodes.master);
    bubbleNoise.start();

    this.nodes.bubbleLfo = ctx.createOscillator();
    this.nodes.bubbleLfo.type = 'sine';
    this.nodes.bubbleLfo.frequency.value = 0.25;
    this.nodes.bubbleLfoDepth = ctx.createGain();
    this.nodes.bubbleLfoDepth.gain.value = 0.04;
    this.nodes.bubbleLfo.connect(this.nodes.bubbleLfoDepth);
    this.nodes.bubbleLfoDepth.connect(this.nodes.bubbleGain.gain);
    this.nodes.bubbleLfo.start();

    // Wave LFO on water filter
    this.nodes.waveLfo = ctx.createOscillator();
    this.nodes.waveLfo.type = 'sine';
    const waveLfoGain = ctx.createGain();
    this.nodes.waveLfo.connect(waveLfoGain);
    waveLfoGain.connect(this.nodes.waterFilter.frequency);
    this.nodes.waveLfo.start();
    this.nodes.waveLfoGain = waveLfoGain;

    this.applyProfile(LAYER_PROFILES.intro, 0, true);
  }

  getBlendedProfile() {
    let profile = { ...LAYER_PROFILES[this.layer] };

    if (this.layer === 'intro' && this.introPin > 0) {
      profile = lerpProfile(LAYER_PROFILES.intro, LAYER_PROFILES.nature, Math.min(1, this.introPin * 1.3));
    }

    const depthShift = this.depth * 0.35;
    profile.waterFilter *= 1 - depthShift * 0.55;
    profile.waterGain *= 1 + depthShift * 0.15;
    profile.airGain *= 1 - depthShift * 1.2;
    profile.waveWashGain *= 1 - depthShift * 0.9;
    profile.masterGain *= 1 - depthShift * 0.1;

    return profile;
  }

  applyProfile(profile, time, immediate = false) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const ramp = immediate ? 0.01 : 1.8;

    const set = (param, value) => {
      if (immediate) {
        param.setValueAtTime(value, t);
      } else {
        param.setTargetAtTime(value, t, ramp * 0.35);
      }
    };

    set(this.nodes.waterFilter.frequency, profile.waterFilter);
    set(this.nodes.waterGain.gain, profile.waterGain);
    set(this.nodes.airGain.gain, profile.airGain);
    set(this.nodes.waveWashGain.gain, profile.waveWashGain);
    set(this.nodes.subOsc.frequency, profile.subFreq);
    set(this.nodes.subGain.gain, profile.subGain);
    set(this.nodes.pulseLfo.frequency, profile.pulseFreq || 0.01);
    set(this.nodes.pulseAmp.gain, profile.pulseGain * 0.6);
    set(this.nodes.pulseLfoDepth.gain, profile.pulseGain * 0.5);
    set(this.nodes.bubbleGain.gain, profile.bubbleGain);
    set(this.nodes.bubbleLfoDepth.gain, profile.bubbleGain * 0.6);
    set(this.nodes.waveLfo.frequency, profile.lfoRate);
    set(this.nodes.waveLfoGain.gain, profile.lfoDepth);

    if (this.enabled) {
      set(this.nodes.master.gain, profile.masterGain);
    }
  }

  startWildlifeLoop() {
    this.stopWildlifeLoop();
    this.scheduleWildlife();
    this.scheduleWaveLaps();
  }

  stopWildlifeLoop() {
    clearTimeout(this.wildlifeTimer);
    clearTimeout(this.waveLapTimer);
    this.wildlifeTimer = null;
    this.waveLapTimer = null;
  }

  scheduleWildlife() {
    if (!this.enabled || !this.ctx) return;

    let delay;
    if (this.layer === 'surface') {
      delay = 6000 + Math.random() * 9000;
    } else if (this.layer === 'nature') {
      delay = 1200 + Math.random() * 2800;
    } else {
      return;
    }

    this.wildlifeTimer = setTimeout(() => {
      if (!this.enabled || !this.ctx) return;
      const t = this.ctx.currentTime + 0.05;

      if (this.layer === 'surface') {
        playSeagullCall(this.ctx, this.nodes.master, t);
        if (Math.random() > 0.5) {
          playSeagullCall(this.ctx, this.nodes.master, t + 0.35 + Math.random() * 0.4);
        }
      } else if (this.layer === 'nature') {
        playFishSound(this.ctx, this.nodes.master, t);
        if (Math.random() > 0.6) {
          playFishSound(this.ctx, this.nodes.master, t + 0.2 + Math.random() * 0.5);
        }
      }

      this.scheduleWildlife();
    }, delay);
  }

  scheduleWaveLaps() {
    if (!this.enabled || !this.ctx) return;

    if (this.layer !== 'surface' && this.layer !== 'intro' && this.layer !== 'finale') {
      return;
    }

    const delay = this.layer === 'surface'
      ? 3500 + Math.random() * 4000
      : 5000 + Math.random() * 6000;

    this.waveLapTimer = setTimeout(() => {
      if (!this.enabled || !this.ctx) return;

      if (this.layer === 'surface' || this.layer === 'intro' || this.layer === 'finale') {
        playWaveLap(this.ctx, this.nodes.master, this.ctx.currentTime + 0.05);
      }

      this.scheduleWaveLaps();
    }, delay);
  }

  async enable() {
    this.init();
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    this.enabled = true;
    const profile = this.getBlendedProfile();
    const t = this.ctx.currentTime;
    this.nodes.master.gain.cancelScheduledValues(t);
    this.nodes.master.gain.setValueAtTime(0, t);
    this.nodes.master.gain.linearRampToValueAtTime(profile.masterGain, t + 1.8);
    this.applyProfile(profile, t);
    this.startWildlifeLoop();
  }

  disable() {
    if (!this.ctx) return;
    this.enabled = false;
    this.stopWildlifeLoop();
    const t = this.ctx.currentTime;
    this.nodes.master.gain.cancelScheduledValues(t);
    this.nodes.master.gain.linearRampToValueAtTime(0, t + 0.8);
  }

  toggle() {
    if (this.enabled) {
      this.disable();
      return Promise.resolve(false);
    }
    return this.enable().then(() => true);
  }

  setLayer(layer) {
    if (!LAYER_PROFILES[layer]) return;
    const changed = this.layer !== layer;
    this.layer = layer;

    if (this.enabled) {
      this.applyProfile(this.getBlendedProfile());
      if (changed) {
        this.startWildlifeLoop();
      }
    }
  }

  setDepth(norm) {
    this.depth = norm;
    if (this.enabled) {
      this.applyProfile(this.getBlendedProfile());
    }
  }

  setIntroPin(p) {
    this.introPin = p;
    if (this.enabled && this.layer === 'intro') {
      this.applyProfile(this.getBlendedProfile());
    }
  }

  isEnabled() {
    return this.enabled;
  }
}
