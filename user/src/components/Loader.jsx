const Loader = () => {
  return (
    <section className="ai-feedback-card" aria-live="polite" aria-busy="true">
      <div className="ai-loader">
        <span className="ai-loader__spinner" />
        <div>
          <h2 className="ai-feedback-card__title">Finding the best matches</h2>
          <p className="ai-feedback-card__text">
            FlexiRent AI Agent is ranking available properties for your request.
          </p>
        </div>
      </div>

      <div className="ai-skeleton-grid">
        {[0, 1, 2].map((item) => (
          <div key={item} className="ai-skeleton-card">
            <div className="ai-skeleton ai-skeleton--title" />
            <div className="ai-skeleton ai-skeleton--line" />
            <div className="ai-skeleton ai-skeleton--line" />
            <div className="ai-skeleton ai-skeleton--line-short" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Loader;
