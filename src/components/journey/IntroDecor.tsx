export default function IntroDecor() {
  return (
    <>
      <div className="intro-decor" aria-hidden="true">
        <div className="intro-decor__orb intro-decor__orb--1" />
        <div className="intro-decor__orb intro-decor__orb--2" />
        <div className="intro-decor__grid" />
        <div className="intro-compass">
          <svg viewBox="0 0 120 120" className="intro-compass__svg">
            {/* Fixed bezel */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="rgba(8, 32, 52, 0.08)"
              stroke="rgba(10, 50, 78, 0.55)"
              strokeWidth="1.5"
            />
            <circle
              cx="60"
              cy="60"
              r="44"
              fill="rgba(255, 255, 255, 0.35)"
              stroke="rgba(10, 50, 78, 0.2)"
              strokeWidth="1"
            />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
              const rad = ((deg - 90) * Math.PI) / 180;
              const isCardinal = deg % 90 === 0;
              const outer = 48;
              const inner = isCardinal ? 38 : 42;
              const x1 = 60 + Math.cos(rad) * outer;
              const y1 = 60 + Math.sin(rad) * outer;
              const x2 = 60 + Math.cos(rad) * inner;
              const y2 = 60 + Math.sin(rad) * inner;
              return (
                <line
                  key={deg}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(10, 50, 78, 0.45)"
                  strokeWidth={isCardinal ? 1.5 : 0.8}
                  strokeLinecap="round"
                />
              );
            })}
            {/* Cardinal labels — fixed on bezel */}
            <text
              x="60"
              y="21"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#c93030"
              fontFamily="var(--font-mono)"
            >
              N
            </text>
            <text
              x="101"
              y="64"
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="#0a4568"
              fontFamily="var(--font-mono)"
            >
              E
            </text>
            <text
              x="60"
              y="105"
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="#0a4568"
              fontFamily="var(--font-mono)"
            >
              S
            </text>
            <text
              x="19"
              y="64"
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="#0a4568"
              fontFamily="var(--font-mono)"
            >
              W
            </text>
            {/* Rotating needle only */}
            <g className="intro-compass__needle">
              <path
                d="M60 24 L64.5 57 L60 60 L55.5 57 Z"
                fill="#c93030"
              />
              <path
                d="M60 96 L55.5 63 L60 60 L64.5 63 Z"
                fill="#eef4f8"
                stroke="rgba(10, 50, 78, 0.35)"
                strokeWidth="0.6"
              />
            </g>
            {/* Center pivot */}
            <circle cx="60" cy="60" r="5" fill="#0a4568" />
            <circle cx="60" cy="60" r="2" fill="#89cff0" />
          </svg>
        </div>
      </div>
    </>
  );
}
