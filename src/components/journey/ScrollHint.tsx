/** Subtle scroll affordance on the intro — not a button. */
export default function ScrollHint() {
  return (
    <div className="intro-scroll-nudge" aria-hidden="true">
      <span className="intro-scroll-nudge__line" />
      <span className="intro-scroll-nudge__chevron">↓</span>
    </div>
  );
}
