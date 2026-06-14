/**
 * Layered ambient audio - seasounds is a dedicated channel (title + layer 1).
 * Other tracks load lazily per layer.
 */
import seasoundsUrl from "@/assets/seasounds.mp3";
import underwaterUrl from "@/assets/underwater.mp3";
import layer1Url from "@/assets/layer1.mp3";
import layer2Url from "@/assets/layer2.mp3";
import layer3Url from "@/assets/layer3.mp3";
import layer4Url from "@/assets/layer4.mp3";
import type { LayerId } from "@/types/journey";

type SceneLayerId = Exclude<LayerId, "dive">;
type LayerTrackId = "underwater" | "layer1" | "layer2" | "layer3" | "layer4";

const LAYER_TRACK_URLS: Record<LayerTrackId, string> = {
  underwater: underwaterUrl,
  layer1: layer1Url,
  layer2: layer2Url,
  layer3: layer3Url,
  layer4: layer4Url,
};

const TRACK_GAIN: Record<LayerTrackId, number> = {
  underwater: 0.26,
  layer1: 0.18,
  layer2: 0.09,
  layer3: 0.09,
  layer4: 0.09,
};

const SEASOUNDS_GAIN = 0.32;
const FADE_MS = 650;
const RELEASE_DELAY_MS = FADE_MS + 250;

const SEASOUNDS_LAYERS = new Set<SceneLayerId>(["intro", "surface"]);

function isSeasoundsLayer(layer: SceneLayerId): boolean {
  return SEASOUNDS_LAYERS.has(layer);
}

interface LayerMix {
  ambient: LayerTrackId | null;
  accent: LayerTrackId | null;
}

const LAYER_MIX: Record<SceneLayerId, LayerMix> = {
  intro: { ambient: null, accent: null },
  surface: { ambient: null, accent: null },
  nature: { ambient: "underwater", accent: "layer2" },
  pollution: { ambient: "underwater", accent: "layer3" },
  infrastructure: { ambient: "underwater", accent: "layer4" },
  history: { ambient: "underwater", accent: null },
  politics: { ambient: "underwater", accent: null },
  finale: { ambient: "underwater", accent: null },
};

interface ManagedTrack {
  id: LayerTrackId;
  element: HTMLAudioElement | null;
  mediaSource: MediaElementAudioSourceNode | null;
  gain: GainNode;
  loadPromise: Promise<void> | null;
  releaseTimer: number | null;
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

function activeTracksForLayer(layer: SceneLayerId): Set<LayerTrackId> {
  const mix = LAYER_MIX[layer];
  const active = new Set<LayerTrackId>();
  if (mix.ambient) active.add(mix.ambient);
  if (mix.accent) active.add(mix.accent);
  return active;
}

/** Preloaded at construction - never destroyed until OceanAudio.destroy(). */
class SeasoundsChannel {
  private readonly element: HTMLAudioElement;
  private gain: GainNode | null = null;
  private source: MediaElementAudioSourceNode | null = null;

  constructor(url: string) {
    this.element = new Audio(url);
    this.element.loop = true;
    this.element.preload = "auto";
    this.element.load();
  }

  wire(ctx: AudioContext, master: GainNode): void {
    if (this.gain) return;

    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(master);
    const source = ctx.createMediaElementSource(this.element);
    source.connect(gain);
    this.gain = gain;
    this.source = source;
  }

  async play(immediate = false): Promise<void> {
    if (!this.gain) return;

    const ctx = this.gain.context as AudioContext;
    const t = ctx.currentTime;
    const ramp = immediate ? 0.02 : FADE_MS / 1000;
    this.gain.gain.cancelScheduledValues(t);
    this.gain.gain.setValueAtTime(this.gain.gain.value, t);
    this.gain.gain.linearRampToValueAtTime(SEASOUNDS_GAIN, t + ramp);

    if (this.element.paused) {
      try {
        await this.element.play();
      } catch {
        /* blocked until user gesture */
      }
    }
  }

  stop(immediate = false): void {
    if (!this.gain) return;

    const ctx = this.gain.context as AudioContext;
    const t = ctx.currentTime;
    const ramp = immediate ? 0.02 : FADE_MS / 1000;
    this.gain.gain.cancelScheduledValues(t);
    this.gain.gain.setValueAtTime(this.gain.gain.value, t);
    this.gain.gain.linearRampToValueAtTime(0, t + ramp);
    this.element.pause();
  }

  muteNow(): void {
    if (this.gain) {
      this.gain.gain.cancelScheduledValues(0);
      this.gain.gain.value = 0;
    }
    this.element.pause();
  }

  destroy(): void {
    this.muteNow();
    this.source?.disconnect();
    this.gain?.disconnect();
    this.element.removeAttribute("src");
    this.element.load();
    this.gain = null;
    this.source = null;
  }
}

export class OceanAudio {
  /** Created immediately - MP3 begins loading before any user interaction. */
  private readonly seasounds = new SeasoundsChannel(seasoundsUrl);

  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private tracks = new Map<LayerTrackId, ManagedTrack>();
  private enabled = false;
  private layer: SceneLayerId = "intro";
  private autoplayBlocked = false;
  private readonly targetGains = new Map<LayerTrackId, number>();

  constructor() {
    this.init();
  }

  init(): void {
    if (this.ctx) return;

    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    this.ctx = ctx;
    this.master = master;
    this.seasounds.wire(ctx, master);
  }

  private async tryResume(): Promise<boolean> {
    const ctx = this.ctx;
    if (!ctx) return false;

    try {
      if (ctx.state === "suspended") await ctx.resume();
    } catch {
      this.autoplayBlocked = true;
      return false;
    }

    const running = ctx.state === "running";
    this.autoplayBlocked = !running;
    return running;
  }

  private syncSeasounds(immediate = false): void {
    if (!this.enabled) {
      this.seasounds.muteNow();
      return;
    }

    if (isSeasoundsLayer(this.layer)) {
      void this.seasounds.play(immediate);
    } else {
      this.seasounds.stop(immediate);
    }
  }

  private cancelRelease(track: ManagedTrack): void {
    if (track.releaseTimer !== null) {
      window.clearTimeout(track.releaseTimer);
      track.releaseTimer = null;
    }
  }

  private releaseTrack(id: LayerTrackId): void {
    const track = this.tracks.get(id);
    if (!track) return;

    this.cancelRelease(track);

    const ctx = this.ctx;
    if (ctx) {
      track.gain.gain.cancelScheduledValues(ctx.currentTime);
      track.gain.gain.setValueAtTime(0, ctx.currentTime);
    }

    track.element?.pause();
    if (track.element) {
      track.element.src = "";
      track.element.load();
      track.element = null;
    }

    if (track.mediaSource) {
      try {
        track.mediaSource.disconnect();
      } catch {
        /* already disconnected */
      }
      track.mediaSource = null;
    }

    track.loadPromise = null;
    track.gain.disconnect();
    this.tracks.delete(id);
  }

  private scheduleRelease(id: LayerTrackId, immediate = false): void {
    const track = this.tracks.get(id);
    if (!track) return;

    this.cancelRelease(track);
    const delay = immediate ? 80 : RELEASE_DELAY_MS;
    track.releaseTimer = window.setTimeout(() => {
      track.releaseTimer = null;
      if ((this.targetGains.get(id) ?? 0) > 0.001) return;
      this.releaseTrack(id);
    }, delay);
  }

  private isTrackAllowed(id: LayerTrackId): boolean {
    return activeTracksForLayer(this.layer).has(id);
  }

  private async ensureTrack(id: LayerTrackId): Promise<ManagedTrack | null> {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return null;
    if (!this.isTrackAllowed(id)) return null;

    let track = this.tracks.get(id);
    if (!track) {
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(master);
      track = {
        id,
        element: null,
        mediaSource: null,
        gain,
        loadPromise: null,
        releaseTimer: null,
      };
      this.tracks.set(id, track);
    }

    this.cancelRelease(track);
    if (track.element) return track;

    if (!track.loadPromise) {
      track.loadPromise = this.loadTrackElement(track);
    }

    try {
      await track.loadPromise;
    } catch {
      this.releaseTrack(id);
      return null;
    }

    if (!this.tracks.has(id)) return null;
    return track;
  }

  private loadTrackElement(track: ManagedTrack): Promise<void> {
    const ctx = this.ctx;
    if (!ctx) return Promise.reject(new Error("AudioContext unavailable"));

    const el = new Audio(LAYER_TRACK_URLS[track.id]);
    el.loop = true;
    el.preload = "auto";

    return new Promise<void>((resolve, reject) => {
      const onReady = (): void => {
        cleanup();

        if ((this.targetGains.get(track.id) ?? 0) <= 0) {
          el.src = "";
          el.load();
          resolve();
          return;
        }

        if (!this.tracks.has(track.id) || !this.isTrackAllowed(track.id)) {
          el.src = "";
          el.load();
          resolve();
          return;
        }

        try {
          const source = ctx.createMediaElementSource(el);
          source.connect(track.gain);
          track.element = el;
          track.mediaSource = source;
          resolve();
        } catch (err) {
          reject(err);
        }
      };

      const onError = (): void => {
        cleanup();
        reject(new Error(`Failed to load audio: ${track.id}`));
      };

      const cleanup = (): void => {
        el.removeEventListener("canplaythrough", onReady);
        el.removeEventListener("error", onError);
      };

      el.addEventListener("canplaythrough", onReady, { once: true });
      el.addEventListener("error", onError, { once: true });
      el.load();
    });
  }

  private async fadeTrack(
    id: LayerTrackId,
    target: number,
    immediate = false,
  ): Promise<void> {
    const ctx = this.ctx;
    if (!ctx) return;

    this.targetGains.set(id, target);

    if (target > 0) {
      if (!this.isTrackAllowed(id)) return;

      const track = await this.ensureTrack(id);
      if (
        !track ||
        !this.tracks.has(id) ||
        !this.isTrackAllowed(id) ||
        (this.targetGains.get(id) ?? 0) <= 0
      ) {
        return;
      }

      const t = ctx.currentTime;
      const ramp = immediate ? 0.02 : FADE_MS / 1000;
      track.gain.gain.cancelScheduledValues(t);
      track.gain.gain.setValueAtTime(track.gain.gain.value, t);
      track.gain.gain.linearRampToValueAtTime(target, t + ramp);

      if (track.element?.paused) {
        try {
          await track.element.play();
        } catch {
          this.autoplayBlocked = true;
        }
      }
      return;
    }

    const track = this.tracks.get(id);
    if (!track) return;

    const t = ctx.currentTime;
    const ramp = immediate ? 0.02 : FADE_MS / 1000;
    track.gain.gain.cancelScheduledValues(t);
    track.gain.gain.setValueAtTime(track.gain.gain.value, t);
    track.gain.gain.linearRampToValueAtTime(0, t + ramp);

    track.element?.pause();
    this.scheduleRelease(id, immediate);
  }

  private applyLayerMix(layer: SceneLayerId, immediate = false): void {
    const active = activeTracksForLayer(layer);

    for (const id of Object.keys(LAYER_TRACK_URLS) as LayerTrackId[]) {
      if (!active.has(id)) {
        this.targetGains.set(id, 0);
        this.releaseTrack(id);
        continue;
      }

      void this.fadeTrack(id, TRACK_GAIN[id], immediate);
    }
  }

  private setLayer(layer: LayerId, immediate = false): void {
    if (!isSceneLayer(layer)) return;
    const changed = layer !== this.layer;
    this.layer = layer;
    if (!this.enabled) return;
    this.syncSeasounds(immediate);
    if (changed || immediate) {
      this.applyLayerMix(layer, immediate);
    }
  }

  isContextRunning(): boolean {
    return this.ctx?.state === "running";
  }

  async enable(): Promise<void> {
    this.init();
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;

    this.enabled = true;
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(1, t + 0.4);

    await this.tryResume();
    this.syncSeasounds(true);
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

    this.seasounds.muteNow();

    for (const id of Object.keys(LAYER_TRACK_URLS) as LayerTrackId[]) {
      void this.fadeTrack(id, 0);
    }
  }

  toggle(): Promise<boolean> {
    if (this.enabled) {
      this.disable();
      return Promise.resolve(false);
    }
    return this.enable().then(() => true);
  }

  async unlockFromGesture(): Promise<void> {
    if (!(await this.tryResume()) || !this.enabled) return;

    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;

    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.linearRampToValueAtTime(1, t + 0.1);
    this.syncSeasounds(true);
    this.applyLayerMix(this.layer, true);
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
    if (!isSceneLayer(layer)) return;

    const changed = layer !== this.layer;
    this.layer = layer;

    if (!this.enabled) return;

    this.syncSeasounds(false);

    if (changed) {
      this.applyLayerMix(layer, false);
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  destroy(): void {
    for (const id of [...this.tracks.keys()]) {
      this.releaseTrack(id);
    }

    this.seasounds.destroy();

    const ctx = this.ctx;
    if (ctx && ctx.state !== "closed") {
      void ctx.close();
    }

    this.ctx = null;
    this.master = null;
    this.enabled = false;
  }
}
