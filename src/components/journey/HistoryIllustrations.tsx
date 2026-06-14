import type { ReactNode } from "react";

type EraId = "doggerland" | "hansa" | "ww1" | "ww2" | "oil" | "energy";

const SCENE = { w: 280, h: 176 };

function SceneSvg({
  era,
  children,
}: {
  era: EraId;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${SCENE.w} ${SCENE.h}`}
      className={`history-illustration history-illustration--${era}`}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function HistoryIllustration({ era }: { era: EraId }) {
  switch (era) {
    case "doggerland":
      return (
        <SceneSvg era={era}>
          <defs>
            <linearGradient id="dg-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7ec8e8" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#1a3048" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="dg-land" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9a86c" />
              <stop offset="100%" stopColor="#8b7355" />
            </linearGradient>
            <linearGradient id="dg-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5a9ec0" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#1e3a52" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <rect width={SCENE.w} height={SCENE.h} fill="url(#dg-sky)" />
          <ellipse cx="210" cy="42" rx="48" ry="18" fill="#f4e8c8" opacity="0.35" />
          <path
            d="M0 108 Q70 88 140 96 T280 92 L280 176 L0 176 Z"
            fill="url(#dg-land)"
          />
          <path
            d="M0 118 Q90 108 180 112 T280 110 L280 176 L0 176 Z"
            fill="url(#dg-water)"
            opacity="0.85"
          />
          <path
            d="M0 112 Q120 100 280 108"
            fill="none"
            stroke="rgba(126,200,227,0.5)"
            strokeWidth="2"
          />
          {/* Hills */}
          <path d="M20 98 Q55 72 95 92 Q130 78 170 94" fill="#a89068" opacity="0.6" />
          {/* Mammoth silhouette */}
          <path
            d="M58 108 L62 88 Q68 78 78 82 Q88 76 92 86 L96 108 M72 82 Q74 68 78 62 Q82 58 86 64"
            fill="none"
            stroke="#3d3020"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />
          {/* Hunter figures */}
          <path
            d="M148 108 L152 94 M156 108 L160 96 M154 96 L168 92"
            stroke="#3d3020"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.55"
          />
          {/* Reeds */}
          {[120, 132, 145, 200, 215, 228].map((x, i) => (
            <path
              key={x}
              d={`M${x} 108 L${x + (i % 2 ? 4 : -3)} ${92 - (i % 3) * 4}`}
              stroke="rgba(180,210,140,0.55)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}
        </SceneSvg>
      );

    case "hansa":
      return (
        <SceneSvg era={era}>
          <defs>
            <linearGradient id="hn-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a8daf0" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#5a8aa8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1a2838" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="hn-sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3d6888" />
              <stop offset="100%" stopColor="#142838" />
            </linearGradient>
            <linearGradient id="hn-hull" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6a5040" />
              <stop offset="100%" stopColor="#3d2e24" />
            </linearGradient>
            <linearGradient id="hn-sail" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8f4ec" />
              <stop offset="100%" stopColor="#d4ccc0" />
            </linearGradient>
            <linearGradient id="hn-flag" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f4efe6" />
              <stop offset="50%" stopColor="#f4efe6" />
              <stop offset="50%" stopColor="#b83030" />
              <stop offset="100%" stopColor="#b83030" />
            </linearGradient>
          </defs>
          <rect width={SCENE.w} height={SCENE.h} fill="url(#hn-sky)" />
          {/* Hanseatic port — stepped gables & spire */}
          <path
            d="M0 96 L0 78 L22 62 L38 70 L52 54 L68 64 L82 48 L98 58 L112 44 L128 52 L142 40 L158 50 L172 42 L188 52 L204 46 L220 56 L236 50 L252 58 L268 52 L280 58 L280 96 Z"
            fill="#2a3340"
            opacity="0.9"
          />
          <path d="M112 44 L118 18 L124 44 Z" fill="#c8d0d8" opacity="0.85" />
          <path d="M168 42 L172 24 L176 42 Z" fill="#b8c4cc" opacity="0.7" />
          {[28, 58, 88, 118, 148, 178, 208, 238].map((x) => (
            <rect key={x} x={x} y={58} width="5" height="9" fill="#f0e6d0" opacity="0.65" rx="0.5" />
          ))}
          {/* Sea */}
          <path
            d="M0 108 Q70 102 140 105 T280 103 L280 176 L0 176 Z"
            fill="url(#hn-sea)"
          />
          {[0, 35, 70, 105, 140, 175, 210, 245].map((x) => (
            <path
              key={x}
              d={`M${x} 116 Q${x + 12} 110 ${x + 24} 116`}
              fill="none"
              stroke="rgba(137,207,240,0.22)"
              strokeWidth="1.5"
            />
          ))}
          {/* Distant cog */}
          <g transform="translate(210, 82) scale(0.42)" opacity="0.55">
            <path d="M0 38 L6 20 L70 16 L76 38 Z" fill="#3d4855" />
            <rect x="32" y="4" width="14" height="16" fill="#d8d0c4" opacity="0.8" />
          </g>
          {/* Hanseatic flagship cog */}
          <g transform="translate(38, 52)">
            {/* Wake */}
            <path
              d="M8 88 Q60 94 112 88 Q80 98 40 96"
              fill="rgba(137,207,240,0.12)"
            />
            {/* Hull */}
            <path
              d="M4 78 L14 52 Q20 48 36 46 L88 44 Q108 44 118 48 L132 52 L140 78 Q72 86 4 78 Z"
              fill="url(#hn-hull)"
            />
            {/* Clinker strakes */}
            {[54, 58, 62, 66, 70, 74].map((y) => (
              <path
                key={y}
                d={`M12 ${y} Q72 ${y + 2} 136 ${y}`}
                fill="none"
                stroke="rgba(0,0,0,0.22)"
                strokeWidth="0.8"
              />
            ))}
            {/* Stern castle */}
            <path d="M4 78 L8 58 L28 54 L32 78 Z" fill="#4a3828" />
            <rect x="10" y="60" width="8" height="6" fill="#f0e8d8" opacity="0.5" rx="1" />
            {/* Bow */}
            <path d="M118 48 L132 52 L128 62 L118 58 Z" fill="#5a4535" />
            <path d="M132 52 L148 50 L132 56 Z" fill="#6a5540" />
            {/* Mast */}
            <rect x="68" y="8" width="5" height="72" fill="#5a4530" rx="1" />
            <rect x="66" y="6" width="9" height="4" fill="#6a5540" rx="1" />
            {/* Yard & square sail */}
            <rect x="28" y="18" width="84" height="5" fill="#5a4530" rx="1" />
            <rect x="30" y="22" width="80" height="48" fill="url(#hn-sail)" rx="1" />
            <path
              d="M30 46 Q70 44 110 46"
              fill="none"
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="1"
            />
            <path
              d="M38 28 L38 64 M98 30 L98 62"
              fill="none"
              stroke="rgba(0,0,0,0.05)"
              strokeWidth="0.8"
            />
            {/* Masthead streamer — white & red bands */}
            <path d="M70.5 10 L70.5 6" stroke="#5a4530" strokeWidth="1.2" />
            <path
              d="M70.5 6 Q82 4 96 8 Q88 10 78 9 Q90 11 104 14 Q90 12 78 11 Q88 13 96 17 Q82 14 70.5 12 Z"
              fill="url(#hn-flag)"
              opacity="0.95"
            />
            <path
              d="M70.5 9 Q82 7 96 10"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="0.6"
            />
            {/* Stern banner */}
            <path d="M8 58 L8 50" stroke="#4a3828" strokeWidth="1" />
            <path
              d="M8 50 L8 46 L22 48 Q16 50 8 52 Z"
              fill="#b83030"
              opacity="0.88"
            />
            <path
              d="M8 52 L8 54 L20 52 Q14 54 8 56 Z"
              fill="#f4efe6"
              opacity="0.9"
            />
            {/* Rigging */}
            <path d="M71 14 L30 22 M71 14 L110 22 M71 70 L30 22 M71 70 L110 22" stroke="#4a3828" strokeWidth="0.8" opacity="0.5" />
            {/* Cargo barrels */}
            <ellipse cx="48" cy="68" rx="7" ry="4" fill="#6a5040" />
            <rect x="41" y="60" width="14" height="8" fill="#7a6050" rx="1" />
            <ellipse cx="48" cy="60" rx="7" ry="3" fill="#8a7060" />
            <ellipse cx="92" cy="66" rx="6" ry="3.5" fill="#6a5040" />
            <rect x="86" y="59" width="12" height="7" fill="#7a6050" rx="1" />
            <ellipse cx="92" cy="59" rx="6" ry="2.5" fill="#8a7060" />
            {/* Crew hint */}
            <circle cx="22" cy="56" r="2.5" fill="#d8c8b0" opacity="0.7" />
            <circle cx="108" cy="54" r="2" fill="#d8c8b0" opacity="0.6" />
          </g>
          {/* Gull */}
          <path
            d="M180 38 Q186 34 192 38 Q186 42 180 38"
            fill="none"
            stroke="#e8eef4"
            strokeWidth="1.2"
            opacity="0.6"
          />
        </SceneSvg>
      );

    case "ww1":
      return (
        <SceneSvg era={era}>
          <defs>
            <linearGradient id="w1-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a5568" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#121820" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="w1-sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a4055" />
              <stop offset="100%" stopColor="#0c1824" />
            </linearGradient>
          </defs>
          <rect width={SCENE.w} height={SCENE.h} fill="url(#w1-sky)" />
          {/* Smoke plumes */}
          <ellipse cx="120" cy="38" rx="28" ry="12" fill="#6a7580" opacity="0.35" />
          <ellipse cx="135" cy="28" rx="20" ry="10" fill="#8a959f" opacity="0.25" />
          <path
            d="M0 112 Q90 104 180 108 T280 106 L280 176 L0 176 Z"
            fill="url(#w1-sea)"
          />
          {/* Dreadnought */}
          <g transform="translate(48, 72)">
            <path d="M0 48 L12 28 L160 24 L184 48 Z" fill="#3d4a52" />
            <path d="M40 24 L44 8 L52 16 Z" fill="#5a6570" />
            <path d="M80 22 L84 6 L92 14 Z" fill="#5a6570" />
            <rect x="100" y="18" width="8" height="30" fill="#4a5568" />
            <circle cx="120" cy="38" r="10" fill="none" stroke="#c45c4a" strokeWidth="2.5" />
            <circle cx="120" cy="38" r="4" fill="#c45c4a" opacity="0.6" />
            <path d="M20 48 Q92 52 184 48" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
          </g>
          {/* Mine */}
          <circle cx="220" cy="124" r="8" fill="#4a5568" stroke="#8a959f" strokeWidth="1.5" />
          <path
            d="M212 124 Q220 116 228 124 Q220 132 212 124"
            fill="none"
            stroke="#b8907a"
            strokeWidth="1"
            opacity="0.7"
          />
          {/* Choppy waves */}
          <path
            d="M0 108 Q35 100 70 108 T140 106 T210 108 T280 106"
            fill="none"
            stroke="rgba(154,168,180,0.35)"
            strokeWidth="1.5"
          />
        </SceneSvg>
      );

    case "ww2":
      return (
        <SceneSvg era={era}>
          <defs>
            <linearGradient id="w2-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5a6570" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0e1218" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="w2-sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a4050" />
              <stop offset="100%" stopColor="#0a1018" />
            </linearGradient>
            <radialGradient id="w2-flash" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffd080" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#ff8840" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ff4400" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="w2-hit" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffb060" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#e85030" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#802010" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="w2-splash" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e8f0f6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#89cff0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width={SCENE.w} height={SCENE.h} fill="url(#w2-sky)" />
          {/* Battle smoke */}
          <ellipse cx="88" cy="42" rx="36" ry="14" fill="#4a5560" opacity="0.45" />
          <ellipse cx="100" cy="32" rx="24" ry="10" fill="#6a7580" opacity="0.3" />
          <ellipse cx="210" cy="38" rx="42" ry="16" fill="#3d4850" opacity="0.5" />
          <ellipse cx="198" cy="28" rx="28" ry="11" fill="#5a6570" opacity="0.35" />
          {/* Sea */}
          <path
            d="M0 108 Q50 100 100 106 T200 102 T280 106 L280 176 L0 176 Z"
            fill="url(#w2-sea)"
          />
          <path
            d="M0 108 Q70 102 140 106 T280 104"
            fill="none"
            stroke="rgba(154,168,180,0.28)"
            strokeWidth="1.5"
          />
          {/* Shell splashes */}
          <ellipse cx="138" cy="112" rx="14" ry="5" fill="url(#w2-splash)" opacity="0.75" />
          <path
            d="M126 108 Q138 98 150 108"
            fill="none"
            stroke="rgba(220,235,245,0.45)"
            strokeWidth="1.5"
          />
          <ellipse cx="162" cy="114" rx="10" ry="4" fill="url(#w2-splash)" opacity="0.55" />
          {/* Allied destroyer — firing */}
          <g transform="translate(12, 68)">
            <path d="M0 46 L8 28 L12 24 L96 22 L104 26 L112 46 Z" fill="#2c3844" />
            <rect x="44" y="14" width="7" height="32" fill="#3d4a52" />
            <rect x="62" y="18" width="5" height="26" fill="#3d4a52" />
            <rect x="28" y="34" width="14" height="7" fill="#4a5560" rx="1" />
            <rect x="32" y="32" width="5" height="10" fill="#5a6570" />
            {/* Muzzle flash */}
            <ellipse cx="18" cy="36" rx="12" ry="8" fill="url(#w2-flash)" />
            <path d="M0 36 L18 36" stroke="#ffd080" strokeWidth="2" opacity="0.8" />
            {/* Bow wake */}
            <path d="M112 46 Q80 52 40 50" fill="none" stroke="rgba(137,207,240,0.15)" strokeWidth="1.5" />
            {/* Smoke stack */}
            <rect x="66" y="10" width="5" height="16" fill="#4a5560" />
            <ellipse cx="68" cy="8" rx="4" ry="3" fill="#6a7580" opacity="0.5" />
          </g>
          {/* Direct hit explosion between ships */}
          <g transform="translate(128, 78)">
            <ellipse cx="0" cy="0" rx="22" ry="18" fill="url(#w2-hit)" />
            <ellipse cx="0" cy="0" rx="10" ry="8" fill="#ffd090" opacity="0.85" />
            <path
              d="M-16 -4 L-28 -12 M12 6 L24 14 M-8 12 L-14 24 M6 -10 L10 -22"
              stroke="#ffb060"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
          {/* Enemy cruiser — taking fire */}
          <g transform="translate(148, 62)">
            <path d="M0 52 L10 30 L14 26 L108 22 L118 28 L128 52 Z" fill="#253038" />
            <rect x="48" y="12" width="8" height="38" fill="#354048" />
            <rect x="72" y="16" width="6" height="34" fill="#354048" />
            <rect x="90" y="20" width="5" height="30" fill="#3d4a52" />
            {/* Fire on superstructure */}
            <ellipse cx="76" cy="24" rx="10" ry="12" fill="url(#w2-hit)" opacity="0.85" />
            <ellipse cx="76" cy="22" rx="5" ry="6" fill="#ff9040" opacity="0.7" />
            <path d="M0 52 Q64 56 128 52" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
          </g>
          {/* Shell trajectories */}
          <path
            d="M32 36 Q84 52 128 68"
            fill="none"
            stroke="rgba(255,200,120,0.35)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <path
            d="M180 30 Q155 50 130 72"
            fill="none"
            stroke="rgba(255,200,120,0.25)"
            strokeWidth="0.8"
            strokeDasharray="2 5"
          />
          {/* Secondary splash near enemy bow */}
          <ellipse cx="248" cy="110" rx="11" ry="4" fill="url(#w2-splash)" opacity="0.5" />
          {/* Distant escort */}
          <g transform="translate(228, 88) scale(0.55)" opacity="0.45">
            <path d="M0 38 L6 24 L64 22 L70 38 Z" fill="#2a3540" />
            <ellipse cx="32" cy="18" rx="6" ry="5" fill="#4a5560" opacity="0.4" />
          </g>
          {/* Aircraft overhead */}
          <g transform="translate(200, 22)" opacity="0.55">
            <path d="M0 4 L24 2 L28 6 L24 10 L0 8 Z" fill="#4a5560" />
            <path d="M12 2 L14 -4" stroke="#5a6570" strokeWidth="1.2" />
            <path d="M6 6 L18 6" stroke="#5a6570" strokeWidth="0.8" opacity="0.6" />
          </g>
          {/* Choppy battle seas */}
          {[0, 45, 90, 135, 180, 225, 270].map((x) => (
            <path
              key={x}
              d={`M${x} 120 Q${x + 11} 114 ${x + 22} 120`}
              fill="none"
              stroke="rgba(100,130,150,0.22)"
              strokeWidth="1.2"
            />
          ))}
        </SceneSvg>
      );

    case "oil":
      return (
        <SceneSvg era={era}>
          <defs>
            <linearGradient id="oil-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a6080" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#101820" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="oil-sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a4560" />
              <stop offset="100%" stopColor="#0e1a28" />
            </linearGradient>
            <radialGradient id="oil-flare" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffb060" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width={SCENE.w} height={SCENE.h} fill="url(#oil-sky)" />
          <path
            d="M0 108 Q140 102 280 106 L280 176 L0 176 Z"
            fill="url(#oil-sea)"
          />
          {/* Platform cluster */}
          <g transform="translate(48, 36)">
            <rect x="58" y="48" width="12" height="68" fill="#5a6570" />
            <rect x="38" y="68" width="10" height="48" fill="#6a7580" />
            <rect x="82" y="72" width="10" height="44" fill="#6a7580" />
            <rect x="52" y="36" width="24" height="14" rx="2" fill="#7a858f" />
            <path d="M64 36 L64 20" stroke="#8a959f" strokeWidth="3" />
            <ellipse cx="64" cy="16" rx="10" ry="14" fill="url(#oil-flare)" />
            <ellipse cx="64" cy="14" rx="5" ry="8" fill="#ffd080" opacity="0.85" />
            {/* Crane */}
            <path d="M90 48 L110 28 L118 48" fill="none" stroke="#7a858f" strokeWidth="2" />
          </g>
          {/* Second platform */}
          <g transform="translate(168, 52) scale(0.7)" opacity="0.75">
            <rect x="40" y="50" width="10" height="58" fill="#5a6570" />
            <rect x="36" y="38" width="18" height="12" rx="2" fill="#6a7580" />
            <ellipse cx="45" cy="32" rx="6" ry="10" fill="#ff8c42" opacity="0.6" />
          </g>
          {/* Pipeline on seabed */}
          <path
            d="M0 148 Q80 142 160 146 T280 144"
            fill="none"
            stroke="#e8a050"
            strokeWidth="3"
            opacity="0.45"
          />
          <path
            d="M0 108 Q70 104 140 106 T280 104"
            fill="none"
            stroke="rgba(232,160,80,0.15)"
            strokeWidth="1.5"
          />
        </SceneSvg>
      );

    case "energy":
      return (
        <SceneSvg era={era}>
          <defs>
            <linearGradient id="en-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7ec8e8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#142838" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="en-sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a5070" />
              <stop offset="100%" stopColor="#0e2030" />
            </linearGradient>
          </defs>
          <rect width={SCENE.w} height={SCENE.h} fill="url(#en-sky)" />
          <path
            d="M0 108 Q140 104 280 106 L280 176 L0 176 Z"
            fill="url(#en-sea)"
          />
          {/* Wind farm */}
          {[
            { x: 36, h: 72, s: 1 },
            { x: 88, h: 82, s: 1.1 },
            { x: 140, h: 68, s: 0.95 },
            { x: 192, h: 78, s: 1.05 },
            { x: 238, h: 64, s: 0.9 },
          ].map(({ x, h, s }) => (
            <g key={x} transform={`translate(${x}, ${108 - h}) scale(${s})`}>
              <line x1="0" y1={h} x2="0" y2="8" stroke="#c8d4dc" strokeWidth="2.5" />
              <circle cx="0" cy="6" r="3" fill="#e8f0f6" />
              {[0, 120, 240].map((rot) => (
                <ellipse
                  key={rot}
                  cx="0"
                  cy="6"
                  rx="18"
                  ry="4"
                  fill="none"
                  stroke="#e8f0f6"
                  strokeWidth="1.5"
                  opacity="0.85"
                  transform={`rotate(${rot} 0 6)`}
                />
              ))}
            </g>
          ))}
          {/* Cable to shore */}
          <path
            d="M88 148 Q140 138 192 142"
            fill="none"
            stroke="#89cff0"
            strokeWidth="2"
            opacity="0.35"
            strokeDasharray="4 6"
          />
          {/* Sun glow */}
          <circle cx="230" cy="36" r="22" fill="#f4e8c8" opacity="0.12" />
          <circle cx="230" cy="36" r="12" fill="#f4e8c8" opacity="0.2" />
        </SceneSvg>
      );
  }
}
