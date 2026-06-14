import type { CSSProperties } from "react";
import {
  InfoCard,
  IntroControls,
  IntroClouds,
  IntroDecor,
  JourneyChrome,
  HistoryInteractive,
  PollutionScene,
  ScrollHint,
  SiteFooter,
} from "@/components/journey";
import { useExperience } from "@/hooks/useExperience";

export default function JourneyPage() {
  useExperience();

  return (
    <>
      <JourneyChrome />

      <main className="journey">
            {/* INTRO - pinned experimental sequence */}
            <section
              className="pin-sequence pin-sequence--intro"
              style={{ "--pin-vh": 300 } as CSSProperties}
              data-layer="intro"
              data-speed="0.6"
              data-meters-start="0"
              data-meters-end="0"
            >
              <div className="pin-sequence__sticky">
                <div className="intro-sky" aria-hidden="true"></div>
                <IntroClouds />
                <div className="seagulls" aria-hidden="true">
                  <svg
                    className="seagull seagull--1"
                    viewBox="0 0 64 32"
                    width="52"
                    height="26"
                  >
                    <path
                      className="seagull-wing"
                      d="M4 18 Q16 6 32 16 Q48 6 60 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <ellipse cx="32" cy="18" rx="3.5" ry="2" fill="currentColor" />
                  </svg>
                  <svg
                    className="seagull seagull--2"
                    viewBox="0 0 64 32"
                    width="40"
                    height="20"
                  >
                    <path
                      className="seagull-wing"
                      d="M4 18 Q16 6 32 16 Q48 6 60 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <ellipse cx="32" cy="18" rx="3" ry="1.8" fill="currentColor" />
                  </svg>
                  <svg
                    className="seagull seagull--3"
                    viewBox="0 0 64 32"
                    width="46"
                    height="23"
                  >
                    <path
                      className="seagull-wing"
                      d="M4 18 Q16 6 32 16 Q48 6 60 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                    />
                    <ellipse cx="32" cy="18" rx="3.2" ry="1.9" fill="currentColor" />
                  </svg>
                  <svg
                    className="seagull seagull--4"
                    viewBox="0 0 64 32"
                    width="36"
                    height="18"
                  >
                    <path
                      className="seagull-wing"
                      d="M4 18 Q16 6 32 16 Q48 6 60 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <ellipse cx="32" cy="18" rx="2.8" ry="1.6" fill="currentColor" />
                  </svg>
                </div>
                <div className="intro-bg-text" aria-hidden="true">NORTH SEA</div>
                <IntroDecor />
                <div className="layer__content layer__content--intro">
                  <h1
                    className="title-hero"
                    data-split="chars"
                    data-i18n="intro.title"
                    data-i18n-aria="intro.title"
                  >
                    The North Sea
                  </h1>
                  <div className="intro-hero-meta">
                    <p className="intro-tagline" data-i18n="intro.tagline">
                      An interactive descent
                    </p>
                    <ul
                      className="intro-stats"
                      data-i18n-aria="intro.statsAria"
                      aria-label="North Sea facts"
                    >
                      <li className="intro-stat" data-i18n="intro.statCountries">
                        7 nations
                      </li>
                      <li className="intro-stat" data-i18n="intro.statArea">
                        570,000 km²
                      </li>
                      <li className="intro-stat" data-i18n="intro.statDepth">
                        700 m deep
                      </li>
                    </ul>
                  </div>
                </div>
                <IntroControls />
                <ScrollHint />
              </div>
            </section>
      
            {/* LAYER 1 - SURFACE */}
            <section
              className="layer layer--surface layer--surface-open layer--offset-right"
              data-layer="surface"
              data-speed="1"
              data-meters-start="0"
              data-meters-end="0"
            >
              <span className="layer-num" aria-hidden="true">01</span>
              <div className="layer__content">
                <span
                  className="layer-label"
                  data-scrub="slide-left"
                  data-i18n="layers.surface.label"
                >
                  01 / Surface
                </span>
                <h2
                  className="title-section"
                  data-split="words"
                  data-scrub="blur-in"
                  data-i18n="layers.surface.title"
                >
                  Above the surface, the North Sea is one of Europe's busiest regions.
                </h2>
                <div className="fact-grid" data-reveal-stagger>
                  <div className="fact-card" data-reveal-child>
                    <h3 data-i18n="layers.surface.fact1Title">International Shipping</h3>
                    <p data-i18n="layers.surface.fact1Body">
                      Over 400,000 ships cross these waters each year, carrying goods
                      between continents and connecting global trade routes.
                    </p>
                  </div>
                  <div className="fact-card" data-reveal-child>
                    <h3 data-i18n="layers.surface.fact3Title">Oil &amp; Gas</h3>
                    <p data-i18n="layers.surface.fact3Body">
                      For decades, offshore platforms have extracted fossil fuels from
                      beneath the seabed, shaping the region's economy.
                    </p>
                  </div>
                  <div className="fact-card" data-reveal-child>
                    <h3 data-i18n="layers.surface.fact2Title">Offshore Wind Energy</h3>
                    <p data-i18n="layers.surface.fact2Body">
                      The North Sea hosts some of the world's largest wind farms,
                      generating clean electricity for millions of European homes.
                    </p>
                  </div>
                </div>
              </div>
            </section>
      
            {/* LAYER 2 - ANIMALS AND NATURE */}
            <section
              className="layer layer--nature layer--offset-left"
              data-layer="nature"
              data-speed="0.8"
              data-meters-start="0"
              data-meters-end="20"
            >
              <span className="layer-num" aria-hidden="true">02</span>
              <div className="layer__visuals" aria-hidden="true">
                <div className="scene scene--underwater" data-reveal-stagger>
                  {/* Jellyfish */}
                  <button
                    className="hotspot hotspot--jellyfish"
                    data-hotspot
                    data-i18n-hotspot="jellyfish"
                    data-reveal-child
                    data-title="Compass Jellyfish"
                    data-body="Compass jellyfish drift through North Sea waters in summer and autumn, pulsing gently with the currents. Their stinging tentacles capture tiny fish and plankton, making them both predator and prey in the shallow food web."
                    aria-label="Learn about compass jellyfish"
                  >
                    <svg
                      className="illustration animal animal--jellyfish jellyfish__svg"
                      viewBox="0 0 80 120"
                      fill="none"
                    >
                      <ellipse
                        cx="40"
                        cy="32"
                        rx="28"
                        ry="22"
                        fill="rgba(200, 150, 230, 0.35)"
                      />
                      <ellipse
                        cx="40"
                        cy="36"
                        rx="16"
                        ry="12"
                        fill="rgba(230, 190, 255, 0.28)"
                      />
                      <path
                        d="M22 52 Q18 78 20 108"
                        stroke="rgba(200, 160, 235, 0.45)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M32 54 Q28 82 30 112"
                        stroke="rgba(210, 170, 240, 0.4)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M40 56 Q40 85 40 115"
                        stroke="rgba(200, 160, 235, 0.5)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M48 54 Q52 82 50 110"
                        stroke="rgba(210, 170, 240, 0.4)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M58 52 Q62 76 58 104"
                        stroke="rgba(200, 160, 235, 0.45)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="hotspot-pulse"></span>
                  </button>

                  {/* Plankton */}
                  <button
                    className="hotspot hotspot--plankton"
                    data-hotspot
                    data-i18n-hotspot="plankton"
                    data-reveal-child
                    data-title="Plankton"
                    data-body="Microscopic phytoplankton and zooplankton drift in sunlit surface waters, forming the foundation of the North Sea food chain. Every fish, whale, and seabird here ultimately depends on these tiny organisms."
                    aria-label="Learn about plankton"
                  >
                    <svg
                      className="illustration animal animal--plankton"
                      viewBox="0 0 120 80"
                    >
                      <circle cx="18" cy="28" r="3" fill="rgba(160, 230, 200, 0.85)" />
                      <circle cx="32" cy="18" r="2" fill="rgba(200, 245, 225, 0.75)" />
                      <circle cx="44" cy="34" r="2.5" fill="rgba(140, 210, 190, 0.8)" />
                      <circle cx="58" cy="22" r="2" fill="rgba(180, 240, 210, 0.7)" />
                      <circle cx="70" cy="38" r="3" fill="rgba(160, 230, 200, 0.85)" />
                      <circle cx="26" cy="48" r="2" fill="rgba(200, 245, 225, 0.75)" />
                      <circle cx="40" cy="56" r="2.5" fill="rgba(140, 210, 190, 0.8)" />
                      <circle cx="54" cy="50" r="2" fill="rgba(180, 240, 210, 0.7)" />
                      <circle cx="66" cy="58" r="2.5" fill="rgba(160, 230, 200, 0.85)" />
                      <circle cx="82" cy="30" r="2" fill="rgba(200, 245, 225, 0.75)" />
                      <circle cx="90" cy="46" r="3" fill="rgba(140, 210, 190, 0.8)" />
                      <circle cx="12" cy="52" r="1.5" fill="rgba(180, 240, 210, 0.65)" />
                      <circle cx="76" cy="14" r="1.5" fill="rgba(160, 230, 200, 0.65)" />
                    </svg>
                    <span className="hotspot-pulse"></span>
                  </button>

                  {/* Seal */}
                  <button
                    className="hotspot hotspot--seal"
                    data-hotspot
                    data-i18n-hotspot="seal"
                    data-reveal-child
                    data-title="Harbour Seal"
                    data-body="Harbour seals are among the most common marine mammals in the North Sea. They hunt fish and crustaceans in coastal waters and often rest on sandbanks. Protected since the 1970s, their populations have slowly recovered across the region."
                    aria-label="Learn about harbour seals"
                  >
                    <svg
                      className="illustration animal animal--seal"
                      viewBox="0 0 140 80"
                    >
                      <ellipse cx="70" cy="55" rx="55" ry="22" fill="#8a9aaa" />
                      <ellipse cx="70" cy="50" rx="50" ry="18" fill="#a0b0c0" />
                      <circle cx="110" cy="42" r="14" fill="#a0b0c0" />
                      <circle cx="115" cy="38" r="3" fill="#2a2a2a" />
                      <circle cx="116" cy="37" r="1" fill="#fff" />
                      <ellipse
                        cx="55"
                        cy="38"
                        rx="8"
                        ry="5"
                        fill="#8a9aaa"
                        transform="rotate(-20 55 38)"
                      />
                      <ellipse
                        cx="85"
                        cy="38"
                        rx="8"
                        ry="5"
                        fill="#8a9aaa"
                        transform="rotate(20 85 38)"
                      />
                      <path d="M25 50 Q15 45 10 55 Q20 58 25 50" fill="#a0b0c0" />
                      <path d="M25 58 Q15 63 10 53 Q20 50 25 58" fill="#a0b0c0" />
                    </svg>
                    <span className="hotspot-pulse"></span>
                  </button>
      
                  {/* Dolphin */}
                  <button
                    className="hotspot hotspot--dolphin"
                    data-hotspot
                    data-i18n-hotspot="dolphin"
                    data-reveal-child
                    data-title="Common Dolphin"
                    data-body="Common dolphins travel in pods through the open North Sea, communicating with clicks and whistles. They feed on herring and mackerel, using echolocation to navigate and hunt in the murky depths."
                    aria-label="Learn about common dolphins"
                  >
                    <svg
                      className="illustration animal animal--dolphin"
                      viewBox="0 0 160 70"
                    >
                      <ellipse cx="80" cy="38" rx="60" ry="18" fill="#6a8aaa" />
                      <path
                        d="M130 30 Q155 20 160 35 Q150 45 130 40"
                        fill="#6a8aaa"
                      />
                      <path d="M30 30 Q10 15 5 35 Q15 45 35 40" fill="#5a7a9a" />
                      <polygon points="80,15 85,5 90,15" fill="#5a7a9a" />
                      <circle cx="115" cy="32" r="3" fill="#1a1a2a" />
                      <ellipse
                        cx="80"
                        cy="42"
                        rx="45"
                        ry="8"
                        fill="#7a9aba"
                        opacity="0.5"
                      />
                    </svg>
                    <span className="hotspot-pulse"></span>
                  </button>
      
                  {/* Crab */}
                  <button
                    className="hotspot hotspot--crab"
                    data-hotspot
                    data-i18n-hotspot="crab"
                    data-reveal-child
                    data-title="Shore Crab"
                    data-body="The shore crab thrives in shallow North Sea waters and along rocky coastlines. As both predator and prey, it plays a vital role in the coastal food web, feeding on algae and small invertebrates."
                    aria-label="Learn about shore crabs"
                  >
                    <svg className="illustration animal animal--crab" viewBox="0 0 90 70">
                      <ellipse cx="45" cy="40" rx="25" ry="18" fill="#c0392b" />
                      <ellipse cx="45" cy="38" rx="22" ry="15" fill="#e74c3c" />
                      <circle cx="38" cy="32" r="3" fill="#1a1a1a" />
                      <circle cx="52" cy="32" r="3" fill="#1a1a1a" />
                      <path
                        d="M20 35 L5 20 M20 42 L2 42 M20 49 L5 58"
                        stroke="#c0392b"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M70 35 L85 20 M70 42 L88 42 M70 49 L85 58"
                        stroke="#c0392b"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M35 55 L30 65 M45 57 L45 68 M55 55 L60 65"
                        stroke="#c0392b"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="hotspot-pulse"></span>
                  </button>
      
                  {/* Fish */}
                  <button
                    className="hotspot hotspot--fish"
                    data-hotspot
                    data-i18n-hotspot="herring"
                    data-reveal-child
                    data-title="North Sea Herring"
                    data-body="Herring form enormous shoals that migrate through the North Sea in seasonal cycles. These silvery fish have sustained fishing communities for centuries and remain a cornerstone of the marine food chain."
                    aria-label="Learn about North Sea herring"
                  >
                    <svg
                      className="illustration animal animal--fish"
                      viewBox="0 0 100 50"
                    >
                      <ellipse cx="45" cy="25" rx="35" ry="12" fill="#c0d0e0" />
                      <path d="M10 25 Q5 15 2 25 Q5 35 10 25" fill="#a0b8cc" />
                      <polygon points="80,25 98,15 98,35" fill="#a0b8cc" />
                      <circle cx="60" cy="22" r="2.5" fill="#1a2030" />
                      <path
                        d="M30 20 Q45 15 60 20"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1"
                      />
                    </svg>
                    <span className="hotspot-pulse"></span>
                  </button>
                </div>
              </div>
              <div className="layer__content">
                <span
                  className="layer-label"
                  data-scrub="slide-right"
                  data-i18n="layers.nature.label"
                >
                  02 / Life Below
                </span>
                <h2
                  className="title-section"
                  data-split="words"
                  data-scrub="scale-up"
                  data-i18n="layers.nature.title"
                >
                  A living ecosystem thrives beneath the waves.
                </h2>
                <p
                  className="text-body text-body--mono"
                  data-scrub="slide-left"
                  data-i18n="layers.nature.hint"
                >
                  Click the creatures - each one holds a story.
                </p>
              </div>
            </section>
      
            {/* LAYER 3 - POLLUTION */}
            <section
              className="layer layer--pollution layer--offset-right"
              data-layer="pollution"
              data-speed="0.7"
              data-meters-start="20"
              data-meters-end="35"
            >
              <span className="layer-num" aria-hidden="true">03</span>
              <div className="layer__visuals" aria-hidden="true">
                <PollutionScene />
              </div>
              <div className="layer__content">
                <span
                  className="layer-label"
                  data-scrub="slide-left"
                  data-i18n="layers.pollution.label"
                >
                  03 / Traces
                </span>
                <h2
                  className="title-section"
                  data-split="words"
                  data-scrub="blur-in"
                  data-i18n="layers.pollution.title"
                >
                  Human activity leaves traces beneath the surface.
                </h2>
                <p
                  className="text-body text-body--mono layer-hint"
                  data-scrub="slide-left"
                  data-i18n="layers.pollution.hint"
                >
                  Click the traces on the left - each one holds a story.
                </p>
              </div>
            </section>
      
            {/* LAYER 4 - CABLES AND PIPELINES */}
            <section
              className="layer layer--infrastructure layer--offset-left"
              data-layer="infrastructure"
              data-speed="0.5"
              data-meters-start="35"
              data-meters-end="40"
            >
              <span className="layer-num" aria-hidden="true">04</span>
              <div className="layer__visuals" aria-hidden="true">
                <div className="scene scene--seabed" data-reveal-stagger>
                  <div className="seabed-ground" data-reveal-child></div>
                  <svg
                    className="illustration cables"
                    data-reveal-child
                    viewBox="0 0 800 200"
                  >
                    <path
                      className="cable cable--internet"
                      d="M0 80 Q200 60 400 90 T800 70"
                      fill="none"
                      stroke="#3a5a8a"
                      strokeWidth="4"
                    />
                    <path
                      className="cable cable--power"
                      d="M0 120 Q200 140 400 110 T800 130"
                      fill="none"
                      stroke="#8a6a3a"
                      strokeWidth="4"
                    />
                    <path
                      className="cable cable--gas"
                      d="M0 160 Q200 150 400 170 T800 155"
                      fill="none"
                      stroke="#5a8a6a"
                      strokeWidth="4"
                    />
                    <circle className="cable-node" cx="200" cy="72" r="5" fill="#4af" />
                    <circle className="cable-node" cx="400" cy="88" r="5" fill="#4af" />
                    <circle className="cable-node" cx="600" cy="74" r="5" fill="#4af" />
                    <circle className="cable-node" cx="200" cy="138" r="5" fill="#fa4" />
                    <circle className="cable-node" cx="500" cy="118" r="5" fill="#fa4" />
                    <circle className="cable-node" cx="700" cy="128" r="5" fill="#fa4" />
                    <circle className="cable-node" cx="300" cy="158" r="5" fill="#4f8" />
                    <circle className="cable-node" cx="550" cy="168" r="5" fill="#4f8" />
                  </svg>
                </div>
              </div>
              <div className="layer__content">
                <span
                  className="layer-label"
                  data-scrub="slide-right"
                  data-i18n="layers.infrastructure.label"
                >
                  04 / Deep Network
                </span>
                <h2
                  className="title-section"
                  data-split="words"
                  data-scrub="blur-in"
                  data-i18n="layers.infrastructure.title"
                >
                  Deep beneath the waves lies an invisible infrastructure connecting
                  countries and powering millions of homes.
                </h2>
                <div className="fact-grid fact-grid--compact" data-reveal-stagger>
                  <div className="fact-card fact-card--glow" data-reveal-child>
                    <h3 data-i18n="layers.infrastructure.fact1Title">Internet Cables</h3>
                    <p data-i18n="layers.infrastructure.fact1Body">
                      Subsea fibre-optic cables carry over 99% of international data
                      traffic between Europe and the world.
                    </p>
                  </div>
                  <div className="fact-card fact-card--glow" data-reveal-child>
                    <h3 data-i18n="layers.infrastructure.fact2Title">Power Cables</h3>
                    <p data-i18n="layers.infrastructure.fact2Body">
                      High-voltage lines link offshore wind farms to national grids,
                      delivering renewable energy ashore.
                    </p>
                  </div>
                  <div className="fact-card fact-card--glow" data-reveal-child>
                    <h3 data-i18n="layers.infrastructure.fact3Title">Gas Pipelines</h3>
                    <p data-i18n="layers.infrastructure.fact3Body">
                      An extensive network of pipelines transports natural gas between
                      nations beneath the seabed.
                    </p>
                  </div>
                </div>
              </div>
            </section>
      
            {/* LAYER 5 - HISTORY (interactive timeline) */}
            <section
              className="layer layer--history layer--history-interactive"
              data-layer="history"
              data-speed="0.65"
              data-meters-start="40"
              data-meters-end="40"
            >
              <span className="layer-num" aria-hidden="true">05</span>
              <HistoryInteractive />
            </section>

            {/* LAYER 6 - POLITICS & FUTURE (MAP) */}
            <section
              className="layer layer--map layer--future"
              data-layer="politics"
              data-speed="0.85"
              data-meters-start="40"
              data-meters-end="40"
            >
              <span className="layer-num" aria-hidden="true">06</span>
              <div className="layer__content layer__content--map">
                <span
                  className="layer-label"
                  data-scrub="slide-left"
                  data-i18n="layers.politics.label"
                >
                  06 / Politics &amp; Future
                </span>
                <h2
                  className="title-section title-section--map"
                  data-split="words"
                  data-scrub="blur-in"
                  data-i18n="layers.politics.title"
                >
                  Seven nations share this sea - and the choices made today will
                  define its future.
                </h2>
                <p
                  className="text-body text-body--mono map-instruction"
                  data-scrub="slide-left"
                  data-i18n="layers.politics.instruction"
                >
                  Explore the map - borders, energy, fishing, and climate plans all
                  collide here.
                </p>
              </div>

              <div className="map-container" data-reveal-stagger>
                <nav
                  className="map-legend"
                  data-i18n-aria="meta.mapLegend"
                  aria-label="Map categories"
                  data-reveal-child
                >
                  <button
                    type="button"
                    className="map-filter is-active"
                    data-map-filter="all"
                    data-i18n="layers.politics.filters.all"
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className="map-filter map-filter--borders"
                    data-map-filter="borders"
                    data-i18n="layers.politics.filters.borders"
                  >
                    Borders
                  </button>
                  <button
                    type="button"
                    className="map-filter map-filter--fishing"
                    data-map-filter="fishing"
                    data-i18n="layers.politics.filters.fishing"
                  >
                    Fishing
                  </button>
                  <button
                    type="button"
                    className="map-filter map-filter--energy"
                    data-map-filter="energy"
                    data-i18n="layers.politics.filters.energy"
                  >
                    Energy
                  </button>
                  <button
                    type="button"
                    className="map-filter map-filter--environment"
                    data-map-filter="environment"
                    data-i18n="layers.politics.filters.environment"
                  >
                    Environment
                  </button>
                  <button
                    type="button"
                    className="map-filter map-filter--security"
                    data-map-filter="security"
                    data-i18n="layers.politics.filters.security"
                  >
                    Security
                  </button>
                  <button
                    type="button"
                    className="map-filter map-filter--trade"
                    data-map-filter="trade"
                    data-i18n="layers.politics.filters.trade"
                  >
                    Trade
                  </button>
                </nav>

                <div className="map-wrapper" data-reveal-child>
                  <div
                    id="north-sea-leaflet"
                    className="north-sea-leaflet"
                    role="application"
                    data-i18n-aria="meta.mapAria"
                    aria-label="Satellite map of the North Sea region"
                  ></div>
                  <div className="map-vignette" aria-hidden="true"></div>
                </div>
              </div>
            </section>
      
            {/* FINAL MESSAGE */}
            <section
              className="layer layer--finale layer--finale-exp"
              data-layer="finale"
              data-speed="0.3"
              data-meters-start="40"
              data-meters-end="40"
            >
              <div className="layer__content layer__content--centered">
                <h2
                  className="title-finale"
                  data-split="words"
                  data-scrub="blur-in"
                  data-i18n="layers.finale.title"
                >
                  The North Sea is more than water.
                </h2>
                <div className="finale-lines" data-reveal-stagger>
                  <p className="finale-line" data-reveal-child data-i18n="layers.finale.line1">
                    A source of energy.
                  </p>
                  <p className="finale-line" data-reveal-child data-i18n="layers.finale.line2">
                    A route for trade.
                  </p>
                  <p className="finale-line" data-reveal-child data-i18n="layers.finale.line3">
                    A home for wildlife.
                  </p>
                  <p
                    className="finale-line finale-line--question"
                    data-reveal-child
                    data-i18n="layers.finale.line4"
                  >
                    What does the North Sea mean to you?
                  </p>
                </div>
                <p className="finale-thanks" data-reveal data-i18n="layers.finale.thanks">
                  Thank you for exploring the North Sea.
                </p>
              </div>
            </section>
      </main>

      <SiteFooter />
      <InfoCard />
    </>
  );
}
