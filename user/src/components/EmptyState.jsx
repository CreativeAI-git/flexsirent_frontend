const EmptyState = ({
  badge = "No matches",
  title = "Sorry, no relevant properties are available for this request.",
  description = "Try refining the budget, location, or home type to see better matches.",
}) => {
  return (
    <section className="ai-feedback-card" aria-live="polite">
      <p className="ai-feedback-card__badge">{badge}</p>
      <h2 className="ai-feedback-card__title">{title}</h2>
      <p className="ai-feedback-card__text">{description}</p>
    </section>
  );
};

export default EmptyState;
