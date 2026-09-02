import { Formik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Country } from "country-state-city";
import WebFooter from "../../layout/WebFooter";
import { webPath } from "../../../user/routes";
import WebHeader from "../../layout/WebHeader";
import { curSym, getProfile, pipViewDate } from "../../utils/pip";
import { useDispatch, useSelector } from "react-redux";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation } from "react-router";
import { bookPropertySchema } from "../../utils/schema";
import ErrorMessage from "../../components/form/ErrorMessage";
import {
  fetchBookInformation,
  manageBookProperty,
} from "../../../redux/features/user/actions/bookingAction";

import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import Loader from "../../components/loader";

const BookProperty = () => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const profile = getProfile("guest");
  const data = useLocation()?.state?.data || {};
  const { isLoading: reduxLoading, bookingInfo: reduxBookingInfo } = useSelector(
    (state) => state?.guest?.booking,
  );

  const calculateDays = (start, end) => {
    if (!start || !end) return 30;
    try {
      const diff = new Date(end).getTime() - new Date(start).getTime();
      return Math.max(1, Math.round(diff / (1000 * 3600 * 24)));
    } catch (e) {
      return 30;
    }
  };

  const days = calculateDays(data?.start_date, data?.end_date);
  const monthlyRent = parseFloat(data?.monthly_rent || 0);
  const securityDeposit = parseFloat(data?.security_deposit || 0);
  const totalRent = (monthlyRent / 30) * days;
  const totalPayable = totalRent + securityDeposit;

  const bookingInfo = data?.isTrident ? {
    property_title: data?.property_title || data?.title,
    address: data?.address_masked || data?.address,
    propertyImage: data?.propertyImage,
    booked_from: data?.start_date,
    booked_to: data?.end_date,
    guest: data?.guestCount,
    price_breakdown: {
      total_amount: totalRent,
      discount_amount: 0,
      subtotal: totalRent,
      security_deposit: securityDeposit,
      total_payable: totalPayable,
      monthly_rent: monthlyRent,
    }
  } : reduxBookingInfo;

  const isLoading = data?.isTrident ? false : reduxLoading;

  const initialState = {
    full_name: "",
    email: profile?.email || "",
    phone_number: "",
    nationality: "",
    purpose_of_stay: "",
  };
  const purposeOfStayOptions = [
    "Work / Job Assignment",
    "Business Trip",
    "Education / Internship / Training",
    "Medical Treatment / Healthcare",
    "Family Visit",
    "Tourism / Vacation",
    "Relocation / Moving City",
    "Long-Term Residence",
    "Short-Term Stay",
    "Other",
  ];

  const countryOptions = Country.getAllCountries();

  useEffect(() => {
    if (data?.isTrident) return;
    dispatch(
      fetchBookInformation({
        payload: {
          booked_from: data?.start_date,
          booked_to: data?.end_date,
          property_id: data?.property_id,
          guest: data?.guestCount,
        },
      }),
    );
  }, []);

  const handlebookProperty = (values) => {
    // if (data?.isTrident) {
    //   toast.success("Booking request sent successfully!");
    //   setTimeout(() => {
    //     navigate(webPath?.Home || "/");
    //   }, 1500);
    //   return;
    // }

    const callback = (res) => {
      if (res?.success) {
        navigate(webPath?.Home);
      }
    };

    const payload = {
      guest: bookingInfo?.guest,
      property_id: data?.property_id,
      booked_from: bookingInfo?.booked_from,
      booked_to: bookingInfo?.booked_to,
      total_price: bookingInfo?.price_breakdown?.total_payable,
      ...values,
    };

    dispatch(manageBookProperty({ payload, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <WebHeader />

      <section className="">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="ct_multistep_form_card px-0 pt-4 pb-0 mt-3 mb-3">
                <form id="msform">
                  <fieldset>
                    <div className="ct_form-card">
                      <div className="row">
                        <div className="col-lg-7 mb-4 mb-lg-0">
                          <h4 className="ct_fs_22 ct_fw_600 mb-3">
                            Property Summary
                          </h4>
                          <figure className="ct_aprtment_summary_card">
                            <img
                              loading="lazy"
                              src={
                                bookingInfo?.propertyImage?.length &&
                                bookingInfo?.propertyImage[0]?.image
                              }
                              alt=""
                            />
                            <figcaption className="ct_mt_30">
                              <h5 className="ct_fs_18 ct_fw_600 mb-3">
                                {bookingInfo?.property_title || "#N/A"}
                              </h5>
                              <p className="mb-0">
                                <svg
                                  width="18" className="me-2"
                                  height="19"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <mask
                                    id="mask0_1_7104"
                                    style={{ maskType: "luminance" }}
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="20"
                                    height="21"
                                  >
                                    <path
                                      d="M0 0.720703H20V20.7207H0V0.720703Z"
                                      fill="white"
                                    />
                                  </mask>
                                  <g mask="url(#mask0_1_7104)">
                                    <mask
                                      id="mask1_1_7104"
                                      style={{ maskType: "luminance" }}
                                      maskUnits="userSpaceOnUse"
                                      x="0"
                                      y="0"
                                      width="20"
                                      height="21"
                                    >
                                      <path
                                        d="M0 0.720703H20V20.7207H0V0.720703Z"
                                        fill="white"
                                      />
                                    </mask>
                                    <g mask="url(#mask1_1_7104)">
                                      <path
                                        d="M9.22923 20.3172C3.55352 12.0891 2.5 11.2447 2.5 8.2207C2.5 4.07855 5.85785 0.720703 10 0.720703C14.1421 0.720703 17.5 4.07855 17.5 8.2207C17.5 11.2447 16.4465 12.0891 10.7708 20.3172C10.3983 20.8552 9.60164 20.8552 9.22923 20.3172ZM10 11.3457C11.7259 11.3457 13.125 9.9466 13.125 8.2207C13.125 6.4948 11.7259 5.0957 10 5.0957C8.2741 5.0957 6.875 6.4948 6.875 8.2207C6.875 9.9466 8.2741 11.3457 10 11.3457Z"
                                        fill="#9CA3AF"
                                      />
                                    </g>
                                  </g>
                                </svg>
                                {bookingInfo?.address || "#N/A"}
                              </p>
                              <div className="ct_grey_bg ct_outline_border p-3 mt-3">
                                <div className="d-flex align-items-center justify-content-between gap-2">
                                  <div className="d-flex align-items-center gap-2">
                                    <i className="fa-solid fa-calendar-days ct_orange_text"></i>
                                    <h6 className="mb-0 ct_fs_16">Rental Period</h6>
                                  </div>
                                  {/* <p className="mb-0  ct_text_op_6">3 months</p> */}
                                </div>
                                <ul className="mt-3">
                                  <li className="d-flex align-items-center gap-2 justify-content-between">
                                    <p className="mb-0 ct_text_op_6 ct_fs_14">
                                      Check-In
                                    </p>
                                    <p className="mb-0 ct_fs_14">
                                      {pipViewDate(bookingInfo?.booked_from) ||
                                        ""}
                                    </p>
                                  </li>
                                  <li className="d-flex align-items-center gap-2 justify-content-between mt-2">
                                    <p className="mb-0 ct_text_op_6 ct_fs_14">
                                      Check-Out
                                    </p>
                                    <p className="mb-0 ct_fs_14">
                                      {pipViewDate(bookingInfo?.booked_to) ||
                                        ""}
                                    </p>
                                  </li>
                                </ul>
                              </div>
                              <div className=" ct_outline_border p-3 mt-3">
                                <div className="d-flex align-items-center justify-content-between gap-2">
                                  <h5 className="mb-0 ct_fs_16">Price Breakdown</h5>
                                  {/* <p className="mb-0  ct_text_op_6">3 months</p> */}
                                </div>
                                <ul className="mt-3">
                                  <li className="d-flex align-items-center gap-2 justify-content-between">
                                    <p className="mb-0 ct_text_op_6 ct_fs_14">
                                      Total Amount
                                    </p>
                                    <p className="mb-0 ct_fs_14">
                                      {curSym}
                                      {parseFloat(
                                        bookingInfo?.price_breakdown?.total_amount,
                                      )?.toFixed(2)}
                                    </p>
                                  </li>
                                  {bookingInfo?.price_breakdown?.discount_amount > 0 && <li className="d-flex align-items-center gap-2 mt-2 justify-content-between">
                                    <p className="mb-0 ct_text_op_6 ct_fs_14">
                                      Discount
                                    </p>
                                    <p className="mb-0 ct_fs_14 text-success">
                                      -{curSym}
                                      {parseFloat(
                                        bookingInfo?.price_breakdown?.discount_amount,
                                      )?.toFixed(2)}
                                    </p>
                                  </li>}
                                  <li className="d-flex align-items-center gap-2 justify-content-between mt-2">
                                    <p className="mb-0 ct_text_op_6 ct_fs_14">
                                      Subtotal
                                    </p>
                                    <p className="mb-0 ct_fs_14">
                                      {curSym}
                                      {parseFloat(
                                        bookingInfo?.price_breakdown?.subtotal,
                                      )?.toFixed(2)}
                                    </p>
                                  </li>
                                  <li className="d-flex align-items-center gap-2 justify-content-between mt-2">
                                    <p className="mb-0 ct_text_op_6 ct_fs_14">
                                      Security Deposit
                                    </p>
                                    <p className="mb-0 ct_fs_14">
                                      +{curSym}
                                      {parseFloat(
                                        bookingInfo?.price_breakdown?.security_deposit,
                                      )?.toFixed(2)}
                                    </p>
                                  </li>


                                </ul>
                                <hr className="ct_hr_border_clr " />
                                <div className="d-flex align-items-center gap-2 justify-content-between mt-2">
                                  <h5 className="mb-0 ct_fs_18 ct_fw_600 ct_orange_text">
                                    Total Payable Amount
                                  </h5>
                                  <h5 className="mb-0 ct_fs_18 ct_fw_600 ct_orange_text">
                                    {curSym}
                                    {parseFloat(
                                      bookingInfo?.price_breakdown?.total_payable,
                                    )?.toFixed(2)}
                                  </h5>
                                </div>
                              </div>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="col-lg-5 mb-4 mb-lg-0">
                          <Formik
                            initialValues={initialState}
                            validationSchema={bookPropertySchema}
                            onSubmit={(values, actions) => {
                              handlebookProperty(values);
                            }}
                          >
                            {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              setFieldTouched,
                              setFieldValue,
                            }) => (
                              <form onSubmit={handleSubmit}>
                                <div className="ct_outline_border py-5 px-4">
                                  <h4 className="ct_fs_22 ct_fw_600 mb-3">
                                    Personal Information
                                  </h4>
                                  <div className="form-group mb-3">
                                    <label for="" className="mb-2 ct_fw_500">
                                      Full Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control ct_input"
                                      placeholder="Enter Full Name"
                                      id="full_name"
                                      name="full_name"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values["full_name"]}
                                    />
                                    <ErrorMessage
                                      errors={errors}
                                      touched={touched}
                                      fieldName={"full_name"}
                                    />
                                  </div>
                                  <div className="form-group mb-3">
                                    <label for="" className="mb-2 ct_fw_500">
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control ct_input"
                                      placeholder="Enter Email"
                                      id="email"
                                      name="email"
                                      disabled
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values["email"]}
                                    />
                                    <ErrorMessage
                                      errors={errors}
                                      touched={touched}
                                      fieldName={"email"}
                                    />
                                  </div>
                                  <div className="form-group mb-3">
                                    <label for="" className="mb-2 ct_fw_500">
                                      Phone Number
                                    </label>
                                    {/* <input
                                      type="email"
                                      className="form-control ct_input"
                                      placeholder="Enter Phone Number"
                                      id="phone_number"
                                      name="phone_number"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values["phone_number"]}
                                    /> */}
                                    <PhoneInput
                                      flags={flags}
                                      international
                                      defaultCountry="ES"
                                      className="ct_phone_input"
                                      placeholder="Enter Phone Number"
                                      value={values.phone_number}
                                      onChange={(val) => {
                                        setFieldTouched("phone_number", true);
                                        setFieldValue(
                                          "phone_number",
                                          val || "",
                                          true,
                                        );
                                      }}
                                    />
                                    <ErrorMessage
                                      errors={errors}
                                      touched={touched}
                                      fieldName={"phone_number"}
                                    />
                                  </div>
                                  <div className="form-group mb-3">
                                    <label for="" className="mb-2 ct_fw_500">
                                      Nationality
                                    </label>
                                    <select
                                      className="form-control ct_input"
                                      value={values["nationality"]}
                                      id="nationality"
                                      onChange={handleChange}
                                    >
                                      <option value={""}>
                                        Select Nationality
                                      </option>
                                      {countryOptions?.map((item, ind) => {
                                        return (
                                          <option key={ind} value={item?.name}>
                                            {item?.name}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    <ErrorMessage
                                      errors={errors}
                                      touched={touched}
                                      fieldName={"nationality"}
                                    />
                                  </div>
                                  <div className="form-group mb-3">
                                    <label for="" className="mb-2 ct_fw_500">
                                      Purpose Of Stay
                                    </label>
                                    <select
                                      className="form-control ct_input"
                                      value={values["purpose_of_stay"]}
                                      id="purpose_of_stay"
                                      onChange={handleChange}
                                    >
                                      <option value={""}>
                                        Select Purpose Of Stay
                                      </option>
                                      {purposeOfStayOptions?.map(
                                        (item, ind) => {
                                          return (
                                            <option key={ind} value={item}>
                                              {item}
                                            </option>
                                          );
                                        },
                                      )}
                                    </select>
                                    <ErrorMessage
                                      errors={errors}
                                      touched={touched}
                                      fieldName={"purpose_of_stay"}
                                    />
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={handleSubmit}
                                  className="ct_orange_btn ct_form_next float-end mt-4"
                                >
                                  Continue to Booking Request
                                </button>
                              </form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WebFooter />
    </>
  );
};

export default BookProperty;
