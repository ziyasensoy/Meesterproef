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

  private pickLayerByViewport(): LayerId {
    const vh = window.innerHeight;
    let best: LayerId = "intro";
    let bestScore = -Infinity;

    document.querySelectorAll<HTMLElement>("[data-layer]").forEach((section) => {
      const layer = section.dataset.layer as LayerId | undefined;
      if (!layer) return;
      const rect = section.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const score = -Math.abs(center - vh / 2);
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
