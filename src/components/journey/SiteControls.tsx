export default function SiteControls() {
  return (
    <div className="site-controls is-audio-on" id="site-controls">
      <aside
        className="audio-hint"
        role="note"
        aria-label="Audio information"
      >
        <svg
          className="audio-hint__icon"
          viewBox="0 0 24 24"
          width={20}
          height={20}
          aria-hidden="true"
        >
          <path
            d="M4 14v3a2 2 0 0 0 2 2h1"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
          <path
            d="M20 14v3a2 2 0 0 1-2 2h-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
          <path
            d="M4 14a8 8 0 0 1 16 0"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
          <path
            d="M7 14v-2a5 5 0 0 1 10 0v2"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </svg>
        <p className="audio-hint__text">
          This site uses audio
          <br />
          Headphones are recommended.
        </p>
      </aside>
      <div className="site-controls__actions">
        <button
          type="button"
          id="btn-sound"
          className="site-btn"
          aria-pressed={true}
        >
          <svg
            className="site-btn__icon"
            viewBox="0 0 24 24"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" />
            <path
              className="site-btn__icon-waves"
              d="M15 9a4 4 0 0 1 0 6M18 7a7 7 0 0 1 0 10"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          </svg>
          <span className="btn-label">Sound on</span>
        </button>
        <button
          type="button"
          id="btn-fullscreen"
          className="site-btn"
          aria-pressed={false}
        >
          <svg
            className="site-btn__icon"
            viewBox="0 0 24 24"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <path
              className="site-btn__icon-expand"
              d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="site-btn__icon-compress"
              d="M9 4H4v5M20 9V4h-5M4 15v5h5M15 20h5v-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="btn-label">Fullscreen</span>
        </button>
      </div>
    </div>
  );
}
