export default function IntroDecor() {
  return (
    <>
      <div className="intro-decor" aria-hidden="true">
        <div className="intro-decor__orb intro-decor__orb--1" />
        <div className="intro-decor__orb intro-decor__orb--2" />
        <div className="intro-decor__grid" />
        <div className="intro-compass">
          <svg viewBox="0 0 120 120" className="intro-compass__svg">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="rgba(137,207,240,0.25)"
              strokeWidth="1"
            />
            <circle cx="60" cy="60" r="8" fill="rgba(137,207,240,0.35)" />
            <path
              d="M60 14 L64 52 L60 60 L56 52 Z"
              fill="rgba(255,255,255,0.5)"
            />
            <text
              x="60"
              y="28"
              textAnchor="middle"
              fontSize="9"
              fill="rgba(200,230,250,0.6)"
              fontFamily="var(--font-mono)"
            >
              N
            </text>
          </svg>
        </div>
      </div>
    </>
  );
}
