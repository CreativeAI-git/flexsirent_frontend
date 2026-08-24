import { Formik, getIn, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import moment from "moment";
import toast from "react-hot-toast";
import WebHeader from "../../layout/WebHeader";
import WebFooter from "../../layout/WebFooter";
import ErrorMessage from "../../components/form/ErrorMessage";
import MediaUploader from "../../components/form/MediaUploader";
import RenderCheckboxList from "../../components/form/RenderCheckboxList";
import IncrementInput from "../../components/form/NumberInputWithStepper";
import PlaceSearchInput from "../../components/form/PlaceSearchInput";
import ImageUpload from "../../components/ImageUploader";
import Loader from "../../components/loader";
import { curSym, getActivePanel, getActiveProfile } from "../../utils/pip";
import { validationSchema } from "../../utils/schema";
import {
  createNewProperty,
  fetchAmenties,
  fetchHouseRules,
  fetchIdeals,
  fetchPropertyTypes,
  fetchSaftyAmenties,
} from "../../../redux/features/host/actions/bookingAction";
import { webPath } from "../../../user/routes";

const FORM_STORAGE_KEY = "hosting_process_form_draft";
const STEP_STORAGE_KEY = "hosting_process_current_step";
const DRAFT_DB_NAME = "flexsi_rent_hosting_process";
const DRAFT_STORE_NAME = "listingDraft";
const IMAGE_FILES_KEY = "selectedImages";
const VIDEO_FILE_KEY = "selectedVideo";

const defaultValues = {
  safety_amenities: [],
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
  available_from: "",
  country: "",
  state: "",
  location: "",
  post_code: "",
  floor: "",
};

const steps = [
  {
    id: 1,
    label: "Basic Info",
    title: "1. Tell Us About Yourself",
    description:
      "Help us get to know you by confirming your host details and ownership type.",
  },
  {
    id: 2,
    label: "Property Details",
    title: "2. Describe Your Space",
    description:
      "Add the main details about your property so renters can understand the space clearly.",
  },
  {
    id: 3,
    label: "Amenities & Photos",
    title: "3. What’s Included & Who’s It For?",
    description:
      "Upload your media, highlight amenities, and set guest expectations before publishing.",
  },
  {
    id: 4,
    label: "Pricing & Availability",
    title: "4. Set Your Price & Open Your Calendar",
    description:
      "Finish your listing with pricing, availability, and stay rules, then submit it.",
  },
];

const stepFields = {
  1: ["category_id", "owner_type"],
  2: [
    "property_title",
    "property_description",
    "country",
    "state",
    "location",
    "address",
    "latitude",
    "longitude",
    "post_code",
    "floor",
    "bedrooms",
    "bathrooms",
    "beds",
    "square_foot",
  ],
  3: [
    "amenities",
    "safety_amenities",
    "ideal_for",
    "house_rules",
    "check_in",
    "check_out",
    "videoFile",
  ],
  4: [
    "monthly_rent",
    "cleaning_fee",
    "security_deposit",
    "available_from",
    "min_stay_duration",
    "max_person",
  ],
};

const openDraftDb = () =>
  new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DRAFT_DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(DRAFT_STORE_NAME)) {
        db.createObjectStore(DRAFT_STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const readDraftFile = async (key) => {
  if (typeof window === "undefined" || !window.indexedDB) {
    return null;
  }

  const db = await openDraftDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DRAFT_STORE_NAME, "readonly");
    const store = transaction.objectStore(DRAFT_STORE_NAME);
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
};

const writeDraftFile = async (key, value) => {
  if (typeof window === "undefined" || !window.indexedDB) {
    return;
  }

  const db = await openDraftDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DRAFT_STORE_NAME, "readwrite");
    const store = transaction.objectStore(DRAFT_STORE_NAME);

    if (value === null || value === undefined || value === "") {
      store.delete(key);
    } else {
      store.put(value, key);
    }

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
};

const clearDraftFiles = async () => {
  await Promise.all([
    writeDraftFile(IMAGE_FILES_KEY, null),
    writeDraftFile(VIDEO_FILE_KEY, null),
  ]);
};

const createTouchedMap = (fields) =>
  fields.reduce((acc, field) => {
    acc[field] = true;
    return acc;
  }, {});

const DraftSync = ({ currentStep, selectedFiles, isEnabled }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const valuesToSave = { ...values, videoFile: null };
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(valuesToSave));
    localStorage.setItem(STEP_STORAGE_KEY, String(currentStep));
  }, [values, currentStep, isEnabled]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    writeDraftFile(IMAGE_FILES_KEY, selectedFiles);
  }, [selectedFiles, isEnabled]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    writeDraftFile(VIDEO_FILE_KEY, values.videoFile || null);
  }, [values.videoFile, isEnabled]);

  return null;
};

const HostingProcess = () => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const activePanel = getActivePanel() || "guest";
  const profileData = getActiveProfile(activePanel) || {};
  const [currentStep, setCurrentStep] = useState(1);
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [draftReady, setDraftReady] = useState(false);
  const [mediaError, setMediaError] = useState("");
  const [isDraftSyncEnabled, setIsDraftSyncEnabled] = useState(true);
  const {
    amenityOptions,
    houseRuleOptions,
    safetyAmenitiesOptions,
    idealForOptions,
    propertyTypesOptions,
    isLoading,
  } = useSelector((state) => state.host.booking);

  const syncRegions = (countryName, stateName) => {
    const selectedCountry = Country.getAllCountries().find(
      (country) => country.name === countryName
    );

    if (!selectedCountry) {
      setStates([]);
      setCities([]);
      return;
    }

    const stateOptions = State.getStatesOfCountry(selectedCountry.isoCode);
    setStates(stateOptions);

    if (!stateName) {
      setCities([]);
      return;
    }

    const selectedState = stateOptions.find((state) => state.name === stateName);
    if (!selectedState) {
      setCities([]);
      return;
    }

    setCities(
      City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
    );
  };

  useEffect(() => {
    dispatch(fetchIdeals());
    dispatch(fetchAmenties());
    dispatch(fetchHouseRules());
    dispatch(fetchSaftyAmenties());
    dispatch(fetchPropertyTypes());
    setCountries(Country.getAllCountries());

    const loadDraft = async () => {
      const storedValues = localStorage.getItem(FORM_STORAGE_KEY);
      const storedStep = Number(localStorage.getItem(STEP_STORAGE_KEY) || 1);
      const parsedValues = storedValues ? JSON.parse(storedValues) : {};
      const [savedImages, savedVideo] = await Promise.all([
        readDraftFile(IMAGE_FILES_KEY),
        readDraftFile(VIDEO_FILE_KEY),
      ]);

      const mergedValues = {
        ...defaultValues,
        ...parsedValues,
        safety_amenities: Array.isArray(parsedValues?.safety_amenities)
          ? parsedValues.safety_amenities
          : defaultValues.safety_amenities,
        house_rules: Array.isArray(parsedValues?.house_rules)
          ? parsedValues.house_rules
          : defaultValues.house_rules,
        amenities: Array.isArray(parsedValues?.amenities)
          ? parsedValues.amenities
          : defaultValues.amenities,
        ideal_for: Array.isArray(parsedValues?.ideal_for)
          ? parsedValues.ideal_for
          : defaultValues.ideal_for,
        videoFile: savedVideo || null,
      };

      setSelectedFiles(Array.isArray(savedImages) ? savedImages : []);
      setInitialValues(mergedValues);
      syncRegions(mergedValues.country, mergedValues.state);
      setCurrentStep(storedStep >= 1 && storedStep <= 4 ? storedStep : 1);
      setDraftReady(true);
    };

    loadDraft();
  }, [dispatch]);

  useEffect(() => {
    if (selectedFiles?.length) {
      setMediaError("");
    }
  }, [selectedFiles]);

  const handleMediaChange = (files) => {
    setSelectedFiles(files);
    if (files?.length) {
      setMediaError("");
    }
  };

  const clearDraft = async () => {
    localStorage.removeItem(FORM_STORAGE_KEY);
    localStorage.removeItem(STEP_STORAGE_KEY);
    await clearDraftFiles();
  };

  useEffect(() => {
    return () => {
      clearDraft();
    };
  }, []);

  const resetHostingProcess = (resetForm) => {
    setIsDraftSyncEnabled(false);
    resetForm({ values: defaultValues });
    setInitialValues(defaultValues);
    setSelectedFiles([]);
    setCurrentStep(1);
    setMediaError("");
    syncRegions("", "");
  };

  const submitListing = (values, { resetForm }) => {
    if (selectedFiles?.length <= 0) {
      setMediaError("Please upload a property images");
      toast.error("Please upload a property images");
      setCurrentStep(3);
      return;
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

    for (let i = 0; i < selectedFiles.length; i += 1) {
      formdata.append("file", selectedFiles[i]);
    }

    const callback = async (response) => {
      if (response?.success) {
        resetHostingProcess(resetForm);
        await clearDraft();
        navigate(webPath.BecomeHostProcess, { replace: true });
      }
    };

    dispatch(
      createNewProperty({
        payload: formdata,
        callback,
      })
    );
  };

  if (isLoading || !draftReady) {
    return <Loader />;
  }

  const activeStepConfig = steps.find((step) => step.id === currentStep);

  return (
    <>
      <WebHeader />
      <section className="py-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="ct_multistep_form_card pt-4 mt-3 mb-3 ct_host_process_bg">
                <Formik
                  initialValues={initialValues}
                  enableReinitialize
                  validationSchema={validationSchema}
                  onSubmit={submitListing}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    handleSubmit,
                    validateForm,
                    setTouched,
                  }) => {
                    const goToNextStep = async () => {
                      const currentStepErrors = await validateForm();
                      const relevantFields = stepFields[currentStep] || [];
                      const hasHiddenLocationError =
                        currentStep === 2 &&
                        (Boolean(getIn(currentStepErrors, "latitude")) ||
                          Boolean(getIn(currentStepErrors, "longitude")));
                      const hasFieldError = relevantFields.some((field) =>
                        Boolean(getIn(currentStepErrors, field))
                      );

                      if (currentStep === 3 && selectedFiles?.length <= 0) {
                        setMediaError("Please upload a property images");
                      }

                      if (hasHiddenLocationError) {
                        toast.error(
                          "Please select your property location from the suggestions."
                        );
                      }

                      if (
                        hasFieldError ||
                        hasHiddenLocationError ||
                        (currentStep === 3 && !selectedFiles?.length)
                      ) {
                        setTouched(
                          {
                            ...touched,
                            ...createTouchedMap(relevantFields),
                            ...(hasHiddenLocationError ? { address: true } : {}),
                          },
                          true
                        );
                        return;
                      }

                      setCurrentStep((prev) => Math.min(prev + 1, 4));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    };

                    const goToPreviousStep = () => {
                      if (currentStep === 1) {
                        navigate(-1);
                        return;
                      }

                      setCurrentStep((prev) => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    };

                    const handleCountryChange = (event) => {
                      const countryName = event.target.value;
                      handleChange(event);
                      setFieldValue("state", "");
                      setFieldValue("location", "");
                      syncRegions(countryName, "");
                    };

                    const handleStateChange = (event) => {
                      const stateName = event.target.value;
                      handleChange(event);
                      setFieldValue("location", "");
                      syncRegions(values.country, stateName);
                    };

                    return (
                      <form id="msform" onSubmit={handleSubmit}>
                        <DraftSync
                          currentStep={currentStep}
                          selectedFiles={selectedFiles}
                          isEnabled={isDraftSyncEnabled}
                        />
                        <ul id="ct_form_progressbar" className="ct_host_process_multi_form">
                          {steps.map((step) => (
                            <li
                              key={step.id}
                              className={`ct_flex_1 ${currentStep >= step.id ? "active" : ""}`}
                            >
                              <h5>{step.label}</h5>
                            </li>
                          ))}
                        </ul>
                        <fieldset className="ct_mt_60">
                          <div className="ct_form-card">
                            <h2 className="ct_fs_35 ct_fw_600 mb-2">
                              {activeStepConfig?.title}
                            </h2>
                            <p className="ct_text_op_8 mb-0">
                              {activeStepConfig?.description}
                            </p>

                            {currentStep === 1 && (
                              <div className="row mt-5">
                                <div className="col-md-6">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_400">
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control ct_input ct_input_h_50"
                                      value={profileData?.first_name || "#N/A"}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_400">
                                      Last Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control ct_input ct_input_h_50"
                                      value={profileData?.last_name || "#N/A"}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_400">
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control ct_input ct_input_h_50"
                                      value={profileData?.email || "#N/A"}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_400">
                                      Phone Number
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control ct_input ct_input_h_50"
                                      value={profileData?.phone || "#N/A"}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_400">
                                      Property Type
                                    </label>
                                    <select
                                      id="category_id"
                                      name="category_id"
                                      value={values.category_id}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className="form-control ct_input ct_input_h_50"
                                    >
                                      <option value="">Select property type</option>
                                      {propertyTypesOptions?.map((item, index) => (
                                        <option
                                          key={index}
                                          value={item?.category_id}
                                        >
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
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_400">
                                      Are You a
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
                                      <label htmlFor="individualOwner">
                                        Individual Owner
                                      </label>
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
                                      <label htmlFor="propertyManager">
                                        Property Manager
                                      </label>
                                    </div>
                                    <ErrorMessage
                                      errors={errors}
                                      touched={touched}
                                      fieldName="owner_type"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            {currentStep === 2 && (
                              <div className="row mt-5">
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_400">
                                      Property Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control ct_input ct_input_h_50"
                                      placeholder="Property Name"
                                      name="property_title"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.property_title}
                                    />
                                    <ErrorMessage
                                      errors={errors}
                                      touched={touched}
                                      fieldName="property_title"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_400">
                                      Property Description
                                    </label>
                                    <textarea
                                      className="form-control ct_input h-auto"
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
                                      fieldName="property_description"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_400">
                                      Country
                                    </label>
                                    <select
                                      name="country"
                                      className="form-control ct_input ct_input_h_50"
                                      value={values.country}
                                      onChange={handleCountryChange}
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
                                      fieldName="country"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_400">
                                      State
                                    </label>
                                    <select
                                      name="state"
                                      className="form-control ct_input ct_input_h_50"
                                      value={values.state}
                                      onChange={handleStateChange}
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
                                      fieldName="state"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_400">
                                      City
                                    </label>
                                    <select
                                      name="location"
                                      className="form-control ct_input ct_input_h_50"
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
                                      fieldName="location"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_400">
                                      Location
                                    </label>
                                    <PlaceSearchInput
                                      value={values.address}
                                      style={{ width: "100%" }}
                                      onChange={(value) => {
                                        setFieldValue("address", value);
                                        setFieldValue("latitude", "");
                                        setFieldValue("longitude", "");
                                      }}
                                      onSelect={({ address, lat, lng }) => {
                                        setFieldValue("address", address);
                                        setFieldValue("latitude", lat);
                                        setFieldValue("longitude", lng);
                                      }}
                                      inputclassName="form-control ct_input ct_input_h_50"
                                      placeholder="Location"
                                    />
                                    <ErrorMessage
                                      errors={errors}
                                      touched={touched}
                                      fieldName="address"
                                    />
                                    {touched.address &&
                                      !errors.address &&
                                      (errors.latitude || errors.longitude) ? (
                                      <span style={{ color: "red" }}>
                                        Please select a valid location from the
                                        suggestions.
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_400">
                                      Post Code
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control ct_input ct_input_h_50"
                                      placeholder="Post Code"
                                      name="post_code"
                                      onInput={(event) => {
                                        event.target.value = event.target.value.replace(
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
                                      fieldName="post_code"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_400">
                                      Apt, Suite, Building, Floor, etc
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control ct_input ct_input_h_50"
                                      placeholder="Apt, Suite, Building, Floor, etc"
                                      name="floor"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.floor}
                                    />
                                    <ErrorMessage
                                      errors={errors}
                                      touched={touched}
                                      fieldName="floor"
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
                            )}

                            {currentStep === 3 && (
                              <div className="row mt-5">
                                <div className="col-md-12">
                                  <MediaUploader
                                    onChange={handleMediaChange}
                                    initialFiles={selectedFiles}
                                    maxFiles={5}
                                    label="Property Images"
                                  />
                                  {mediaError ? (
                                    <span style={{ color: "red" }}>
                                      {mediaError}
                                    </span>
                                  ) : null}
                                </div>
                                <div className="col-md-12 mb-4">
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
                                <div className="col-md-12">
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
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_500">
                                      Check In
                                    </label>
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
                                      touched={touched}
                                      fieldName="check_in"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_500">
                                      Check Out
                                    </label>
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
                                      fieldName="check_out"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            {currentStep === 4 && (
                              <div className="row mt-5">
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_500">
                                      Monthly Rent
                                    </label>
                                    <div className="position-relative">
                                      <input
                                        onWheel={(event) => event.target.blur()}
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
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_500">
                                      Cleaning Fee
                                    </label>
                                    <div className="position-relative">
                                      <input
                                        onWheel={(event) => event.target.blur()}
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
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_500">
                                      Security Deposit
                                    </label>
                                    <div className="position-relative">
                                      <input
                                        onWheel={(event) => event.target.blur()}
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
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_500">
                                      Available From
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control ct_input ct_input_h_50"
                                      min={new Date().toISOString().split("T")[0]}
                                      onKeyDown={(event) => event.preventDefault()}
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
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_500">
                                      Minimum Stay Duration (In Days)
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control ct_input ct_input_h_50"
                                      placeholder="Minimum Stay Duration (In Days)"
                                      name="min_stay_duration"
                                      onInput={(event) => {
                                        let cleanedValue = event.target.value
                                          .replace(/[^0-9]/g, "")
                                          .replace(/^0+/, "");

                                        if (cleanedValue.length > 3) {
                                          cleanedValue = cleanedValue.slice(0, 3);
                                        }

                                        event.target.value = cleanedValue;
                                        handleChange(event);
                                      }}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.min_stay_duration}
                                    />
                                    <ErrorMessage
                                      errors={errors}
                                      touched={touched}
                                      fieldName="min_stay_duration"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group mb-4">
                                    <label className="mb-2 ct_fw_500">
                                      Maximum Visitors Allowed
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control ct_input ct_input_h_50"
                                      placeholder="Maximum Visitors Allowed"
                                      name="max_person"
                                      onInput={(event) => {
                                        let cleanedValue = event.target.value
                                          .replace(/[^0-9]/g, "")
                                          .replace(/^0+/, "");

                                        if (cleanedValue.length > 3) {
                                          cleanedValue = cleanedValue.slice(0, 3);
                                        }

                                        event.target.value = cleanedValue;
                                        handleChange(event);
                                      }}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.max_person}
                                    />
                                    <ErrorMessage
                                      errors={errors}
                                      touched={touched}
                                      fieldName="max_person"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <button
                            type={currentStep === 4 ? "submit" : "button"}
                            className="ct_orange_btn ct_form_next float-end"
                            onClick={currentStep === 4 ? undefined : goToNextStep}
                          >
                            {currentStep === 4 ? "Confirm & Submit" : "Next"}
                          </button>
                          <button
                            type="button"
                            onClick={goToPreviousStep}
                            className="ct_outline_btn previous float-end me-3"
                          >
                            {currentStep === 1 ? "Back" : "Previous"}
                          </button>
                        </fieldset>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
      <WebFooter />
    </>
  );
};

export default HostingProcess;
