/** Scroll affordance on the title page. */
export default function ScrollHint() {
  return (
    <div
      className="intro-scroll-nudge"
      id="intro-scroll-nudge"
      role="status"
      aria-live="polite"
      data-i18n-aria="intro.scrollAria"
      aria-label="Scroll down to start your descent"
    >
      <p className="intro-scroll-nudge__text" data-i18n="intro.scrollToStart">
        Scroll down
      </p>
      <span className="intro-scroll-nudge__line" aria-hidden="true" />
      <span className="intro-scroll-nudge__chevron" aria-hidden="true">
        ↓
      </span>
      <p className="intro-scroll-nudge__sub" data-i18n="intro.scrollSub">
        Your descent into the North Sea begins here
      </p>
    </div>
  );
}
