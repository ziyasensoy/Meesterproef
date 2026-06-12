import SurfaceHorizonAssets from "@/components/journey/SurfaceHorizonAssets";

export default function SurfaceHorizon() {
  return (
    <div className="surface-horizon" aria-hidden="true">
      <div className="surface-horizon__sky" />
      <SurfaceHorizonAssets />
      <div className="surface-horizon__line">
        <svg viewBox="0 0 1200 56" preserveAspectRatio="none">
          <path
            className="surface-wave surface-wave--back"
            d="M0 28 Q150 12 300 28 T600 28 T900 28 T1200 28 L1200 56 L0 56 Z"
            fill="rgba(72, 158, 210, 0.55)"
          />
          <path
            className="surface-wave"
            d="M0 22 Q150 6 300 22 T600 22 T900 22 T1200 22 L1200 56 L0 56 Z"
            fill="rgba(90, 175, 225, 0.82)"
          />
          <path
            className="surface-wave surface-wave--2"
            d="M0 30 Q150 14 300 30 T600 30 T900 30 T1200 30 L1200 56 L0 56 Z"
            fill="rgba(55, 130, 185, 0.45)"
          />
        </svg>
      </div>
    </div>
  );
}
