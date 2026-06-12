export default function InfoCard() {
  return (
    <>
      <div id="info-overlay" className="info-overlay" aria-hidden="true" />
      <div
        id="info-card"
        className="info-card"
        role="dialog"
        aria-labelledby="info-card-title"
        aria-modal="true"
      >
        <button
          id="info-card-close"
          className="info-card__close"
          aria-label="Close"
          type="button"
        >
          &times;
        </button>
        <h3 id="info-card-title" className="info-card__title" />
        <p id="info-card-body" className="info-card__body" />
      </div>
    </>
  );
}
