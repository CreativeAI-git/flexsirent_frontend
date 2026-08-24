import { Formik } from "formik";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../../components/form/Loader";
import { pageRoutes } from "../../routes/PageRoutes";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import { serviceFeeSchema } from "../../utills/schema";
import PanelLayout from "../../shared/layout/PanelLayout";
import { Country, State, City } from "country-state-city";
import ErrorMessage from "../../components/form/ErrorMessage";
import { createServiceFee } from "../../redux/actions/serviceFeeAction";

const AddServiceFeeDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const { isLoading } = useSelector((state) => state?.serviceFeeReducers);

  const initialValues = {
    country: "",
    state: "",
    location: "",
    commission: "",
  };

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);


  
  const handleAdd = (values) => {
    const callback = (res) => {
      if (res?.success) {
        navigate(pageRoutes?.manageServiceFee);
      }
    };
    dispatch(createServiceFee({ payload: values, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout>
      <SubHeader label="Add Service Fee Details" />
      <div class="ct_white_bg">
        <div class="ct_px_30_new pt-4">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={serviceFeeSchema}
            onSubmit={(values, actions) => {
              handleAdd(values);
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
            }) => (
              <form onSubmit={handleSubmit}>
                <div class="row">
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
                          setFieldValue("city", "");

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
                          <option key={country.isoCode} value={country.name}>
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
                          setFieldValue("city", "");

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
                  <div class="col-md-12">
                    <div class="form-group mb-4">
                      <label for="" class="ct_fw_600 mb-2">
                        Fee Amount (%)
                      </label>
                      <input
                        type="number"
                        onWheel={(e) => e.target.blur()}  
                        class="form-control ct_input ct_border_op_10"
                        placeholder={`Fee Amount (%)`}
                        name="commission"
                        value={values.commission}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        errors={errors}
                        touched={touched}
                        fieldName={"commission"}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  class="ct_orange_btn ct_border_radius_10 ct_h_40 ms-auto"
                >
                  Save
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </PanelLayout>
  );
};

export default AddServiceFeeDetail;
