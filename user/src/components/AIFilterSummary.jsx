const FILTER_LABELS = [
  { key: "location", label: "Location" },
  { key: "budget", label: "Budget" },
  { key: "dates", label: "Dates" },
  { key: "propertyType", label: "Property Type" },
  { key: "bhk", label: "BHK" },
];

const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(", ");
  }

  if (value === null || value === undefined || value === "") {
    return null;
  }

  return String(value);
};

const AIFilterSummary = ({
  filters = {},
  query = "",
  total = 0,
  message = "",
  loading = false,
}) => {
  const visibleFilters = FILTER_LABELS.filter(
    ({ key }) => formatValue(filters[key]) !== null,
  );

  return (
    <section className="ai-summary-card" aria-live="polite">
      <div className="ai-summary-card__header">
        <div>
          <p className="ai-summary-card__badge">
            {loading ? "Processing request" : "AI search breakdown"}
          </p>
          <h2 className="ai-summary-card__title">
            {loading
              ? "Understanding your property request"
              : "Your request was translated into search filters"}
          </h2>
          <p className="ai-summary-card__text">
            {loading
              ? "FlexiRent AI Agent is extracting the most useful search signals before ranking properties."
              : message || "Here are the filters used to shortlist matching properties."}
          </p>
        </div>

        {!loading && (
          <div className="ai-summary-card__count">
            <strong>{total}</strong>
            <span>{total === 1 ? "match" : "matches"}</span>
          </div>
        )}
      </div>

      {query ? (
        <div className="ai-query-pill">
          <span>Your prompt</span>
          <strong>{query}</strong>
        </div>
      ) : null}

      <div className="ai-filter-grid">
        {FILTER_LABELS.map(({ key, label }) => {
          const value = formatValue(filters[key]);

          return (
            <article
              key={key}
              className={`ai-filter-card ${
                loading ? "ai-filter-card--loading" : ""
              }`}
            >
              <p className="ai-filter-card__label">{label}</p>
              <p className="ai-filter-card__value">
                {loading ? "Extracting..." : value || "Not specified"}
              </p>
            </article>
          );
        })}
      </div>

      {!loading && !visibleFilters.length ? (
        <p className="ai-summary-card__footnote">
          The backend did not return extracted filters for this response, so
          only the matched properties are shown.
        </p>
      ) : null}
    </section>
  );
};

export default AIFilterSummary;
