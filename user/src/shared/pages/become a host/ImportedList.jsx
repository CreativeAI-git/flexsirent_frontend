import { useState } from "react";
import { Formik } from "formik";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useDispatch } from "react-redux";
import WebHeader from "../../layout/WebHeader";
import WebFooter from "../../layout/WebFooter";
import { webPath } from "../../../user/routes";
import { listingForYouSchema } from "../../utils/schema";

import ListingForYouFields, {
  listingForYouInitialValues,
} from "../../components/form/ListingForYouFields";
import {
  fetchProperties,
  listingForYou,
} from "../../../redux/features/host/actions/bookingAction";

const ImportedList = () => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);

  const handleAddListing = (values, setSubmitting) => {
    const callback = (res) => {
      if (res?.success) {
        dispatch(fetchProperties());
        setCurrentStep(2);
      }
    };

    dispatch(listingForYou({ payload: values, callback })).finally(() => {
      setSubmitting(false);
    });
  };

  return (
    <>
      {/* Header Section S */}
      <WebHeader />

      <section className="py-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="ct_multistep_form_card  pt-4  mt-3 mb-3 ct_host_process_bg">
                <Formik
                  initialValues={listingForYouInitialValues}
                  enableReinitialize
                  validationSchema={listingForYouSchema}
                  onSubmit={(values, actions) => {
                    handleAddListing(values, actions.setSubmitting);
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
                    isSubmitting,
                  }) => (
                    <form id="msform" onSubmit={handleSubmit}>
                      {/* <!-- progressbar --> */}
                      <ul
                        id="ct_form_progressbar"
                        className="ct_host_process_multi_form"
                      >
                        <li
                          className={`ct_flex_1 ${currentStep === 1 ? "active" : ""}`}
                        >
                          <h5>Step 1</h5>
                        </li>
                        <li
                          className={currentStep === 2 ? "active" : ""}
                          id="ct_pricing"
                        >
                          <h5>Done</h5>
                        </li>
                      </ul>

                      {currentStep === 1 && (
                        <fieldset className="ct_mt_60">
                          <div className="ct_form-card">
                            <h2 className="ct_fs_35 ct_fw_600 mb-2">
                              1. Flexsirent Will Create The Listings For You
                            </h2>
                            <p className="ct_text_op_8 mb-0">
                              Provide The Links Of Your Listings On Other Platforms
                              and We Will Create The Listings For You.
                            </p>
                            <div className="mt-5">
                              <ListingForYouFields
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                labelClassName="mb-2 ct_fw_400"
                                inputClassName="form-control ct_input ct_input_h_50"
                                locationInputClassName="form-control ct_input ct_input_h_50"
                                showRequiredMarks={true}
                              />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="ct_orange_btn ct_form_next float-end"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Next"}
                          </button>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (!isSubmitting) {
                                navigate(-1);
                              }
                            }}
                            className="ct_outline_btn previous float-end me-3"
                          >
                            Back
                          </a>
                        </fieldset>
                      )}

                      {currentStep === 2 && (
                        <fieldset>
                          <div className="ct_form-card">
                            <section className="ct_payment_success_bg py-5">
                              <div className="ct_payment_sucess_cnt">
                                <img loading="lazy" src="https://app.flexsirent.com/assets/img/sucess_icon.png" alt="" />
                                <h4 className="ct_fs_28 ct_fw_600">Congratulations!</h4>
                                <div className="mt-4">
                                  <h4 className="ct_fs_18 ct_fw_500">
                                    We Will Create The Listings For You Soon.
                                  </h4>
                                  <p className="ct_fs_18 mb-0">
                                    We have got your request and will notify you by
                                    email once the listings are published. If we
                                    need more information, we will contact you. If
                                    you have any questions, feel free to contact us.
                                  </p>
                                </div>
                                <div className="mt-5">
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigate(webPath?.BecomeHostProcess);
                                    }}
                                    className="ct_orange_btn ct_border_radius_100 ct_fit_content mx-auto"
                                  >
                                    Back to Listing Page
                                  </a>
                                </div>
                              </div>
                            </section>
                          </div>
                        </fieldset>
                      )}
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer section S */}
      <WebFooter />
    </>
  );
};

export default ImportedList;
