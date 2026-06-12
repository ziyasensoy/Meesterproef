export default function DepthHud() {
  return (
    <aside id="depth-hud" className="depth-hud" aria-live="polite">
      <div className="depth-hud__line-wrap">
        <span className="depth-hud__surface" data-i18n="dive.surfaceMarker">
          Surface
        </span>
        <div className="depth-hud__line" />
        <span className="depth-hud__floor" data-i18n="dive.floorMarker">
          700 m
        </span>
      </div>
      <div className="depth-hud__info">
        <span id="depth-status" className="depth-hud__status" data-i18n="dive.descending">
          Descending
        </span>
        <span id="depth-value" className="depth-hud__value">
          0m
        </span>
        <span id="depth-zone" className="depth-hud__zone">
          Above the Sea
        </span>
        <span id="depth-layer" className="depth-hud__layer" />
      </div>
    </aside>
  );
}
