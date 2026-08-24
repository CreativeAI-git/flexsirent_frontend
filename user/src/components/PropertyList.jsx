import PropertyCard from "./PropertyCard";

const PropertyList = ({
  properties = [],
  heading = "Top Matches",
  description = "Best results for your request",
}) => {
  const visibleProperties = properties.slice(0, 6);

  return (
    <section className="ai-results-section" aria-label="Property results">
      <div className="ai-results-section__header">
        <p className="ai-results-section__label">Shortlisted properties</p>
        <h2 className="ai-results-section__title">{heading}</h2>
        <p className="ai-results-section__description">{description}</p>
      </div>

      <div className="ai-results-grid">
        {visibleProperties.map((property, index) => (
          <PropertyCard
            key={
              property?.property_id || property?.id || property?._id || index
            }
            property={property}
          />
        ))}
      </div>
    </section>
  );
};

export default PropertyList;
