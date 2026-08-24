import ErrorMessage from "./ErrorMessage";
import PlaceSearchInput from "./PlaceSearchInput";

export const listingForYouInitialValues = {
  website_address: "",
  address: "",
  latitude: "",
  longitude: "",
  post_code: "",
  floor: "",
};

const ListingForYouFields = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  labelClassName = "mb-2 ct_fw_600",
  inputClassName = "form-control ct_input ct_input_h_50",
  locationInputClassName = "form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10",
  locationFieldLabel = "Location",
  showRequiredMarks = false,
}) => {
  const requiredMark = showRequiredMarks ? (
    <span className="text-danger">*</span>
  ) : null;

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="form-group mb-4">
          <label className={labelClassName}>
            Website Address
            {requiredMark}
          </label>
          <input
            type="text"
            className={inputClassName}
            placeholder="Website Address"
            name="website_address"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.website_address}
          />
          <ErrorMessage
            errors={errors}
            touched={touched}
            fieldName="website_address"
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group mb-4">
          <label className={labelClassName}>
            Post Code
            {requiredMark}
          </label>
          <input
            type="text"
            className={inputClassName}
            placeholder="Post Code"
            name="post_code"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.post_code}
          />
          <ErrorMessage
            errors={errors}
            touched={touched}
            fieldName="post_code"
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group mb-4">
          <label className={labelClassName}>
            Apt,Suite, Bulding,Floor,etc
            {requiredMark}
          </label>
          <input
            type="text"
            className={inputClassName}
            placeholder="Apt,Suite, Bulding,Floor,etc"
            name="floor"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.floor}
          />
          <ErrorMessage errors={errors} touched={touched} fieldName="floor" />
        </div>
      </div>
      <div className="col-md-12">
        <div className="form-group mb-4">
          <label className={labelClassName}>
            Location
            {requiredMark}
          </label>
          <PlaceSearchInput
            value={values.address}
            style={{ width: "100%" }}
            onChange={(val) => {
              setFieldValue("address", val);
              setFieldValue("latitude", "");
              setFieldValue("longitude", "");
            }}
            onSelect={({ address, lat, lng }) => {
              setFieldValue("address", address);
              setFieldValue("latitude", lat);
              setFieldValue("longitude", lng);
            }}
            inputclassName={locationInputClassName}
            placeholder={"Location"}
          />
          <ErrorMessage
            errors={errors}
            touched={touched}
            fieldName="address"
          />
        </div>
      </div>
    </div>
  );
};

export default ListingForYouFields;
