import { useCallback, useState } from "react";
import en from "@/i18n/en";

type EraId = "doggerland" | "hansa" | "ww1" | "ww2" | "oil" | "energy";

const ERAS: { id: EraId; period: string; tag: string }[] = [
  { id: "doggerland", period: "c. 8,000 BC", tag: "Doggerland" },
  { id: "hansa", period: "1200s–1600s", tag: "Trade" },
  { id: "ww1", period: "1914–1918", tag: "First World War" },
  { id: "ww2", period: "1939–1945", tag: "Second World War" },
  { id: "oil", period: "1960s–today", tag: "Oil & gas" },
  { id: "energy", period: "Now", tag: "Energy shift" },
];

function eraCopy(id: EraId) {
  const h = en.layers.history;
  return {
    doggerland: { title: h.doggerlandTitle, body: h.doggerlandBody, fact: h.doggerlandFact },
    hansa: { title: h.hansaTitle, body: h.hansaBody, fact: h.hansaFact },
    ww1: { title: h.ww1Title, body: h.ww1Body, fact: h.ww1Fact },
    ww2: { title: h.ww2Title, body: h.ww2Body, fact: h.ww2Fact },
    oil: { title: h.oilTitle, body: h.oilBody, fact: h.oilFact },
    energy: { title: h.energyTitle, body: h.energyBody, fact: h.energyFact },
  }[id];
}

function EraIllustration({ era }: { era: EraId }) {
  switch (era) {
    case "doggerland":
      return (
        <svg viewBox="0 0 200 120" className="history-illustration" aria-hidden="true">
          <path
            d="M0 72 Q50 58 100 65 T200 68 L200 120 L0 120 Z"
            fill="rgba(139,115,85,0.55)"
          />
          <path
            d="M0 78 Q80 62 160 70 L200 72"
            fill="none"
            stroke="rgba(126,200,227,0.45)"
            strokeWidth="2.5"
          />
          <path
            d="M40 52 L48 70 M60 50 L68 68 M120 48 L128 66 M150 52 L158 70"
            stroke="rgba(240,220,180,0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "hansa":
      return (
        <svg viewBox="0 0 200 120" className="history-illustration" aria-hidden="true">
          <path d="M20 75 L180 75" stroke="rgba(126,200,227,0.35)" strokeWidth="2" />
          <path d="M30 75 L25 55 L55 50 L90 58 L130 48 L165 52 L175 75 Z" fill="#4a5568" />
          <path d="M70 32 L74 18 L90 24 Z" fill="rgba(240,245,250,0.9)" />
        </svg>
      );
    case "ww1":
      return (
        <svg viewBox="0 0 200 120" className="history-illustration" aria-hidden="true">
          <path d="M0 80 Q100 70 200 78 L200 120 L0 120 Z" fill="rgba(20,40,60,0.45)" />
          <path d="M40 78 L50 55 L120 58 L130 78 Z" fill="#3d4a52" />
          <circle cx="90" cy="72" r="6" fill="none" stroke="#c45c4a" strokeWidth="2" />
        </svg>
      );
    case "ww2":
      return (
        <svg viewBox="0 0 200 120" className="history-illustration" aria-hidden="true">
          <ellipse cx="70" cy="88" rx="28" ry="6" fill="rgba(0,0,0,0.25)" />
          <path d="M50 88 L55 72 Q70 65 85 72 L90 88 Z" fill="#2c3e50" />
          <path d="M120 85 L200 85 L195 70 L125 68 Z" fill="#4a5568" opacity="0.85" />
        </svg>
      );
    case "oil":
      return (
        <svg viewBox="0 0 200 120" className="history-illustration" aria-hidden="true">
          <rect x="88" y="25" width="10" height="60" fill="#6a7580" />
          <rect x="70" y="45" width="8" height="40" fill="#7a858f" />
          <rect x="108" y="50" width="8" height="35" fill="#7a858f" />
          <ellipse cx="130" cy="30" rx="8" ry="12" fill="#ff6b35" opacity="0.75" />
        </svg>
      );
    case "energy":
      return (
        <svg viewBox="0 0 200 120" className="history-illustration" aria-hidden="true">
          <line x1="60" y1="90" x2="60" y2="35" stroke="#c8d4dc" strokeWidth="3" />
          <ellipse cx="60" cy="32" rx="22" ry="5" fill="none" stroke="#e8f0f6" strokeWidth="2" />
          <ellipse cx="60" cy="32" rx="22" ry="5" fill="none" stroke="#e8f0f6" strokeWidth="2" transform="rotate(120 60 32)" />
          <ellipse cx="60" cy="32" rx="22" ry="5" fill="none" stroke="#e8f0f6" strokeWidth="2" transform="rotate(240 60 32)" />
          <line x1="120" y1="95" x2="120" y2="50" stroke="#c8d4dc" strokeWidth="2.5" />
          <ellipse cx="120" cy="47" rx="16" ry="4" fill="none" stroke="#e8f0f6" strokeWidth="1.5" />
        </svg>
      );
  }
}

export default function HistoryInteractive() {
  const [activeId, setActiveId] = useState<EraId>("doggerland");
  const activeIndex = ERAS.findIndex((e) => e.id === activeId);
  const active = eraCopy(activeId);
  const activeEra = ERAS[activeIndex];

  const select = useCallback((id: EraId, button: HTMLButtonElement | null) => {
    setActiveId(id);
    button?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, []);

  const step = useCallback((dir: -1 | 1) => {
    const next = (activeIndex + dir + ERAS.length) % ERAS.length;
    setActiveId(ERAS[next].id);
  }, [activeIndex]);

  return (
    <div className="history-interactive">
      <div className="history-interactive__atmosphere" aria-hidden="true">
        <div className="history-interactive__glow" />
      </div>

      <header className="history-interactive__header">
        <span
          className="layer-label"
          data-scrub="slide-right"
          data-i18n="layers.history.label"
        >
          05 / History
        </span>
        <h2
          className="title-section"
          data-split="words"
          data-scrub="blur-in"
          data-i18n="layers.history.title"
        >
          The North Sea holds thousands of years of history.
        </h2>
        <p
          className="text-body history-interactive__hint"
          data-scrub="slide-left"
          data-i18n="layers.history.hint"
        >
          Choose a chapter in time — from a walkable plain to the wars and industries
          that followed.
        </p>
      </header>

      <div className="history-interactive__layout">
        <nav
          className="history-chapters"
          role="tablist"
          aria-label="Chapters of North Sea history"
        >
          <div className="history-chapters__rail" aria-hidden="true" />
          {ERAS.map((era) => {
            const isActive = activeId === era.id;
            return (
              <button
                key={era.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="history-story-panel"
                id={`history-tab-${era.id}`}
                className={`history-chapter${isActive ? " is-active" : ""}`}
                data-era={era.id}
                onClick={(e) => select(era.id, e.currentTarget)}
              >
                <span className="history-chapter__marker" aria-hidden="true" />
                <span className="history-chapter__period">{era.period}</span>
                <span className="history-chapter__tag">{era.tag}</span>
              </button>
            );
          })}
        </nav>

        <article
          id="history-story-panel"
          role="tabpanel"
          aria-labelledby={`history-tab-${activeId}`}
          className="history-story"
          data-era={activeId}
        >
          <div className="history-story__visual">
            <EraIllustration era={activeId} />
          </div>
          <div className="history-story__content">
            <span className="history-story__period">{activeEra.period}</span>
            <h3 className="history-story__title">{active.title}</h3>
            <p className="history-story__body">{active.body}</p>
            <p className="history-story__fact">
              <span className="history-story__fact-label">Did you know?</span>
              {active.fact}
            </p>
          </div>
          <div className="history-story__nav">
            <button
              type="button"
              className="history-story__arrow"
              onClick={() => step(-1)}
              aria-label="Previous chapter"
            >
              ←
            </button>
            <span className="history-story__counter">
              {activeIndex + 1} / {ERAS.length}
            </span>
            <button
              type="button"
              className="history-story__arrow"
              onClick={() => step(1)}
              aria-label="Next chapter"
            >
              →
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
