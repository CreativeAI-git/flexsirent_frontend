import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import ErrorMessage from "../../form/ErrorMessage";
import MediaUploader from "../../form/MediaUploader";
import { useDispatch, useSelector } from "react-redux";
import { curSym, getProfile } from "../../../utils/pip";
import { validationSchema } from "../../../utils/schema";
import RenderCheckboxList from "../../form/RenderCheckboxList";
import IncrementInput from "../../form/NumberInputWithStepper";
import { Country, State, City } from "country-state-city";
import {
  createNewProperty,
  fetchAmenties,
  fetchHouseRules,
  fetchIdeals,
  fetchPropertyTypes,
  fetchSaftyAmenties,
} from "../../../../redux/features/host/actions/bookingAction";
import toast from "react-hot-toast";
import moment from "moment";
import ImageUpload from "../../ImageUploader";
import Loader from "../../loader";
import PlaceSearchInput from "../../form/PlaceSearchInput";
import PhoneInput from "react-phone-number-input";

const AddListingData = ({ redirectURL, role = "" }) => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const profileData = getProfile(role) || {};
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const {
    amenityOptions,
    houseRuleOptions,
    safetyAmenitiesOptions,
    idealForOptions,
    propertyTypesOptions,
    isLoading,
  } = useSelector((state) => state.host.booking);

  const initialValues = {

    safety_amenities: "",

    check_in: "",
    check_out: "",
    property_title: "",
    category_id: "",
    owner_type: "",
    address: "",
    latitude: "",
    longitude: "",
    property_description: "",
    security_deposit: "",
    min_stay_duration: "",
    max_person: "",
    monthly_rent: "",
    cleaning_fee: "",
    cleaning_fee_type: "0",
    monthly_rent_type: "0",
    bedrooms: 0,
    bathrooms: 0,
    beds: 0,
    square_foot: 0,
    videoFile: null,
    house_rules: [],
    amenities: [],
    ideal_for: [],
    available_from: null,
    country: "",
    state: "",
    location: "",
  };

  useEffect(() => {
    dispatch(fetchIdeals());
    dispatch(fetchAmenties());
    dispatch(fetchHouseRules());
    dispatch(fetchSaftyAmenties());
    dispatch(fetchPropertyTypes());
    setCountries(Country.getAllCountries());
  }, []);

  const handleMediaChange = (files) => {
    setSelectedFiles(files); // files are the original File objects
  };

  const handleAddListing = (values) => {
    if (selectedFiles?.length <= 0) {
      return toast.error("Please upload a property images");
    }
    const data = {
      ...values,
      check_in: moment(values?.check_in, "HH:mm").format("HH:mm:ss"),
      check_out: moment(values?.check_out, "HH:mm").format("HH:mm:ss"),
    };
    const formdata = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formdata.append(
        key,
        typeof value === "string" ? value.trim() : value ?? ""
      );
    });
    for (let i = 0; i < selectedFiles.length; i++) {
      formdata.append("file", selectedFiles[i]);
    }

    addProperty(formdata);

  };

  const addProperty = (data) => {
    const callback = (response) => {
      if (response.success) {
        navigate(redirectURL);
      }
    };
    dispatch(
      createNewProperty({
        payload: data,
        callback,
      })
    );
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="ct_px_30 mt-4 pb-4">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                handleAddListing(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
                setTouched,
                setFieldTouched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="ct_light_blue_outline py-4">
                    <h4 className="ct_fs_20 ct_fw_600 mb-4">
                      Tell Us About Yourself
                    </h4>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label for="" className="mb-2 ct_fw_500">
                            First Name
                          </label>
                          <input
                            type="text"
                            className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                            placeholder="First Name"
                            value={profileData?.first_name || "#N/A"}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label for="" className="mb-2 ct_fw_500">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                            placeholder="Last Name"
                            value={profileData?.last_name || "#N/A"}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label for="" className="mb-2 ct_fw_500">
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                            placeholder="Email "
                            value={profileData?.email || "#N/A"}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label for="" className="mb-2 ct_fw_500">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                            placeholder="Phone Number"
                            value={profileData?.phone || "#N/A"}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label for="" className="mb-2 ct_fw_500">
                            Property Type
                          </label>
                          <select
                            id="category_id"
                            name="category_id"
                            value={values.category_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                          >
                            <option value="">Select property type</option>
                            {propertyTypesOptions?.map((item, index) => (
                              <option key={index} value={item?.category_id}>
                                {item?.category_name}
                              </option>
                            ))}
                          </select>
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName="category_id"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group ">
                          <label for="" className="mb-2 ct_fw_500">
                            Are you a
                          </label>
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="owner_type"
                                id="individualOwner"
                                value="1"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.owner_type === "1"}
                              />
                            </div>
                            <label for="">Individual Owner</label>
                          </div>
                          <div className="d-flex align-items-center gap-1 mt-2">
                            <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="owner_type"
                                id="propertyManager"
                                value="2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.owner_type === "2"}
                              />
                            </div>
                            <label for="">Property Manager</label>
                          </div>
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName="owner_type"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ct_light_blue_outline py-4 ct_mt_40">
                    <h4 className="ct_fs_20 ct_fw_600 mb-4">Property Details</h4>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label for="" className="mb-2 ct_fw_500">
                            Property Name
                          </label>
                          <input
                            type="text"
                            className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                            placeholder="Property Name"
                            name="property_title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.property_title}
                          />
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName={"property_title"}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label for="" className="mb-2 ct_fw_500">
                            Property Description
                          </label>
                          <textarea
                            className="form-control ct_input h-auto ct_light_blue_input_border ct_border_radius_10"
                            rows="4"
                            placeholder="Property Description"
                            name="property_description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.property_description}
                          ></textarea>
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName={"property_description"}
                          />
                        </div>
                      </div>
                      {/* Country Dropdown */}
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_500">Country</label>
                          <select
                            name="country"
                            className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                            value={values.country}
                            onChange={(e) => {
                              const countryName = e.target.value;
                              handleChange(e);

                              const selectedCountry = countries.find(
                                (c) => c.name === countryName
                              );

                              // Reset state & city when country changes
                              setFieldValue("state", "");
                              setFieldValue("location", "");

                              if (selectedCountry) {
                                const statesData = State.getStatesOfCountry(
                                  selectedCountry.isoCode
                                );
                                setStates(statesData);
                                setCities([]);
                              } else {
                                setStates([]);
                                setCities([]);
                              }
                            }}
                            onBlur={handleBlur}
                          >
                            <option value="">-- Select Country --</option>
                            {countries.map((country) => (
                              <option
                                key={country.isoCode}
                                value={country.name}
                              >
                                {country.name}
                              </option>
                            ))}
                          </select>
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName={"country"}
                          />
                        </div>
                      </div>

                      {/* State Dropdown */}
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_500">State</label>
                          <select
                            name="state"
                            className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                            value={values.state}
                            onChange={(e) => {
                              const stateName = e.target.value;
                              handleChange(e);

                              const selectedCountry = countries.find(
                                (c) => c.name === values.country
                              );
                              const selectedState = states.find(
                                (s) => s.name === stateName
                              );

                              // Reset city when state changes
                              setFieldValue("location", "");

                              if (selectedCountry && selectedState) {
                                const citiesData = City.getCitiesOfState(
                                  selectedCountry.isoCode,
                                  selectedState.isoCode
                                );
                                setCities(citiesData);
                              } else {
                                setCities([]);
                              }
                            }}
                            onBlur={handleBlur}
                            disabled={!values.country}
                          >
                            <option value="">-- Select State --</option>
                            {states.map((state) => (
                              <option key={state.isoCode} value={state.name}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName={"state"}
                          />
                        </div>
                      </div>

                      {/* City Dropdown */}
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_500">City</label>
                          <select
                            name="location"
                            className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                            value={values.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={!values.state}
                          >
                            <option value="">-- Select City --</option>
                            {cities.map((city) => (
                              <option key={city.name} value={city.name}>
                                {city.name}
                              </option>
                            ))}
                          </select>
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName={"location"}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_500">Location</label>

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
                            inputclassName="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                            placeholder="Location"
                          />

                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName="address"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label for="" className="mb-2 ct_fw_500">
                            Post Code
                          </label>
                          <input
                            type="text"
                            className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                            placeholder="Post Code"
                            name="post_code"
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.post_code}
                          />
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName={"post_code"}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label for="" className="mb-2 ct_fw_500">
                            Apt,Suite, Bulding,Floor,etc
                          </label>
                          <input
                            type="text"
                            className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                            placeholder="Apt,Suite, Bulding,Floor,etc"
                            name="floor"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.floor}
                          />
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName={"floor"}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <IncrementInput
                          label="Total Bedrooms"
                          name="bedrooms"
                          value={values.bedrooms}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          touched={touched}
                        />
                      </div>

                      {/* Bathroom */}
                      <div className="col-md-6">
                        <IncrementInput
                          label="Total Bathrooms"
                          name="bathrooms"
                          value={values.bathrooms}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          touched={touched}
                        />
                      </div>

                      {/* Beds */}
                      <div className="col-md-6">
                        <IncrementInput
                          label="Total Beds Available"
                          name="beds"
                          value={values.beds}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          touched={touched}
                        />
                      </div>

                      {/* Square Footage */}
                      <div className="col-md-6">
                        <IncrementInput
                          label="Square Footage (sq ft)"
                          name="square_foot"
                          value={values.square_foot}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ct_light_blue_outline py-4 ct_mt_40">
                    <div className="col-md-12">
                      <MediaUploader
                        onChange={handleMediaChange}
                        initialFiles={selectedFiles}
                        maxFiles={5}
                        label="Property Images"
                      />
                    </div>
                  </div>
                  <div className="ct_light_blue_outline py-4 ct_mt_40">
                    <div className="col-md-12">
                      <ImageUpload
                        name="videoFile"
                        label="Property Video"
                        value={values.videoFile}
                        onChange={setFieldValue}
                        onBlur={setTouched}
                        error={errors.videoFile}
                        touched={touched.videoFile}
                        type="video"
                        placeholderLabel="Upload your video here"
                      />
                    </div>
                  </div>
                  <div className="ct_light_blue_outline py-4 ct_mt_40 pe-0">
                    <RenderCheckboxList
                      touched={touched}
                      name="amenities"
                      title="Amenities"
                      options={amenityOptions}
                      values={values}
                      setFieldValue={setFieldValue}
                      errors={errors}
                    />

                    <RenderCheckboxList
                      touched={touched}
                      name="safety_amenities"
                      title="Safety Amenities"
                      options={safetyAmenitiesOptions}
                      values={values}
                      setFieldValue={setFieldValue}
                      errors={errors}
                    />

                    <RenderCheckboxList
                      touched={touched}
                      name="ideal_for"
                      title="Who is it Ideal For?"
                      options={idealForOptions}
                      values={values}
                      setFieldValue={setFieldValue}
                      errors={errors}
                    />

                    <RenderCheckboxList
                      touched={touched}
                      name="house_rules"
                      title="House Rules"
                      options={houseRuleOptions}
                      values={values}
                      setFieldValue={setFieldValue}
                      errors={errors}
                    />

                    <div className="mt-4 ct_pe_40">
                      <div className="form-group mb-3">
                        <label for="" className=" mb-2">
                          When Can Guests Check-In?
                        </label>
                        <div className="row">
                          <div className="col-md-6">
                            <input
                              type="time"
                              className="form-control ct_input ct_input_h_50"
                              name="check_in"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.check_in}
                            />
                            <ErrorMessage
                              errors={errors}
                              touched={errors}
                              fieldName={"check_in"}
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              type="time"
                              className="form-control ct_input ct_input_h_50"
                              name="check_out"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.check_out}
                            />
                            <ErrorMessage
                              errors={errors}
                              touched={touched}
                              fieldName={"check_out"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="mt-4 ct_pe_40">
                      <div className="form-group mb-3">
                        <label for="" className=" mb-2">
                          House Rules
                        </label>
                        <textarea
                          className="form-control ct_input ct_input_h_50 h-auto"
                          rows="5"
                          placeholder="House Rules"
                          type="text"
                          id="house_rules"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values?.house_rules}
                        ></textarea>
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName="house_rules"
                        />
                      </div>
                    </div> */}
                  </div>
                  <div className="ct_light_blue_outline py-4 ct_mt_40">
                    <h4 className="ct_fs_20 ct_fw_600 mb-4">
                      Pricing & Availability
                    </h4>

                    <div className="form-group mb-4">
                      <label for="" className="mb-2 ct_fw_600">
                        Monthly Rent
                      </label>
                      <div className="position-relative">
                        <input
                          onWheel={(e) => e.target.blur()}
                          type="number"
                          className="form-control ct_input ct_input_h_50 ct_input_pe_40"
                          placeholder="Monthly Rent"
                          value={values.monthly_rent}
                          id="monthly_rent"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <span className="ct_show_eye">{curSym}</span>
                      </div>
                      <ErrorMessage
                        errors={errors}
                        touched={touched}
                        fieldName="monthly_rent"
                      />
                    </div>
                    {/* <div className="d-flex align-items-center gap-3 flex-wrap mb-2">
                      <div className="ct_radio-container">
                        <div className="ct_radio-wrapper d-flex align-items-center gap-2">
                          <label className="ct_radio-button">
                            <input
                              id="option1"
                              name="monthly_rent_type"
                              value="0"
                              checked={values.monthly_rent_type === "0"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="radio"
                            />
                            <span className="ct_radio-checkmark"></span>
                          </label>
                          <div>
                            <p className="mb-0 ct_fw_500">Fixed</p>
                          </div>
                        </div>
                      </div>
                      <div className="ct_radio-container">
                        <div className="ct_radio-wrapper d-flex align-items-center gap-2">
                          <label className="ct_radio-button">
                            <input
                              id="option1"
                              type="radio"
                              name="monthly_rent_type"
                              value="1"
                              checked={values.monthly_rent_type === "1"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <span className="ct_radio-checkmark"></span>
                          </label>
                          <div>
                            <p className="mb-0  ct_fw_500">Per Person</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ErrorMessage
                      errors={errors}
                      touched={touched}
                      fieldName="monthly_rent_type"
                    /> */}
                    <div className="form-group mb-4 my-2">
                      <label for="" className="mb-2 ct_fw_600">
                        Cleaning Fee
                      </label>
                      <div className="position-relative">
                        <input
                          onWheel={(e) => e.target.blur()}
                          type="number"
                          className="form-control ct_input ct_input_h_50 ct_input_pe_40"
                          placeholder="Cleaning Fee"
                          value={values.cleaning_fee}
                          id="cleaning_fee"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <span className="ct_show_eye">{curSym}</span>
                      </div>
                      <ErrorMessage
                        errors={errors}
                        touched={touched}
                        fieldName="cleaning_fee"
                      />
                    </div>

                    {/* <div className="d-flex align-items-center gap-3 flex-wrap mb-2">
                      <div className="ct_radio-container">
                        <div className="ct_radio-wrapper d-flex align-items-center gap-2">
                          <label className="ct_radio-button">
                            <input
                              id="option1"
                              name="cleaning_fee_type"
                              value="0"
                              checked={values.cleaning_fee_type === "0"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="radio"
                            />
                            <span className="ct_radio-checkmark"></span>
                          </label>
                          <div>
                            <p className="mb-0 ct_fw_500">Fixed</p>
                          </div>
                        </div>
                      </div>
                      <div className="ct_radio-container">
                        <div className="ct_radio-wrapper d-flex align-items-center gap-2">
                          <label className="ct_radio-button">
                            <input
                              id="option1"
                              type="radio"
                              name="cleaning_fee_type"
                              value="1"
                              checked={values.cleaning_fee_type === "1"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <span className="ct_radio-checkmark"></span>
                          </label>
                          <div>
                            <p className="mb-0  ct_fw_500">Per Person</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ErrorMessage
                      errors={errors}
                      touched={touched}
                      fieldName="cleaning_fee_type"
                    /> */}
                    <div className="form-group mb-4 my-2">
                      <label for="" className="mb-2 ct_fw_600">
                        Security Deposit
                      </label>
                      <div className="position-relative">
                        <input
                          onWheel={(e) => e.target.blur()}
                          type="number"
                          className="form-control ct_input ct_input_h_50 ct_input_pe_40"
                          placeholder="Security Deposit"
                          value={values.security_deposit}
                          id="security_deposit"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <span className="ct_show_eye">{curSym}</span>
                      </div>
                      <ErrorMessage
                        errors={errors}
                        touched={touched}
                        fieldName="security_deposit"
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label for="" className="mb-2 ct_fw_600">
                        Available From
                      </label>
                      <input
                        type="date"
                        className="form-control ct_input ct_input_h_50"
                        min={new Date().toISOString().split("T")[0]}
                        onKeyDown={(e) => e.preventDefault()}
                        value={values.available_from}
                        id="available_from"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        errors={errors}
                        touched={touched}
                        fieldName="available_from"
                      />
                    </div>

                    <div className="form-group mb-4">
                      <div className="form-group mb-4">
                        <label for="" className="mb-2 ct_fw_500">
                          Minimum Stay Duration (In Days)
                        </label>
                        <input
                          type="text"
                          className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                          placeholder="Minimum Stay Duration (In Days)"
                          name="min_stay_duration"
                          onInput={(e) => {
                            const rawValue = e.target.value;

                            // Remove non-digit characters and leading zeros
                            let cleanedValue = rawValue
                              .replace(/[^0-9]/g, "")
                              .replace(/^0+/, "");

                            // Limit to 3 digits
                            if (cleanedValue.length > 3) {
                              cleanedValue = cleanedValue.slice(0, 3);
                            }

                            e.target.value = cleanedValue;
                            handleChange(e);
                          }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.min_stay_duration}
                        />
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName={"min_stay_duration"}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="form-group mb-4">
                        <label for="" className="mb-2 ct_fw_500">
                          Maximum Visitors Allowed
                        </label>
                        <input
                          type="text"
                          className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                          placeholder="Maximum Visitors Allowed"
                          name="max_person"
                          onInput={(e) => {
                            const rawValue = e.target.value;

                            // Remove non-digit characters and leading zeros
                            let cleanedValue = rawValue
                              .replace(/[^0-9]/g, "")
                              .replace(/^0+/, "");

                            // Limit to 3 digits
                            if (cleanedValue.length > 3) {
                              cleanedValue = cleanedValue.slice(0, 3);
                            }

                            e.target.value = cleanedValue;
                            handleChange(e);
                          }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.max_person}
                        />
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName={"max_person"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3 justify-content-end mt-4">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(redirectURL);
                      }}
                      className="ct_outline_btn ct_dark_blue_outline_btn"
                    >
                      Cancel
                    </a>

                    <button
                      className="ct_dark_blue_btn"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListingData;
