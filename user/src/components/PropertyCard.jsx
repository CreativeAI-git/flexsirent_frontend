import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { webPath } from "../user/routes";

const formatCurrency = (value) => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "#N/A";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatAvailableFrom = (value) => {
  if (!value) {
    return "Flexible";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getPropertyId = (property) =>
  property?.property_id || property?.id || property?._id;

const getPropertyTitle = (property) =>
  property?.property_title || property?.title || "Untitled property";

const getPropertyPrice = (property) =>
  property?.monthly_rent || property?.price || property?.rent;

const getPropertyLocation = (property) =>
  property?.address || property?.location || property?.city || "#N/A";

const getPropertyBhk = (property) =>
  property?.bhk || property?.bedrooms || property?.beds || "#N/A";

const getAvailableFrom = (property) =>
  property?.available_from || property?.availableFrom || property?.move_in;

const getPropertyImage = (property) =>
  property?.propertyImage?.[0]?.image ||
  property?.image ||
  property?.thumbnail ||
  "";

const getPropertyBadge = (property) =>
  property?.match_label ||
  property?.matchLabel ||
  property?.score_label ||
  "Top match";

const getMatchReason = (property) =>
  property?.match_reason ||
  property?.matchReason ||
  property?.reason ||
  property?.description ||
  "";

const PropertyCard = ({ property }) => {
  const navigate = useLocalizedNavigate();
  const propertyId = getPropertyId(property);
  const propertyImage = getPropertyImage(property);

  const handleViewDetails = () => {
    if (!propertyId) {
      return;
    }

    const propertyPayload = {
      ...property,
      property_id: propertyId,
    };

    sessionStorage.setItem("propertyDetails", JSON.stringify(propertyPayload));
    navigate(webPath.PropertyDetailsById.replace(":propertyId", propertyId), {
      state: { data: propertyPayload },
    });
  };

  return (
    <article className="ai-property-card">
      <div className="ai-property-card__media">
        {propertyImage ? (
          <img
            src={propertyImage}
            alt={getPropertyTitle(property)}
            className="ai-property-card__image"
          />
        ) : (
          <div className="ai-property-card__image ai-property-card__image--placeholder">
            FlexiRent
          </div>
        )}
      </div>

      <div className="ai-property-card__content">
        <div>
          <p className="ai-property-card__eyebrow">{getPropertyBadge(property)}</p>
          <h3 className="ai-property-card__title">{getPropertyTitle(property)}</h3>
          {getMatchReason(property) ? (
            <p className="ai-property-card__summary">{getMatchReason(property)}</p>
          ) : null}
        </div>

        <dl className="ai-property-card__meta">
          <div>
            <dt>Price</dt>
            <dd>{formatCurrency(getPropertyPrice(property))}/month</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{getPropertyLocation(property)}</dd>
          </div>
          <div>
            <dt>BHK</dt>
            <dd>{getPropertyBhk(property)}</dd>
          </div>
          <div>
            <dt>Available From</dt>
            <dd>{formatAvailableFrom(getAvailableFrom(property))}</dd>
          </div>
        </dl>
      </div>

      <button
        type="button"
        className="ai-property-card__button"
        onClick={handleViewDetails}
        disabled={!propertyId}
      >
        View details
      </button>
    </article>
  );
};

export default PropertyCard;
