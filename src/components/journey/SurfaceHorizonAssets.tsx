export default function SurfaceHorizonAssets() {
  return (
    <div className="surface-horizon__assets" aria-hidden="true">
      <svg
        className="illustration ship"
        viewBox="0 0 280 130"
      >
        <defs>
          <linearGradient id="horizonShipHullGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a5568" />
            <stop offset="55%" stopColor="#374151" />
            <stop offset="100%" stopColor="#c0392b" />
          </linearGradient>
        </defs>
        <ellipse
          cx="140"
          cy="118"
          rx="120"
          ry="7"
          fill="rgba(0,0,0,0.1)"
        />
        {/* Hull */}
        <path
          d="M20 88 L35 72 L250 72 L265 88 L265 98 L20 98 Z"
          fill="url(#horizonShipHullGrad)"
        />
        <line
          x1="20"
          y1="88"
          x2="265"
          y2="88"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
        {/* Bow */}
        <path d="M20 88 L8 92 L8 98 L20 98 Z" fill="#374151" />
        {/* Containers row 1 */}
        <rect
          x="45"
          y="52"
          width="22"
          height="20"
          rx="1"
          fill="#e8c547"
        />
        <rect
          x="69"
          y="52"
          width="22"
          height="20"
          rx="1"
          fill="#3498db"
        />
        <rect
          x="93"
          y="52"
          width="22"
          height="20"
          rx="1"
          fill="#e74c3c"
        />
        <rect
          x="117"
          y="52"
          width="22"
          height="20"
          rx="1"
          fill="#e8c547"
        />
        <rect
          x="141"
          y="52"
          width="22"
          height="20"
          rx="1"
          fill="#3498db"
        />
        <rect
          x="165"
          y="52"
          width="22"
          height="20"
          rx="1"
          fill="#2ecc71"
        />
        {/* Containers row 2 */}
        <rect
          x="57"
          y="32"
          width="22"
          height="20"
          rx="1"
          fill="#3498db"
        />
        <rect
          x="81"
          y="32"
          width="22"
          height="20"
          rx="1"
          fill="#e74c3c"
        />
        <rect
          x="105"
          y="32"
          width="22"
          height="20"
          rx="1"
          fill="#e8c547"
        />
        <rect
          x="129"
          y="32"
          width="22"
          height="20"
          rx="1"
          fill="#9b59b6"
        />
        {/* Bridge / superstructure */}
        <rect
          x="195"
          y="38"
          width="55"
          height="34"
          rx="2"
          fill="#ecf0f1"
        />
        <rect
          x="200"
          y="42"
          width="14"
          height="10"
          rx="1"
          fill="#3498db"
          opacity="0.7"
        />
        <rect
          x="218"
          y="42"
          width="14"
          height="10"
          rx="1"
          fill="#3498db"
          opacity="0.7"
        />
        <rect
          x="236"
          y="42"
          width="10"
          height="10"
          rx="1"
          fill="#3498db"
          opacity="0.7"
        />
        <rect
          x="210"
          y="22"
          width="30"
          height="16"
          rx="2"
          fill="#bdc3c7"
        />
        {/* Funnel */}
        <rect
          x="225"
          y="8"
          width="14"
          height="14"
          rx="1"
          fill="#2c3e50"
        />
        <rect x="227" y="6" width="10" height="4" rx="1" fill="#c0392b" />
        {/* Crane */}
        <line
          x1="38"
          y1="52"
          x2="38"
          y2="28"
          stroke="#7f8c8d"
          strokeWidth="2"
        />
        <line
          x1="38"
          y1="28"
          x2="58"
          y2="38"
          stroke="#7f8c8d"
          strokeWidth="2"
        />
                        </svg>
            
                        {/* Wind Farm */}
                        <svg
        className="illustration wind-farm"
        viewBox="0 0 300 200"
                        >
        <ellipse
          cx="150"
          cy="185"
          rx="130"
          ry="10"
          fill="rgba(0,0,0,0.06)"
        />
        <g className="turbine turbine--1">
          <rect x="68" y="80" width="6" height="100" fill="#d0d8e0" />
          <g className="turbine-hub" transform="translate(71 78)">
            <g className="turbine-blades">
              <ellipse cx="0" cy="0" rx="35" ry="6" fill="#eef2f6" />
              <ellipse
                cx="0"
                cy="0"
                rx="35"
                ry="6"
                fill="#eef2f6"
                transform="rotate(120)"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="35"
                ry="6"
                fill="#eef2f6"
                transform="rotate(240)"
              />
            </g>
            <circle cx="0" cy="0" r="4" fill="#a0aab4" />
          </g>
        </g>
        <g className="turbine turbine--2">
          <rect x="148" y="60" width="6" height="120" fill="#d0d8e0" />
          <g className="turbine-hub" transform="translate(151 58)">
            <g className="turbine-blades">
              <ellipse cx="0" cy="0" rx="40" ry="7" fill="#eef2f6" />
              <ellipse
                cx="0"
                cy="0"
                rx="40"
                ry="7"
                fill="#eef2f6"
                transform="rotate(120)"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="40"
                ry="7"
                fill="#eef2f6"
                transform="rotate(240)"
              />
            </g>
            <circle cx="0" cy="0" r="4" fill="#a0aab4" />
          </g>
        </g>
        <g className="turbine turbine--3">
          <rect x="228" y="90" width="6" height="90" fill="#d0d8e0" />
          <g className="turbine-hub" transform="translate(231 88)">
            <g className="turbine-blades">
              <ellipse cx="0" cy="0" rx="30" ry="5" fill="#eef2f6" />
              <ellipse
                cx="0"
                cy="0"
                rx="30"
                ry="5"
                fill="#eef2f6"
                transform="rotate(120)"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="30"
                ry="5"
                fill="#eef2f6"
                transform="rotate(240)"
              />
            </g>
            <circle cx="0" cy="0" r="4" fill="#a0aab4" />
          </g>
        </g>
                        </svg>
            
                        {/* Oil Platform */}
                        <svg
        className="illustration oil-platform"
        viewBox="0 -15 160 215"
                        >
        <defs>
          <linearGradient id="horizonLegGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6a7580" />
            <stop offset="100%" stopColor="#9aa4ae" />
          </linearGradient>
        </defs>
        <ellipse cx="80" cy="188" rx="65" ry="7" fill="rgba(0,0,0,0.1)" />
        {/* Legs with cross-bracing */}
        <line
          x1="35"
          y1="70"
          x2="25"
          y2="185"
          stroke="url(#horizonLegGrad)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="125"
          y1="70"
          x2="135"
          y2="185"
          stroke="url(#horizonLegGrad)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="60"
          y1="70"
          x2="50"
          y2="185"
          stroke="url(#horizonLegGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="100"
          y1="70"
          x2="110"
          y2="185"
          stroke="url(#horizonLegGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="30"
          y1="120"
          x2="130"
          y2="100"
          stroke="#8a949e"
          strokeWidth="2"
        />
        <line
          x1="30"
          y1="150"
          x2="130"
          y2="130"
          stroke="#8a949e"
          strokeWidth="2"
        />
        <line
          x1="45"
          y1="100"
          x2="115"
          y2="140"
          stroke="#8a949e"
          strokeWidth="2"
        />
        <line
          x1="115"
          y1="100"
          x2="45"
          y2="140"
          stroke="#8a949e"
          strokeWidth="2"
        />
        {/* Deck levels */}
        <rect
          x="20"
          y="62"
          width="120"
          height="8"
          rx="1"
          fill="#8a949e"
        />
        <rect
          x="30"
          y="48"
          width="100"
          height="8"
          rx="1"
          fill="#9aa4ae"
        />
        <rect x="40" y="34" width="80" height="8" rx="1" fill="#aab4be" />
        {/* Living quarters */}
        <rect
          x="50"
          y="14"
          width="60"
          height="20"
          rx="2"
          fill="#e67e22"
        />
        <rect x="55" y="18" width="10" height="8" rx="1" fill="#fdebd0" />
        <rect x="70" y="18" width="10" height="8" rx="1" fill="#fdebd0" />
        <rect x="85" y="18" width="10" height="8" rx="1" fill="#fdebd0" />
        <rect x="100" y="18" width="6" height="8" rx="1" fill="#fdebd0" />
        {/* Helipad */}
        <circle
          cx="80"
          cy="8"
          r="12"
          fill="#f1c40f"
          stroke="#d4ac0d"
          strokeWidth="1.5"
        />
        <circle
          cx="80"
          cy="8"
          r="8"
          fill="none"
          stroke="#d4ac0d"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
        <text
          x="80"
          y="11"
          textAnchor="middle"
          fontSize="7"
          fontWeight="bold"
          fill="#d4ac0d"
          fontFamily="sans-serif"
        >
          H
        </text>
        {/* Derrick / drill tower */}
        <rect x="76" y="-10" width="8" height="22" fill="#c0392b" />
        <line
          x1="72"
          y1="-10"
          x2="88"
          y2="-10"
          stroke="#c0392b"
          strokeWidth="3"
        />
        <line
          x1="76"
          y1="-10"
          x2="70"
          y2="14"
          stroke="#c0392b"
          strokeWidth="2"
        />
        <line
          x1="84"
          y1="-10"
          x2="90"
          y2="14"
          stroke="#c0392b"
          strokeWidth="2"
        />
        {/* Flare stack */}
        <rect x="118" y="40" width="4" height="18" fill="#7f8c8d" />
        <ellipse
          cx="120"
          cy="36"
          rx="4"
          ry="6"
          fill="#ff6b35"
          opacity="0.8"
          className="platform-flare"
        />
        {/* Crane */}
        <line
          x1="25"
          y1="62"
          x2="25"
          y2="40"
          stroke="#7f8c8d"
          strokeWidth="2"
        />
        <line
          x1="25"
          y1="40"
          x2="45"
          y2="50"
          stroke="#7f8c8d"
          strokeWidth="2"
        />
        {/* Safety railings */}
        <line
          x1="20"
          y1="55"
          x2="140"
          y2="55"
          stroke="#bdc3c7"
          strokeWidth="1"
        />
                        </svg>
    </div>
  );
}
