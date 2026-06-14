import type { LayerId } from "@/types/journey";

export type LayerChangeCallback = (layer: LayerId) => void;

const LAYER_ORDER: LayerId[] = [
  "intro",
  "surface",
  "nature",
  "pollution",
  "infrastructure",
  "history",
  "politics",
  "finale",
];

/**
 * Tracks the scroll-active journey layer via Intersection Observer,
 * with viewport-centre fallback for reliable layer detection.
 */
export class LayerObserver {
  private observer: IntersectionObserver | null = null;
  private activeLayer: LayerId = "intro";
  private readonly callbacks = new Set<LayerChangeCallback>();
  private readonly ratios = new Map<string, number>();

  init(): void {
    const sections = document.querySelectorAll<HTMLElement>("[data-layer]");
    if (sections.length === 0) return;

    this.observer = new IntersectionObserver(
      (entries) => this.handleEntries(entries),
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    sections.forEach((section) => {
      const layer = section.dataset.layer;
      if (layer) this.ratios.set(layer, 0);
      this.observer?.observe(section);
    });

    this.setActiveLayer(this.pickLayerByViewport(), true);
  }

  /** Viewport-centre layer - for visuals / body dataset. */
  getViewportLayer(): LayerId {
    return this.pickLayerByViewport();
  }

  /**
   * Layer used for audio - document scroll position, not viewport rects.
   * Intro seasounds only while the scroll focus is inside the intro section.
   */
  getAudioLayer(): LayerId {
    const focus = window.scrollY + window.innerHeight * 0.5;
    const containing: LayerId[] = [];

    document.querySelectorAll<HTMLElement>("[data-layer]").forEach((section) => {
      const layer = section.dataset.layer as LayerId | undefined;
      if (!layer) return;

      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;
      if (focus >= top && focus < bottom) {
        containing.push(layer);
      }
    });

    if (containing.length > 0) {
      return containing.reduce((best, layer) =>
        LAYER_ORDER.indexOf(layer) > LAYER_ORDER.indexOf(best) ? layer : best,
      );
    }

    let best: LayerId = "intro";
    let bestDistance = Infinity;

    document.querySelectorAll<HTMLElement>("[data-layer]").forEach((section) => {
      const layer = section.dataset.layer as LayerId | undefined;
      if (!layer) return;

      const rect = section.getBoundingClientRect();
      const center = rect.top + window.scrollY + rect.height * 0.5;
      const distance = Math.abs(center - focus);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = layer;
      }
    });

    return best;
  }

  private pickLayerByViewport(skipIntro = false): LayerId {
    const focusY = window.innerHeight * 0.5;
    const containing: LayerId[] = [];

    document.querySelectorAll<HTMLElement>("[data-layer]").forEach((section) => {
      const layer = section.dataset.layer as LayerId | undefined;
      if (!layer) return;
      if (skipIntro && section.classList.contains("pin-sequence--intro")) return;

      const rect = section.getBoundingClientRect();
      if (rect.top <= focusY && rect.bottom >= focusY) {
        containing.push(layer);
      }
    });

    if (containing.length > 0) {
      return containing.reduce((best, layer) =>
        LAYER_ORDER.indexOf(layer) > LAYER_ORDER.indexOf(best) ? layer : best,
      );
    }

    let best: LayerId = skipIntro ? "surface" : "intro";
    let bestScore = -Infinity;

    document.querySelectorAll<HTMLElement>("[data-layer]").forEach((section) => {
      const layer = section.dataset.layer as LayerId | undefined;
      if (!layer) return;
      if (skipIntro && section.classList.contains("pin-sequence--intro")) return;

      const rect = section.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const score = -Math.abs(center - focusY);
      if (score > bestScore) {
        bestScore = score;
        best = layer;
      }
    });

    return best;
  }

  private pickLayerByRatio(): LayerId {
    let bestLayer = this.activeLayer;
    let bestRatio = -1;

    for (const [layer, ratio] of this.ratios) {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestLayer = layer as LayerId;
      }
    }

    if (bestRatio <= 0) return this.pickLayerByViewport();
    return bestLayer;
  }

  /** Prefer the deeper layer when ratios are close (avoids surface bleed). */
  private resolveLayer(ratioLayer: LayerId, viewportLayer: LayerId): LayerId {
    if (ratioLayer === viewportLayer) return ratioLayer;

    const ratioIdx = LAYER_ORDER.indexOf(ratioLayer);
    const viewportIdx = LAYER_ORDER.indexOf(viewportLayer);
    if (ratioIdx < 0 || viewportIdx < 0) return viewportLayer;

    const ratio = this.ratios.get(ratioLayer) ?? 0;
    const viewportRatio = this.ratios.get(viewportLayer) ?? 0;

    if (Math.abs(ratio - viewportRatio) < 0.12) {
      return viewportIdx > ratioIdx ? viewportLayer : ratioLayer;
    }

    return viewportRatio >= ratio ? viewportLayer : ratioLayer;
  }

  private handleEntries(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      const layer = (entry.target as HTMLElement).dataset.layer;
      if (!layer) continue;
      this.ratios.set(layer, entry.isIntersecting ? entry.intersectionRatio : 0);
    }

    const ratioLayer = this.pickLayerByRatio();
    const viewportLayer = this.pickLayerByViewport();
    this.setActiveLayer(this.resolveLayer(ratioLayer, viewportLayer));
  }

  private setActiveLayer(layer: LayerId, force = false): void {
    if (!force && layer === this.activeLayer) return;
    this.activeLayer = layer;
    document.body.dataset.layer = layer;
    this.callbacks.forEach((cb) => cb(layer));
  }

  onChange(callback: LayerChangeCallback): () => void {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  getActiveLayer(): LayerId {
    return this.activeLayer;
  }

  /** Re-evaluate on scroll when intersection ratios lag behind scroll position. */
  syncFromScroll(): void {
    const viewportLayer = this.pickLayerByViewport();
    const ratioLayer = this.pickLayerByRatio();
    this.setActiveLayer(this.resolveLayer(ratioLayer, viewportLayer));
  }

  destroy(): void {
    this.observer?.disconnect();
    this.observer = null;
    this.callbacks.clear();
    this.ratios.clear();
  }
}
