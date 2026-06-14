import { useCallback, useState } from "react";
import en from "@/i18n/en";
import HistoryIllustration from "@/components/journey/HistoryIllustrations";

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
      inline: "center",
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
          Choose a chapter in time - from a walkable plain to the wars and industries
          that followed.
        </p>
      </header>

      <section className="history-showcase" aria-label="Historical chapters">
        <nav
          className="history-timeline"
          role="tablist"
          aria-label="Chapters of North Sea history"
        >
          <div className="history-timeline__rail" aria-hidden="true">
            <span className="history-timeline__rail-line" />
            <span
              className="history-timeline__rail-progress"
              style={{
                width: `${(activeIndex / (ERAS.length - 1)) * 84}%`,
              }}
            />
            <ul className="history-timeline__rail-dots">
              {ERAS.map((era, index) => (
                <li key={era.id}>
                  <span
                    className={`history-timeline__rail-dot${
                      activeId === era.id ? " is-active" : ""
                    }`}
                    data-era={era.id}
                  />
                  <span className="history-timeline__rail-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <ul className="history-timeline__list">
            {ERAS.map((era) => {
              const isActive = activeId === era.id;
              return (
                <li key={era.id} className="history-timeline__item-wrap">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="history-story-panel"
                    id={`history-tab-${era.id}`}
                    className={`history-timeline__item${isActive ? " is-active" : ""}`}
                    data-era={era.id}
                    onClick={(e) => select(era.id, e.currentTarget)}
                  >
                    <span className="history-timeline__period">{era.period}</span>
                    <span className="history-timeline__label">{era.tag}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <article
          id="history-story-panel"
          role="tabpanel"
          aria-labelledby={`history-tab-${activeId}`}
          className="history-panel"
          data-era={activeId}
        >
          <div className="history-panel__frame">
            <div className="history-panel__art" aria-hidden="true">
              <div className="history-panel__art-frame">
                <HistoryIllustration era={activeId} />
              </div>
            </div>

            <div key={activeId} className="history-panel__content">
              <div className="history-panel__meta">
                <span className="history-panel__period">{activeEra.period}</span>
                <span className="history-panel__counter">
                  {activeIndex + 1} / {ERAS.length}
                </span>
              </div>
              <h3 className="history-panel__title">{active.title}</h3>
              <p className="history-panel__body">{active.body}</p>
              <blockquote className="history-panel__quote">
                <span className="history-panel__quote-label">Did you know?</span>
                <p>{active.fact}</p>
              </blockquote>
            </div>
          </div>

          <footer className="history-panel__footer">
            <button
              type="button"
              className="history-panel__nav"
              onClick={() => step(-1)}
              aria-label="Previous chapter"
            >
              ←
            </button>
            <button
              type="button"
              className="history-panel__nav"
              onClick={() => step(1)}
              aria-label="Next chapter"
            >
              →
            </button>
          </footer>
        </article>
      </section>
    </div>
  );
}
