export function initSplitText(): void {
  document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    if (el.dataset.splitDone) return;
    const mode = el.dataset.split;
    const text = el.textContent?.trim() ?? "";

    if (mode === "chars") {
      let charIndex = 0;
      el.innerHTML = text
        .split(/(\s+)/)
        .map((segment) => {
          if (/^\s+$/.test(segment)) {
            return '<span class="split-space" aria-hidden="true">&nbsp;</span>';
          }
          const chars = [...segment]
            .map((char) => {
              const html = `<span class="split-char" aria-hidden="true" style="--ci:${charIndex}">${char}</span>`;
              charIndex += 1;
              return html;
            })
            .join("");
          return `<span class="split-word-group">${chars}</span>`;
        })
        .join("");
    } else if (mode === "words") {
      el.innerHTML = text
        .split(/\s+/)
        .map(
          (word, i) =>
            `<span class="split-word" style="--wi:${i}"><span class="split-word-inner">${word}</span></span>`,
        )
        .join(" ");
    }

    el.dataset.splitDone = "true";
  });
}

export class ExperimentalScroll {
  private readonly pins: HTMLElement[];
  private readonly scrubEls: HTMLElement[];
  private readonly layerNums: HTMLElement[];

  constructor() {
    this.pins = [...document.querySelectorAll<HTMLElement>(".pin-sequence")];
    this.scrubEls = [...document.querySelectorAll<HTMLElement>("[data-scrub]")];
    this.layerNums = [...document.querySelectorAll<HTMLElement>(".layer-num")];
  }

  update(): void {
    this.updatePins();
    this.updateScrubElements();
    this.updateLayerNumbers();
  }

  private getPinProgress(el: HTMLElement): number {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = el.offsetHeight - vh;
    if (total <= 0) return 0;
    const scrolled = -rect.top;
    return Math.max(0, Math.min(1, scrolled / total));
  }

  private updatePins(): void {
    this.pins.forEach((pin) => {
      const p = this.getPinProgress(pin);
      pin.style.setProperty("--pin-p", p.toFixed(4));

      const sticky = pin.querySelector<HTMLElement>(".pin-sequence__sticky");
      if (!sticky) return;

      const title = pin.querySelector<HTMLElement>(".title-hero");
      const chars = pin.querySelectorAll<HTMLElement>(".split-char");
      const seagulls = pin.querySelector<HTMLElement>(".seagulls");
      const introSky = pin.querySelector<HTMLElement>(".intro-sky");
      const introExtras = pin.querySelector<HTMLElement>(".intro-hero-meta");
      const siteControls = pin.querySelector<HTMLElement>(".site-controls");
      const introCompass = pin.querySelector<HTMLElement>(".intro-compass");

      const uiHide = Math.max(0, Math.min(1, (p - 0.22) / 0.28));
      for (const el of [introExtras, siteControls, introCompass]) {
        if (!el) continue;
        el.style.opacity = String(1 - uiHide);
        el.style.visibility = uiHide > 0.98 ? "hidden" : "visible";
        el.style.pointerEvents = uiHide > 0.4 ? "none" : "";
      }

      const scrollNudge = pin.querySelector<HTMLElement>(".intro-scroll-nudge");
      if (scrollNudge) {
        const hintHide = Math.max(0, Math.min(1, (p - 0.5) / 0.18));
        scrollNudge.style.opacity = String(1 - hintHide);
        scrollNudge.style.visibility = hintHide > 0.98 ? "hidden" : "visible";
      }

      if (seagulls) {
        seagulls.style.opacity = String(Math.max(0, 1 - p * 1.8));
      }

      if (introSky) {
        const skyFade = Math.max(0, (p - 0.55) / 0.4);
        introSky.style.opacity = String(Math.max(0, 1 - skyFade));
      }

      const introClouds = pin.querySelector<HTMLElement>(".intro-clouds");
      if (introClouds) {
        const cloudFade = Math.max(0, (p - 0.35) / 0.45);
        introClouds.style.opacity = String(Math.max(0, 1 - cloudFade));
        introClouds.style.transform = `translateY(${p * -6}vh)`;
      }

      if (title) {
        const scale = 1 + p * 2.8;
        const blur = Math.max(0, (p - 0.35) * 14);
        const opacity = p < 0.75 ? 1 : Math.max(0, 1 - (p - 0.75) * 4);
        title.style.transform = `scale(${scale}) translateY(${p * -8}%)`;
        title.style.filter = `blur(${blur}px)`;
        title.style.opacity = String(opacity);
      }

      chars.forEach((char, i) => {
        const spread = Math.max(0, (p - 0.45) * 1.8);
        const dir = i % 2 === 0 ? -1 : 1;
        const yOff = Math.sin(i * 0.8) * spread * 60;
        const xOff = dir * spread * (20 + (i % 5) * 12);
        char.style.transform = `translate(${xOff}px, ${yOff}px) rotate(${dir * spread * 8}deg)`;
        char.style.opacity = String(Math.max(0, 1 - spread * 0.9));
      });

      document.documentElement.style.setProperty("--intro-pin", p.toFixed(4));
    });
  }

  private getScrubProgress(el: HTMLElement, vh: number): number {
    const surfaceSection = el.closest<HTMLElement>(".layer--surface");
    if (surfaceSection) {
      const top = surfaceSection.getBoundingClientRect().top;
      const startAt = vh * 0.52;
      const fullAt = vh * 0.1;
      return Math.max(0, Math.min(1, (startAt - top) / (startAt - fullAt)));
    }

    const pollutionSection = el.closest<HTMLElement>(".layer--pollution");
    if (pollutionSection) {
      const top = pollutionSection.getBoundingClientRect().top;
      const startAt = vh * 0.78;
      const fullAt = vh * 0.22;
      return Math.max(0, Math.min(1, (startAt - top) / (startAt - fullAt)));
    }

    const rect = el.getBoundingClientRect();
    const start = vh * 0.85;
    const end = vh * 0.15;
    return Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
  }

  private settleLayerContent(selector: string, settledThreshold: number): void {
    const vh = window.innerHeight;
    document.querySelectorAll<HTMLElement>(selector).forEach((section) => {
      const top = section.getBoundingClientRect().top;
      const settled = top < vh * settledThreshold;
      section.classList.toggle("is-content-settled", settled);
      if (settled) {
        section
          .querySelectorAll<HTMLElement>(
            "[data-reveal-stagger], [data-reveal-child]",
          )
          .forEach((el) => el.classList.add("is-visible"));
      }
    });
  }

  private updateScrubElements(): void {
    const vh = window.innerHeight;

    this.settleLayerContent(".layer--surface", 0.14);
    this.settleLayerContent(".layer--pollution", 0.28);

    this.scrubEls.forEach((el) => {
      const p = this.getScrubProgress(el, vh);
      el.style.setProperty("--scrub-p", p.toFixed(4));

      const type = el.dataset.scrub;
      if (type === "slide-left") {
        el.style.transform = `translateX(${(1 - p) * -80}px) skewX(${(1 - p) * -4}deg)`;
        el.style.opacity = String(p);
      } else if (type === "slide-right") {
        el.style.transform = `translateX(${(1 - p) * 80}px) skewX(${(1 - p) * 4}deg)`;
        el.style.opacity = String(p);
      } else if (type === "scale-up") {
        el.style.transform = `scale(${0.7 + p * 0.3}) translateY(${(1 - p) * 60}px)`;
        el.style.opacity = String(p);
      } else if (type === "blur-in") {
        el.style.filter = `blur(${(1 - p) * 10}px)`;
        el.style.transform = `translateY(${(1 - p) * 40}px)`;
        el.style.opacity = String(p);
      } else if (type === "clip-up") {
        el.style.clipPath = `inset(${(1 - p) * 100}% 0 0 0)`;
        el.style.opacity = String(p);
      }
    });
  }

  private updateLayerNumbers(): void {
    this.layerNums.forEach((num) => {
      const section = num.closest<HTMLElement>("[data-layer]");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(
        0,
        Math.min(
          1,
          1 - (rect.top + rect.height * 0.3) / (vh + rect.height * 0.5),
        ),
      );
      const y = (1 - p) * 120;
      num.style.transform = `translateY(${y}px) translateX(${(1 - p) * -40}px)`;
      const isSurface = section.dataset.layer === "surface";
      num.style.opacity = String(
        isSurface ? 0.1 + p * 0.16 : 0.04 + p * 0.1,
      );
    });
  }

  destroy(): void {}
}
