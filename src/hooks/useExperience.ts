import { useEffect } from "react";
import {
  AnimalHotspots,
  applyLayerPalette,
  updatePaletteFromScroll,
  DescentController,
  ExperimentalScroll,
  initSplitText,
  LayerObserver,
  MapController,
  OceanAnimation,
  OceanAudio,
  ScrollProgress,
  ScrollReveal,
  SiteControls,
} from "@/features/journey";
import type { LayerId } from "@/types/journey";
import { applyTranslations } from "@/i18n/applyTranslations";

export function useExperience(): void {
  useEffect(() => {
    initSplitText();

    const canvas = document.getElementById("ocean-canvas");
    if (!(canvas instanceof HTMLCanvasElement)) return;

    const ocean = new OceanAnimation(canvas);
    ocean.start();

    const oceanAudio = new OceanAudio();
    const siteControls = new SiteControls(oceanAudio);
    const layerObserver = new LayerObserver();
    layerObserver.init();

    void siteControls.enableSound();

    const unlockAudio = (): void => {
      void oceanAudio.unlockFromGesture().then(() => {
        siteControls.syncAudioState();
      });
    };
    const unlockOpts = { once: true, passive: true } as const;
    document.addEventListener("pointerdown", unlockAudio, unlockOpts);
    document.addEventListener("touchstart", unlockAudio, unlockOpts);
    document.addEventListener("keydown", unlockAudio, { once: true });
    window.addEventListener("scroll", unlockAudio, unlockOpts);

    layerObserver.onChange((layer) => {
      oceanAudio.setLayerFromObserver(layer);
    });

    const descent = new DescentController(ocean);
    const experimental = new ExperimentalScroll();

    const scrollProgress = new ScrollProgress((progress, scrollY) => {
      experimental.update();
      descent.update(scrollY, progress);
      updatePaletteFromScroll();
      layerObserver.syncFromScroll();
      const layer = (document.body.dataset.layer || "intro") as LayerId;
      oceanAudio.forceSyncLayer(layer);
    });

    const scrollReveal = new ScrollReveal();
    scrollReveal.init();

    applyTranslations();
    const hotspots = new AnimalHotspots();
    const mapController = new MapController(hotspots);

    applyLayerPalette("intro");
    document.body.dataset.layer = "intro";
    experimental.update();
    updatePaletteFromScroll();

    return () => {
      document.removeEventListener("pointerdown", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("scroll", unlockAudio);
      scrollProgress.destroy();
      scrollReveal.destroy();
      layerObserver.destroy();
      ocean.destroy();
      descent.destroy();
      mapController.destroy();
      siteControls.destroy();
    };
  }, []);
}
