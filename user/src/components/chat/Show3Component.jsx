import { useTranslation } from "react-i18next";

const OPTION_LABELS = ["A", "B", "C"];

export default function Show3Component({ tridentResults, sessionId, locale, navigate, onSubmitAnswer }) {
  const { t } = useTranslation();
  const isEs = locale.startsWith("es");

  return (
    <div style={{ width: "100%" }}>
      <p style={{ margin: "0 0 8px", fontWeight: "600", fontSize: "13px", color: "#555" }}>
        {isEs ? "Estas son las 3 mejores opciones para ti:" : "These are the 3 best matches for your search:"}
      </p>
      <div className="chat-properties-scroll">
        {(tridentResults || []).slice(0, 3).map((item, cIdx) => {
          const listing = item.listing || {};
          const displayRent = listing.rent_monthly_minor
            ? Math.round(listing.rent_monthly_minor / 100)
            : null;
          return (
            <div
              key={item.id || cIdx}
              className="chat-property-card"
              onClick={() => navigate(`/l/${item.id}?s=${sessionId}`)}
            >
              <div className="chat-property-card__image-container">
                <img
                  src={listing.cover_photo || "https://picsum.photos/seed/fxr-t001/800/600"}
                  className="chat-property-card__image"
                  alt={listing.title}
                />
                {item.type && (
                  <div className="chat-property-card__badge">
                    {OPTION_LABELS[cIdx] || cIdx + 1}
                  </div>
                )}
              </div>
              <div className="chat-property-card__content">
                <h5 className="chat-property-card__title">
                  {listing.title || "STUDIO"}
                </h5>
                {item.justification && (
                  <p className="chat-property-card__justification">
                    {item.justification}
                  </p>
                )}
                <div className="chat-property-card__price-row">
                  <span className="chat-property-card__price-label">
                    {isEs ? "Mensual" : "Rent"}
                  </span>
                  <span className="chat-property-card__price-value">
                    {displayRent
                      ? `${listing.currency || "EUR"} ${displayRent}`
                      : "—"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-action-chips">
        <button
          className="chat-action-chip"
          onClick={() => onSubmitAnswer(isEs ? "Cambiar fechas" : "Change dates")}
        >
          {isEs ? "Cambiar fechas" : "Change dates"}
        </button>
        <button
          className="chat-action-chip"
          onClick={() => onSubmitAnswer(isEs ? "Cambiar zona" : "Change area")}
        >
          {isEs ? "Cambiar zona" : "Change area"}
        </button>
      </div>
    </div>
  );
}
