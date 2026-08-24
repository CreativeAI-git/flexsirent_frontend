import { Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { City, Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import moment from "moment";
import PhoneInput from "react-phone-number-input";
import ErrorMessage from "../form/ErrorMessage";
import SelectDropdown from "../form/SelectDropdown";
import { hostStripeSetupSchema } from "../../utils/schema";
import { fetchHostProfile, createHostStripeSetup } from "../../../redux/features/host/actions/authAction";
import { getProfile } from "../../utils/pip";

export const BUSINESS_CATEGORIES = [
  { label: "Hotels / Rentals / Airbnb", value: "7011" },
  { label: "Real Estate / Property Management", value: "6513" },
  { label: "General Services", value: "7399" },
  { label: "E-commerce / Online Store", value: "5399" },
  { label: "Food & Restaurants", value: "5812" },
  { label: "Travel Agencies / Tours", value: "4722" },
  { label: "Transport / Taxi Services", value: "4121" },
  { label: "Education / Coaching", value: "8299" },
  { label: "Healthcare / Medical Services", value: "8099" },
  { label: "IT / Software Services", value: "7372" },
];

const HostStripeSetupModal = ({
  isOpen,
  closeModal,
  loginResponseData,
  redirectPath,
}) => {
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const { isLoading } = useSelector((state) => state.host.auth);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [documentPreview, setDocumentPreview] = useState("");
  const profilePanel =
    loginResponseData?.user_type == 1 ? "host" : "hostBusiness";
  const profileData = getProfile(profilePanel) || {};

  useEffect(() => {
    if (isOpen) {
      setCountries(Country.getAllCountries());
      setStates(State.getStatesOfCountry("ES"));
      setCities([]);
      dispatch(fetchHostProfile());
    }
  }, [dispatch, isOpen]);

  const countryOptions = useMemo(
    () =>
      countries.map((country) => ({
        label: country.name,
        value: country.isoCode,
      })),
    [countries],
  );

  const stateOptions = useMemo(
    () =>
      states.map((state) => ({
        label: state.name,
        value: state.isoCode,
      })),
    [states],
  );

  const cityOptions = useMemo(
    () =>
      cities.map((city) => ({
        label: city.name,
        value: city.name,
      })),
    [cities],
  );

  const initialValues = {
    first_name: loginResponseData?.first_name || profileData?.first_name || "",
    last_name: loginResponseData?.last_name || profileData?.last_name || "",
    email: loginResponseData?.email || profileData?.email || "",
    phone_number: loginResponseData?.phone || profileData?.phone || "",
    dob: "",
    address: profileData?.address || "",
    city: "",
    state: "",
    postal_code: "",
    country: "ES",
    bank_account_number: "",
    bank_routing_number: "",
    business_profile: "7011",
    business_url: "",
    stripe_terms_accepted: true,
    documents: null,
  };

  useEffect(() => {
    return () => {
      if (documentPreview) {
        URL.revokeObjectURL(documentPreview);
      }
    };
  }, [documentPreview]);

  const handleSubmitStripeSetup = (values) => {
    const payload = {
      ...values,
      dob: values?.dob ? moment(values.dob).format("DD-MM-YYYY") : "",
    };
    const formdata = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (key === "documents") {
        return;
      }
      formdata.append(
        key,
        typeof value === "string" ? value.trim() : value ?? "",
      );
    });
    formdata.append("documents", values.documents);

    const callback = (response) => {
      if (response?.success) {
        dispatch(fetchHostProfile());
        closeModal(false);
        navigate(redirectPath);
      }
    };

    dispatch(
      createHostStripeSetup({
        payload: formdata,
        callback,
      }),
    );
  };

  return (
    <div
      className={`modal fade modal-xl ct_custom_modal_main ct_login_modal ${isOpen ? "show" : ""}`}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header border-0 py-0"></div>
          <div className="modal-body p-0">
            <div className="ct_login_main">
              <div className="ct_login_left_cnt">
                <div className="text-center">
                  <img src="/assets/img/logo.svg" alt="Flexsirent" style={{ width: "160px", marginBottom: "30px" }} />
                  <p className="ct_fs_16 ct_fw_500" style={{ color: "#071537", lineHeight: "1.6" }}>
                    Complete your Bank Account setup to continue.
                  </p>
                  <span className="ct_fs_24 ct_fw_700 ct_orange_text">Host Setup</span>
                </div>
              </div>
              <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={hostStripeSetupSchema}
                onSubmit={(values) => {
                  handleSubmitStripeSetup(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  setFieldTouched,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <h2 className="ct_fs_20 ct_fw_600 mb-4">
                      Bank Account Setup
                    </h2>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_400">First Name</label>
                          <input
                            type="text"
                            className="form-control ct_input "
                            id="first_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.first_name}
                            placeholder="First Name"
                          />
                          <ErrorMessage errors={errors} touched={touched} fieldName="first_name" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_400">Last Name</label>
                          <input
                            type="text"
                            className="form-control ct_input "
                            id="last_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.last_name}
                            placeholder="Last Name"
                          />
                          <ErrorMessage errors={errors} touched={touched} fieldName="last_name" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_400">Email</label>
                          <input
                            type="email"
                            className="form-control ct_input "
                            id="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Email"
                          />
                          <ErrorMessage errors={errors} touched={touched} fieldName="email" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4 ct_phon_input_35">
                          <label className="mb-2 ct_fw_400">Phone Number</label>
                          <PhoneInput
                            international
                            defaultCountry="ES"
                            className="ct_phone_input"
                            placeholder="Phone Number"
                            value={values.phone_number ? String(values.phone_number) : ""}
                            onChange={(val) => {
                              setFieldTouched("phone_number", true);
                              setFieldValue("phone_number", val || "", true);
                            }}
                          />
                          <ErrorMessage errors={errors} touched={touched} fieldName="phone_number" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_400">Date of Birth</label>
                          <input
                            type="date"
                            className="form-control ct_input"
                            id="dob"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.dob}
                          />
                          <ErrorMessage errors={errors} touched={touched} fieldName="dob" />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_400">Address</label>
                          <input
                            type="text"
                            className="form-control ct_input"
                            id="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            placeholder="Address"
                          />
                          <ErrorMessage errors={errors} touched={touched} fieldName="address" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_400">Country</label>
                          <SelectDropdown
                            id="country"
                            name="country"
                            placeholder="Select Country"
                            options={countryOptions}
                            selectedValue={values.country}
                            onChange={(value) => {
                              const nextStates = value
                                ? State.getStatesOfCountry(value)
                                : [];
                              setFieldTouched("country", true);
                              setFieldValue("country", value, true);
                              setFieldValue("state", "", false);
                              setFieldValue("city", "", false);
                              setStates(nextStates);
                              setCities([]);
                            }}
                          />
                          <ErrorMessage errors={errors} touched={touched} fieldName="country" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_400">State</label>
                          <SelectDropdown
                            id="state"
                            name="state"
                            placeholder="Select State"
                            options={stateOptions}
                            selectedValue={values.state}
                            onChange={(value) => {
                              const nextCities =
                                values.country && value
                                  ? City.getCitiesOfState(values.country, value)
                                  : [];
                              setFieldTouched("state", true);
                              setFieldValue("state", value, true);
                              setFieldValue("city", "", false);
                              setCities(nextCities);
                            }}
                          />
                          <ErrorMessage errors={errors} touched={touched} fieldName="state" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_400">City</label>
                          <SelectDropdown
                            id="city"
                            name="city"
                            placeholder="Select City"
                            options={cityOptions}
                            selectedValue={values.city}
                            onChange={(value) => {
                              setFieldTouched("city", true);
                              setFieldValue("city", value, true);
                            }}
                          />
                          <ErrorMessage errors={errors} touched={touched} fieldName="city" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_400">Postal Code</label>
                          <input
                            type="text"
                            className="form-control ct_input"
                            id="postal_code"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.postal_code}
                            placeholder="Postal Code"
                          />
                          <ErrorMessage errors={errors} touched={touched} fieldName="postal_code" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_400">Business Profile</label>
                          <SelectDropdown
                            id="business_profile"
                            name="business_profile"
                            options={BUSINESS_CATEGORIES}
                            selectedValue={values.business_profile}
                            onChange={(value) => {
                              setFieldTouched("business_profile", true);
                              setFieldValue("business_profile", value, true);
                            }}
                          />
                          <ErrorMessage errors={errors} touched={touched} fieldName="business_profile" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_400">Bank Account Number</label>
                          <input
                            type="text"
                            className="form-control ct_input"
                            id="bank_account_number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.bank_account_number}
                            placeholder="Bank Account Number"
                          />
                          <ErrorMessage errors={errors} touched={touched} fieldName="bank_account_number" />
                        </div>
                      </div>
                      {values.country === "US" ? (
                        <div className="col-md-12">
                          <div className="form-group mb-4">
                            <label className="mb-2 ct_fw_400">
                              Bank Routing Number
                            </label>
                            <input
                              type="text"
                              className="form-control ct_input"
                              id="bank_routing_number"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.bank_routing_number}
                              placeholder="Bank Routing Number"
                            />
                            <ErrorMessage
                              errors={errors}
                              touched={touched}
                              fieldName="bank_routing_number"
                            />
                          </div>
                        </div>
                      ) : null}

                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label className="mb-2 ct_fw_400">Business URL</label>
                          <input
                            type="text"
                            className="form-control ct_input"
                            id="business_url"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.business_url}
                            placeholder="https://example.com"
                          />
                          <ErrorMessage errors={errors} touched={touched} fieldName="business_url" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <label className="mb-2 ct_fw_400">Document</label>
                          <input
                            type="file"
                            className="form-control ct_input"
                            accept="image/*,.pdf"
                            onChange={(event) => {
                              const file =
                                event.currentTarget.files?.[0] || null;
                              if (documentPreview) {
                                URL.revokeObjectURL(documentPreview);
                              }
                              setFieldTouched("documents", true);
                              setFieldValue("documents", file, true);
                              setDocumentPreview(
                                file ? URL.createObjectURL(file) : "",
                              );
                            }}
                          />
                          <ErrorMessage errors={errors} touched={touched} fieldName="documents" />
                          {values.documents ? (
                            <div className="mt-3">
                              <p className="mb-2 ct_fw_500">Document Preview</p>
                              {values.documents.type?.includes("pdf") ? (
                                <div className="ct_light_blue_outline p-3">
                                  <p className="mb-2">{values.documents.name}</p>
                                  <a
                                    href={documentPreview}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="ct_orange_text ct_fw_600"
                                  >
                                    Open PDF Preview
                                  </a>
                                </div>
                              ) : (
                                <img
                                  src={documentPreview}
                                  alt="Document Preview"
                                  style={{
                                    maxWidth: "180px",
                                    maxHeight: "180px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                />
                              )}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      {/* <div className="col-md-12">
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="stripe_terms_accepted"
                            checked={values.stripe_terms_accepted}
                            onChange={(event) => {
                              setFieldTouched("stripe_terms_accepted", true);
                              setFieldValue("stripe_terms_accepted", event.target.checked, true);
                            }}
                          />
                          <label className="form-check-label" htmlFor="stripe_terms_accepted">
                            I accept Bank Account terms and conditions
                          </label>
                        </div>
                          <ErrorMessage errors={errors} touched={touched} fieldName="stripe_terms_accepted" />
                      </div> */}
                    </div>
                    <div className="mt-4">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (isLoading) {
                            return;
                          }
                          handleSubmit();
                        }}
                        className={`ct_orange_btn w-100 ${isLoading ? "disabled" : ""}`}
                        aria-disabled={isLoading}
                        style={{
                          pointerEvents: isLoading ? "none" : "auto",
                          opacity: isLoading ? 0.7 : 1,
                        }}
                      >
                        {isLoading ? "Submitting..." : "Complete Setup"}
                      </a>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostStripeSetupModal;
