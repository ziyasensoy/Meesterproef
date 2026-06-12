/**
 * Layered ambient audio — looping MP3 tracks with smooth crossfades.
 * Intro + surface: seasounds (+ layer1 on surface).
 * Underwater layers: underwater.mp3 (+ one layer accent at a time).
 */
import seasoundsUrl from "@/assets/seasounds.mp3";
import underwaterUrl from "@/assets/underwater.mp3";
import layer1Url from "@/assets/layer1.mp3";
import layer2Url from "@/assets/layer2.mp3";
import layer3Url from "@/assets/layer3.mp3";
import layer4Url from "@/assets/layer4.mp3";
import type { LayerId } from "@/types/journey";

type SceneLayerId = Exclude<LayerId, "dive">;
type TrackId = "seasounds" | "underwater" | "layer1" | "layer2" | "layer3" | "layer4";

const TRACK_URLS: Record<TrackId, string> = {
  seasounds: seasoundsUrl,
  underwater: underwaterUrl,
  layer1: layer1Url,
  layer2: layer2Url,
  layer3: layer3Url,
  layer4: layer4Url,
};

/** Target gain per track — ambient beds louder, accents subtle. */
const TRACK_GAIN: Record<TrackId, number> = {
  seasounds: 0.32,
  underwater: 0.26,
  layer1: 0.1,
  layer2: 0.09,
  layer3: 0.09,
  layer4: 0.09,
};

const FADE_MS = 650;

interface LayerMix {
  ambient: TrackId | null;
  accent: TrackId | null;
}

/** Layers where seasounds / layer1 may play (title + above-water only). */
const SURFACE_LAYERS: ReadonlySet<SceneLayerId> = new Set(["intro", "surface"]);

const LAYER_MIX: Record<SceneLayerId, LayerMix> = {
  intro: { ambient: "seasounds", accent: null },
  surface: { ambient: "seasounds", accent: "layer1" },
  nature: { ambient: "underwater", accent: "layer2" },
  pollution: { ambient: "underwater", accent: "layer3" },
  infrastructure: { ambient: "underwater", accent: "layer4" },
  history: { ambient: "underwater", accent: null },
  politics: { ambient: "underwater", accent: null },
  finale: { ambient: "underwater", accent: null },
};

interface ManagedTrack {
  id: TrackId;
  buffer: AudioBuffer;
  source: AudioBufferSourceNode | null;
  gain: GainNode;
}

export interface OceanAudioScrollState {
  layer: LayerId;
  submerge: number;
  depth: number;
  introPin: number;
}

function isSceneLayer(layer: LayerId): layer is SceneLayerId {
  return layer in LAYER_MIX;
}

export class OceanAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private tracks = new Map<TrackId, ManagedTrack>();
  private loadPromise: Promise<void> | null = null;
  private enabled = false;
  private layer: SceneLayerId = "intro";
  private autoplayBlocked = false;

  init(): void {
    if (this.ctx) return;
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    this.ctx = ctx;
    this.master = master;
  }

  private async ensureLoaded(): Promise<void> {
    const ctx = this.ctx;
    if (!ctx || this.tracks.size > 0) return;

    if (!this.loadPromise) {
      this.loadPromise = (async () => {
        const entries = Object.entries(TRACK_URLS) as [TrackId, string][];
        await Promise.all(
          entries.map(async ([id, url]) => {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = await ctx.decodeAudioData(arrayBuffer);
            const gain = ctx.createGain();
            gain.gain.value = 0;
            gain.connect(this.master!);
            this.tracks.set(id, { id, buffer, source: null, gain });
          }),
        );
      })();
    }

    await this.loadPromise;
  }

  private ensureSource(track: ManagedTrack): void {
    const ctx = this.ctx;
    if (!ctx || track.source) return;

    const source = ctx.createBufferSource();
    source.buffer = track.buffer;
    source.loop = true;
    source.connect(track.gain);
    source.start(0);
    track.source = source;
  }

  private fadeTrack(track: ManagedTrack, target: number, immediate = false): void {
    const ctx = this.ctx;
    if (!ctx) return;

    if (target > 0) this.ensureSource(track);

    const t = ctx.currentTime;
    const ramp = immediate ? 0.02 : FADE_MS / 1000;
    track.gain.gain.cancelScheduledValues(t);
    track.gain.gain.setValueAtTime(track.gain.gain.value, t);
    track.gain.gain.linearRampToValueAtTime(target, t + ramp);

    if (target === 0 && track.source) {
      const source = track.source;
      window.setTimeout(() => {
        if (track.gain.gain.value > 0.001) return;
        try {
          source.stop();
        } catch {
          /* already stopped */
        }
        source.disconnect();
        track.source = null;
      }, immediate ? 50 : FADE_MS + 80);
    }
  }

  private applyLayerMix(layer: SceneLayerId, immediate = false): void {
    const mix = LAYER_MIX[layer];
    const active = new Set<TrackId>();
    if (mix.ambient) active.add(mix.ambient);
    if (mix.accent) active.add(mix.accent);

    for (const track of this.tracks.values()) {
      let target = active.has(track.id) ? TRACK_GAIN[track.id] : 0;

      if (
        !SURFACE_LAYERS.has(layer) &&
        (track.id === "seasounds" || track.id === "layer1")
      ) {
        target = 0;
      }

      this.fadeTrack(track, target, immediate);
    }
  }

  private setLayer(layer: LayerId, immediate = false): void {
    if (!isSceneLayer(layer)) return;
    const changed = layer !== this.layer;
    this.layer = layer;
    if (!this.enabled) return;
    if (changed || immediate) this.applyLayerMix(layer, immediate);
  }

  async enable(): Promise<void> {
    this.init();
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;

    try {
      if (ctx.state === "suspended") await ctx.resume();
    } catch {
      this.autoplayBlocked = true;
    }

    await this.ensureLoaded();

    const domLayer = document.body.dataset.layer;
    if (domLayer && isSceneLayer(domLayer as LayerId)) {
      this.layer = domLayer as SceneLayerId;
    }

    this.enabled = true;
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.linearRampToValueAtTime(1, t + 0.4);
    this.applyLayerMix(this.layer, true);
  }

  disable(): void {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;

    this.enabled = false;
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.linearRampToValueAtTime(0, t + 0.6);

    for (const track of this.tracks.values()) {
      this.fadeTrack(track, 0);
    }
  }

  toggle(): Promise<boolean> {
    if (this.enabled) {
      this.disable();
      return Promise.resolve(false);
    }
    return this.enable().then(() => true);
  }

  /** Resume audio after a user gesture when autoplay was blocked. */
  async unlockFromGesture(): Promise<void> {
    const ctx = this.ctx;
    if (!ctx) return;
    if (ctx.state === "suspended") {
      await ctx.resume();
      this.autoplayBlocked = false;
    }
    if (!this.enabled) await this.enable();
  }

  isAutoplayBlocked(): boolean {
    return this.autoplayBlocked;
  }

  syncFromScroll(state: OceanAudioScrollState): void {
    this.setLayer(state.layer);
  }

  setLayerFromObserver(layer: LayerId): void {
    this.setLayer(layer, false);
  }

  forceSyncLayer(layer: LayerId): void {
    this.setLayer(layer, false);
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}
