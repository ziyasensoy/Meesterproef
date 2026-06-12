import type { ScrollProgressCallback } from "@/types/journey";

export interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export class ScrollReveal {
  private options: Required<ScrollRevealOptions>;
  private observer: IntersectionObserver | null = null;

  constructor(options: ScrollRevealOptions = {}) {
    this.options = {
      threshold: options.threshold ?? 0.25,
      rootMargin: options.rootMargin ?? "0px 0px -10% 0px",
    };
  }

  init(): void {
    this.observer = new IntersectionObserver(
      (entries) => this.handleEntries(entries),
      {
        threshold: this.options.threshold,
        rootMargin: this.options.rootMargin,
      },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      this.observer?.observe(el);
    });

    document.querySelectorAll("[data-reveal-stagger]").forEach((group) => {
      this.observer?.observe(group);
    });
  }

  private handleEntries(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target as HTMLElement;

      if (el.dataset.reveal !== undefined) {
        el.classList.add("is-visible");
      }

      if (el.dataset.revealStagger !== undefined) {
        el.classList.add("is-visible");
        el.querySelectorAll("[data-reveal-child]").forEach((child, i) => {
          const childEl = child as HTMLElement;
          childEl.style.transitionDelay = `${i * 120}ms`;
          childEl.classList.add("is-visible");
        });
      }
    });
  }

  destroy(): void {
    this.observer?.disconnect();
  }
}

export class ScrollProgress {
  private ticking = false;
  private readonly _onScroll: () => void;

  constructor(private readonly callback: ScrollProgressCallback) {
    this._onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this._onScroll, { passive: true });
    this.onScroll();
  }

  private onScroll(): void {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      this.callback(progress, scrollY);
      this.ticking = false;
    });
  }

  destroy(): void {
    window.removeEventListener("scroll", this._onScroll);
  }
}
