/** Layer 3 — floating debris hotspots (left of the title column). */
export default function PollutionScene() {
  return (
    <div className="scene scene--pollution" data-reveal-stagger>
      <button
        type="button"
        className="hotspot hotspot--pollution hotspot--bottle"
        data-hotspot
        data-i18n-hotspot="pollution:plastic"
        data-reveal-child
        aria-label="Plastic bottle"
      >
        <svg className="illustration debris" viewBox="0 0 48 96" aria-hidden="true">
          <ellipse cx="24" cy="90" rx="14" ry="3" fill="rgba(0,0,0,0.2)" />
          <path
            d="M14 28 L16 18 L32 18 L34 28 L36 82 Q24 88 12 82 Z"
            fill="#5ecf8a"
            stroke="#3d9e62"
            strokeWidth="1.5"
          />
          <rect x="16" y="12" width="16" height="8" rx="3" fill="#4ab87a" />
          <rect x="17" y="38" width="14" height="10" rx="1" fill="#fff" opacity="0.85" />
          <text
            x="24"
            y="46"
            textAnchor="middle"
            fontSize="5"
            fill="#2d7a4a"
            fontFamily="sans-serif"
          >
            PET
          </text>
        </svg>
        <span className="hotspot-pulse" />
      </button>

      <button
        type="button"
        className="hotspot hotspot--pollution hotspot--net"
        data-hotspot
        data-i18n-hotspot="pollution:net"
        data-reveal-child
        aria-label="Ghost fishing net"
      >
        <svg className="illustration debris" viewBox="0 0 160 110" aria-hidden="true">
          <path
            d="M8 18 L152 18 L128 92 L32 92 Z"
            fill="rgba(255, 160, 80, 0.25)"
            stroke="#e8a060"
            strokeWidth="2.5"
          />
          {[18, 38, 58, 78, 98, 118, 138].map((x) => (
            <line
              key={`v${x}`}
              x1={x}
              y1="18"
              x2={x - 8}
              y2="92"
              stroke="rgba(255, 200, 140, 0.7)"
              strokeWidth="1.2"
            />
          ))}
          {[32, 52, 72].map((y) => (
            <line
              key={`h${y}`}
              x1="8"
              y1={y}
              x2="152"
              y2={y}
              stroke="rgba(255, 200, 140, 0.7)"
              strokeWidth="1.2"
            />
          ))}
          <circle cx="32" cy="92" r="5" fill="#c08050" stroke="#e8a060" strokeWidth="1" />
        </svg>
        <span className="hotspot-pulse" />
      </button>

      <button
        type="button"
        className="hotspot hotspot--pollution hotspot--bag"
        data-hotspot
        data-i18n-hotspot="pollution:bag"
        data-reveal-child
        aria-label="Plastic bag"
      >
        <svg className="illustration debris" viewBox="0 0 64 80" aria-hidden="true">
          <path
            d="M12 22 Q32 4 52 22 L58 68 Q32 76 6 68 Z"
            fill="rgba(240, 245, 250, 0.9)"
            stroke="#c8d0d8"
            strokeWidth="2"
          />
          <path
            d="M18 22 Q32 14 46 22"
            fill="none"
            stroke="#a8b4c0"
            strokeWidth="2.5"
          />
          <path d="M28 30 L36 55" stroke="rgba(180,190,200,0.6)" strokeWidth="1" />
        </svg>
        <span className="hotspot-pulse" />
      </button>

      <button
        type="button"
        className="hotspot hotspot--pollution hotspot--micro"
        data-hotspot
        data-i18n-hotspot="pollution:micro"
        data-reveal-child
        aria-label="Microplastics"
      >
        <svg className="illustration debris" viewBox="0 0 80 56" aria-hidden="true">
          <rect x="8" y="20" width="18" height="12" rx="2" fill="#f0c060" opacity="0.9" />
          <rect x="32" y="8" width="14" height="10" rx="1" fill="#7ec8e8" opacity="0.85" />
          <circle cx="58" cy="28" r="6" fill="#e8e8e8" stroke="#bbb" strokeWidth="1" />
          <circle cx="22" cy="38" r="3" fill="#f0a050" />
          <circle cx="48" cy="42" r="2.5" fill="#fff" stroke="#ccc" strokeWidth="0.8" />
          <circle cx="62" cy="14" r="2" fill="#8ad4f0" />
          <circle cx="12" cy="12" r="2.5" fill="#f5f5f5" stroke="#aaa" strokeWidth="0.8" />
          <text x="40" y="52" textAnchor="middle" fontSize="6" fill="rgba(200,220,240,0.9)">
            micro
          </text>
        </svg>
        <span className="hotspot-pulse" />
      </button>

      <button
        type="button"
        className="hotspot hotspot--pollution hotspot--noise"
        data-hotspot
        data-i18n-hotspot="pollution:noise"
        data-reveal-child
        aria-label="Underwater noise pollution"
      >
        <svg className="illustration debris" viewBox="0 0 120 90" aria-hidden="true">
          <path d="M8 55 L22 45 L22 65 Z" fill="#e8a050" />
          <path d="M28 40 L42 25 L42 75 Z" fill="#f0b868" opacity="0.85" />
          <path d="M48 48 L62 38 L62 68 Z" fill="#e8a050" opacity="0.7" />
          <path d="M68 42 L82 30 L82 76 Z" fill="#f0b868" opacity="0.55" />
          <path d="M88 50 L102 44 L102 66 Z" fill="#e8a050" opacity="0.4" />
          <ellipse cx="18" cy="72" rx="16" ry="5" fill="#6a7580" />
          <rect x="4" y="62" width="28" height="10" rx="2" fill="#5a6570" />
          <text x="60" y="86" textAnchor="middle" fontSize="7" fill="rgba(240,200,140,0.95)">
            noise
          </text>
        </svg>
        <span className="hotspot-pulse" />
      </button>
    </div>
  );
}
