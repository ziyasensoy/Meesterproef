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

    const experimental = new ExperimentalScroll();
    const descent = new DescentController(ocean);

    const syncAudioLayer = (): void => {
      oceanAudio.forceSyncLayer(layerObserver.getAudioLayer());
    };

    const scrollProgress = new ScrollProgress((_progress, scrollY) => {
      experimental.update();
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      descent.update(scrollY, progress);
      updatePaletteFromScroll();
      layerObserver.syncFromScroll();
      syncAudioLayer();
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
    syncAudioLayer();

    return () => {
      scrollProgress.destroy();
      scrollReveal.destroy();
      layerObserver.destroy();
      ocean.destroy();
      oceanAudio.destroy();
      descent.destroy();
      mapController.destroy();
      siteControls.destroy();
    };
  }, []);
}
