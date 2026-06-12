import type { OceanAnimation } from "@/features/journey/ocean";
import en from "@/i18n/en";
import { getNestedValue } from "@/i18n";

interface DepthZone {
  max: number;
  labelKey: keyof typeof en.depth;
}

export interface DescentControllerOptions {
  maxMeters?: number;
}

export class DescentController {
  private readonly maxMeters: number;
  private readonly layers: HTMLElement[];
  private readonly depthHud: HTMLElement | null;
  private readonly depthValue: HTMLElement | null;
  private readonly depthZone: HTMLElement | null;
  private readonly depthStatus: HTMLElement | null;
  private readonly depthLayer: HTMLElement | null;
  private readonly introVeil: HTMLElement | null;
  private readonly sunRays: HTMLElement | null;
  private readonly waterParticles: HTMLElement | null;
  private readonly vignette: HTMLElement | null;

  private meters = 0;
  private smoothMeters = 0;
  private scrollVelocity = 0;
  private lastScrollY = 0;
  private mouseX = 0;
  private mouseY = 0;
  private smoothSubmerge = 0;

  private readonly zones: DepthZone[] = [
    { max: 0, labelKey: "above" },
    { max: 40, labelKey: "surface" },
    { max: 120, labelKey: "shallow" },
    { max: 350, labelKey: "open" },
    { max: 550, labelKey: "deep" },
    { max: 700, labelKey: "seafloor" },
  ];

  private readonly _onMouseMove: (e: MouseEvent) => void;

  constructor(
    private readonly ocean: OceanAnimation,
    options: DescentControllerOptions = {},
  ) {
    this.maxMeters = options.maxMeters ?? 700;
    this.layers = [...document.querySelectorAll<HTMLElement>("[data-layer]")];
    this.depthHud = document.getElementById("depth-hud");
    this.depthValue = document.getElementById("depth-value");
    this.depthZone = document.getElementById("depth-zone");
    this.depthStatus = document.getElementById("depth-status");
    this.depthLayer = document.getElementById("depth-layer");
    this.introVeil = document.querySelector<HTMLElement>(".intro-veil");
    this.vignette = document.querySelector<HTMLElement>(".vignette");
    this.sunRays = document.querySelector<HTMLElement>(".sun-rays");
    this.waterParticles = document.querySelector<HTMLElement>(".water-particles");

    this._onMouseMove = this.onMouseMove.bind(this);
    window.addEventListener("mousemove", this._onMouseMove, { passive: true });
  }

  private onMouseMove(e: MouseEvent): void {
    this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  private getSectionProgress(section: HTMLElement): number {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height + vh;
    const traveled = vh - rect.top;
    return Math.max(0, Math.min(1, traveled / total));
  }

  private getMetersAtProgress(section: HTMLElement): number {
    const start = parseFloat(section.dataset.metersStart ?? "0");
    const end = parseFloat(section.dataset.metersEnd ?? "0");
    const progress = this.getSectionProgress(section);
    return start + (end - start) * this.easeInOutCubic(progress);
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  private smoothstep(t: number): number {
    const x = Math.max(0, Math.min(1, t));
    return x * x * (3 - 2 * x);
  }

  private getActiveSection(): HTMLElement {
    const vh = window.innerHeight;
    let best = this.layers[0];
    let bestScore = -Infinity;

    for (const layer of this.layers) {
      const rect = layer.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const score = -Math.abs(center - vh / 2);
      if (score > bestScore) {
        bestScore = score;
        best = layer;
      }
    }
    return best;
  }

  private getZoneLabel(meters: number): string {
    for (const zone of this.zones) {
      if (meters <= zone.max) {
        return en.depth[zone.labelKey];
      }
    }
    const last = this.zones[this.zones.length - 1];
    return en.depth[last.labelKey];
  }

  update(scrollY: number, globalProgress: number): void {
    this.scrollVelocity += (scrollY - this.lastScrollY) * 0.3;
    this.scrollVelocity *= 0.85;
    this.lastScrollY = scrollY;

    const active = this.getActiveSection();
    this.meters = this.getMetersAtProgress(active);
    this.smoothMeters += (this.meters - this.smoothMeters) * 0.08;

    const activeLayerId = active.dataset.layer || "intro";
    const isSurfaceLayer = activeLayerId === "surface";
    const isIntro = activeLayerId === "intro";

    const surfaceLayer = this.layers.find((l) => l.dataset.layer === "surface");
    const natureLayer = this.layers.find((l) => l.dataset.layer === "nature");

    let submerge = 0;
    if (surfaceLayer && activeLayerId === "surface") {
      const surfaceProg = this.getSectionProgress(surfaceLayer);
      submerge = this.smoothstep((surfaceProg - 0.72) / 0.28);
    }
    if (natureLayer && activeLayerId === "nature") {
      const natureProg = this.getSectionProgress(natureLayer);
      submerge = Math.max(
        submerge,
        this.smoothstep(0.08 + natureProg * 0.92),
      );
    }

    this.smoothSubmerge += (submerge - this.smoothSubmerge) * 0.045;
    const submergeEase = this.smoothSubmerge;

    const depthNorm = Math.max(
      0,
      Math.min(1, this.smoothMeters / this.maxMeters),
    );

    const isUnderwater = submergeEase > 0.48 || this.smoothMeters > 35;

    document.documentElement.style.setProperty(
      "--descent",
      depthNorm.toFixed(3),
    );
    document.documentElement.style.setProperty(
      "--descent-m",
      this.smoothMeters.toFixed(1),
    );
    document.documentElement.style.setProperty(
      "--mouse-x",
      this.mouseX.toFixed(3),
    );
    document.documentElement.style.setProperty(
      "--mouse-y",
      this.mouseY.toFixed(3),
    );
    document.documentElement.style.setProperty(
      "--scroll-vel",
      Math.min(30, Math.abs(this.scrollVelocity)).toFixed(1),
    );

    const introPin = document.querySelector<HTMLElement>(
      ".pin-sequence--intro",
    );
    const introPinP = introPin
      ? parseFloat(
          introPin.style.getPropertyValue("--pin-p") ||
            getComputedStyle(introPin).getPropertyValue("--pin-p"),
        ) || 0
      : 0;

    const surfaceOffset = isSurfaceLayer
      ? 0
      : Math.min(0, -submergeEase * 95 - 8);

    let surfaceAssets = 0;
    if (surfaceLayer && activeLayerId === "surface") {
      const surfaceProg = this.getSectionProgress(surfaceLayer);
      surfaceAssets = this.smoothstep((surfaceProg - 0.06) / 0.45);
    }

    document.documentElement.style.setProperty(
      "--surface-offset",
      `${surfaceOffset}vh`,
    );
    document.documentElement.style.setProperty(
      "--surface-assets",
      surfaceAssets.toFixed(3),
    );
    document.documentElement.style.setProperty(
      "--submerge",
      submergeEase.toFixed(3),
    );

    let surfaceHorizon = 0;
    let surfaceWater = 0;
    if (surfaceLayer && isSurfaceLayer) {
      const surfaceRect = surfaceLayer.getBoundingClientRect();
      const vh = window.innerHeight;
      const surfaceTop = surfaceRect.top;
      const enter = this.smoothstep((vh * 0.42 - surfaceTop) / (vh * 0.38));
      surfaceHorizon = enter * (1 - submergeEase);
      surfaceWater = enter * (1 - submergeEase * 0.5);
    }
    document.documentElement.style.setProperty(
      "--surface-horizon",
      surfaceHorizon.toFixed(3),
    );
    document.documentElement.style.setProperty(
      "--surface-water",
      surfaceWater.toFixed(3),
    );
    document.documentElement.style.setProperty(
      "--intro-pin",
      introPinP.toFixed(4),
    );

    if (this.introVeil) {
      const veilOpacity = Math.max(0, 1 - introPinP * 1.4);
      this.introVeil.style.opacity = String(veilOpacity);
    }

    const speedBoost = 1 + Math.min(0.6, Math.abs(this.scrollVelocity) * 0.04);
    const baseSpeed = parseFloat(active.dataset.speed || "1");
    this.ocean.setSpeedMultiplier(baseSpeed * speedBoost);
    const oceanDepth =
      isIntro || (isSurfaceLayer && submergeEase < 0.3)
        ? submergeEase * 0.06
        : Math.max(submergeEase * 0.5, depthNorm);
    this.ocean.setDepth(oceanDepth);
    this.ocean.setBubbleIntensity(
      submergeEase > 0.2
        ? Math.min(1, (submergeEase - 0.2) * 1.15)
        : 0,
    );
    this.ocean.setScrollVelocity(this.scrollVelocity);

    if (this.depthValue) {
      this.depthValue.textContent = isUnderwater
        ? `${Math.round(this.smoothMeters)}m`
        : "0m";
    }
    if (this.depthZone) {
      this.depthZone.textContent = this.getZoneLabel(this.smoothMeters);
    }
    if (this.depthLayer) {
      const layerLabel = getNestedValue(en, `dive.layerLabels.${activeLayerId}`);
      if (layerLabel) this.depthLayer.textContent = layerLabel;
    }
    if (this.depthStatus) {
      const diving = isUnderwater && Math.abs(this.scrollVelocity) > 3;
      this.depthStatus.textContent = diving
        ? en.dive.descending
        : isUnderwater
          ? en.dive.atDepth
          : en.dive.descending;
      this.depthStatus.classList.toggle("is-pulsing", diving);
    }
    if (this.depthHud) {
      this.depthHud.classList.toggle("is-underwater", isUnderwater);
      this.depthHud.classList.toggle("is-visible", globalProgress > 0.02);
      this.depthHud.classList.toggle("is-deep-reading", depthNorm > 0.45);
    }

    const lightFalloff = Math.max(depthNorm, submergeEase);
    const sunOpacity =
      isIntro || isSurfaceLayer
        ? Math.max(0.4, 1 - submergeEase * 0.8)
        : Math.max(0, 1 - lightFalloff * 1.4);
    const particleOpacity = Math.max(
      0,
      Math.min(0.75, (lightFalloff - 0.08) * 1.3),
    );
    const vignetteStrength =
      (isIntro || (isSurfaceLayer && submergeEase < 0.2))
        ? 0.16
        : 0.32 + lightFalloff * 0.48;

    if (this.sunRays) this.sunRays.style.opacity = String(sunOpacity * 0.9);
    if (this.waterParticles) {
      this.waterParticles.style.opacity = String(particleOpacity);
    }
    if (this.vignette) {
      this.vignette.style.background = `radial-gradient(ellipse at center, transparent ${38 - depthNorm * 15}%, rgba(5, 15, 30, ${vignetteStrength}) 100%)`;
    }

    if (active.dataset.layer) {
      document.body.dataset.layer = active.dataset.layer;
    }
    if (introPinP > 0.15 || globalProgress > 0.03) {
      document.body.classList.add("ocean-open");
    }
    document.body.classList.toggle(
      "is-surface-water",
      isSurfaceLayer && surfaceWater > 0.2,
    );
    document.body.classList.toggle(
      "is-submerging",
      submergeEase >= 0.08 && submergeEase < 0.94,
    );
    document.body.classList.toggle("is-underwater", isUnderwater);
    document.body.classList.toggle("is-deep", depthNorm > 0.65);
    document.body.classList.toggle(
      "is-diving",
      Math.abs(this.scrollVelocity) > 4,
    );

    this.layers.forEach((layer) => {
      const progress = this.getSectionProgress(layer);
      const parallaxY = (progress - 0.5) * 80;
      const parallaxX = this.mouseX * (8 + progress * 12);
      const visuals = layer.querySelector<HTMLElement>(".layer__visuals");
      const content = layer.querySelector<HTMLElement>(".layer__content");

      if (visuals) {
        const isSplit = layer.classList.contains("layer--split");
        if (isSplit) {
          visuals.style.transform = `translate3d(${parallaxX * 0.4}px, ${parallaxY * 0.1}px, 0)`;
        } else {
          visuals.style.transform = `translate3d(${parallaxX}px, ${parallaxY * 0.6}px, 0) scale(${1 + progress * 0.03})`;
        }
      }
      if (content) {
        content.style.transform = `translate3d(${parallaxX * 0.3}px, ${parallaxY * 0.2}px, 0)`;
      }

      layer.classList.toggle("is-active", layer === active);
    });

    if (globalProgress > 0.85) {
      const finale = document.querySelector<HTMLElement>(
        '[data-layer="finale"]',
      );
      if (finale) {
        const finProgress = this.getSectionProgress(finale);
        this.ocean.setSpeedMultiplier(0.3 + (1 - finProgress) * 0.5);
      }
    }
  }

  destroy(): void {
    window.removeEventListener("mousemove", this._onMouseMove);
  }
}
