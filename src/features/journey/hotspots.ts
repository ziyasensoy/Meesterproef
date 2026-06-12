import { getHotspotData } from "@/utils/dom";

export class AnimalHotspots {
  private activeCard: HTMLElement | null = null;
  private readonly overlay: HTMLElement | null;
  private readonly card: HTMLElement | null;
  private readonly cardTitle: HTMLElement | null;
  private readonly cardBody: HTMLElement | null;
  private readonly closeBtn: HTMLElement | null;

  constructor() {
    this.overlay = document.getElementById("info-overlay");
    this.card = document.getElementById("info-card");
    this.cardTitle = document.getElementById("info-card-title");
    this.cardBody = document.getElementById("info-card-body");
    this.closeBtn = document.getElementById("info-card-close");

    this.bindEvents();
  }

  private bindEvents(): void {
    document
      .querySelectorAll<HTMLElement>("[data-hotspot]")
      .forEach((hotspot) => this.register(hotspot));

    this.closeBtn?.addEventListener("click", () => this.close());
    this.overlay?.addEventListener("click", () => this.close());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.close();
    });
  }

  register(hotspot: HTMLElement): void {
    if (hotspot.dataset.hotspotBound) return;
    hotspot.dataset.hotspotBound = "true";
    hotspot.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.open(hotspot);
    });
  }

  openWithContent(
    title: string,
    body: string,
    source?: HTMLElement | null,
  ): void {
    if (this.cardTitle) this.cardTitle.textContent = title;
    if (this.cardBody) this.cardBody.textContent = body;

    this.overlay?.classList.add("is-open");
    this.card?.classList.add("is-open");
    this.activeCard?.classList.remove("is-active");
    this.activeCard = source ?? null;
    source?.classList.add("is-active");

    if (source) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => this.positionCardNear(source));
      });
    } else {
      this.resetCardPosition();
    }
  }

  private positionCardNear(source: HTMLElement): void {
    if (!this.card) return;

    this.card.classList.add("is-anchored");

    const margin = 14;
    const gap = 12;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const sourceRect = source.getBoundingClientRect();

    this.card.style.width = "fit-content";
    this.card.style.maxWidth = `${Math.min(380, vw * 0.9)}px`;
    this.card.style.height = "auto";
    this.card.style.minHeight = "0";
    this.card.style.bottom = "auto";

    const cardRect = this.card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    const placeRight = sourceRect.right + gap + cardWidth < vw - margin;
    const placeLeft = sourceRect.left - gap - cardWidth > margin;

    let left: number;
    if (placeRight) {
      left = sourceRect.right + gap;
    } else if (placeLeft) {
      left = sourceRect.left - gap - cardWidth;
    } else {
      left = Math.max(
        margin,
        Math.min(vw - cardWidth - margin, sourceRect.left + sourceRect.width / 2 - cardWidth / 2),
      );
    }

    let top = sourceRect.top + sourceRect.height / 2 - cardHeight / 2;
    if (top + cardHeight > vh - margin) {
      top = sourceRect.top - cardHeight - gap;
    }
    if (top < margin) {
      top = sourceRect.bottom + gap;
    }
    top = Math.max(margin, Math.min(vh - cardHeight - margin, top));

    this.card.style.left = `${left}px`;
    this.card.style.top = `${top}px`;
  }

  private resetCardPosition(): void {
    if (!this.card) return;
    this.card.classList.remove("is-anchored");
    this.card.style.left = "";
    this.card.style.top = "";
    this.card.style.bottom = "";
    this.card.style.width = "";
    this.card.style.maxWidth = "";
    this.card.style.height = "";
    this.card.style.minHeight = "";
  }

  private open(hotspot: HTMLElement): void {
    const { title, body } = getHotspotData(hotspot);
    this.openWithContent(title, body, hotspot);
  }

  close(): void {
    this.overlay?.classList.remove("is-open");
    this.card?.classList.remove("is-open");
    this.resetCardPosition();
    this.activeCard?.classList.remove("is-active");
    document
      .querySelectorAll(".map-pin.is-active")
      .forEach((p) => p.classList.remove("is-active"));
    this.activeCard = null;
  }
}
