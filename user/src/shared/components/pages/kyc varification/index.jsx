import { Formik } from "formik";
import Loader from "../../loader";
import { useLocation } from "react-router";
import ImageUpload from "../../ImageUploader";
import ErrorMessage from "../../form/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { StatusDefinitions } from "../../../utils/data";
import { businessPath } from "../../../../business/routes";
import {
  updateKycDoc,
  fetchDocTypes,
  getUserKYCDocumentData,
} from "../../../../redux/features/business/actions/managementAction";
import { useState } from "react";

const KYC = ({ kycSchema = {} }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const {
    isLoading,
    govIssueIdList,
    proofOfAddressList,
    businessRegistrationList,
    getUserkycData,
  } = useSelector((state) => state.business.management);
  const isRejected = getUserkycData?.status === 2;
  const [enableReupload, setEnableReupload] = useState(false);
  const emptyValues = {
    gov_doc_title: "",
    gov_file: "",
    address_proof_title: "",
    address_proof: "",
    business_reg_title: "",
    business_reg: "",
    driving_license: "",
  };

  const initialValues =
    enableReupload && isRejected
      ? emptyValues
      : {
        gov_doc_title: getUserkycData?.gov_doc_title || "",
        gov_file: getUserkycData?.gov_file || "",
        address_proof_title: getUserkycData?.address_proof_title || "",
        address_proof: getUserkycData?.address_proof || "",
        business_reg_title: getUserkycData?.business_reg_title || "",
        business_reg: getUserkycData?.business_reg || "",
        driving_license: getUserkycData?.driving_license || "",
      };

  const isDisabled =
    getUserkycData?.gov_file && !isRejected
      ? true
      : isRejected
        ? !enableReupload
        : false;

  const handleAddTreatment = (values) => {
    const callback = (res) => {
      if (res?.success) {
        dispatch(fetchDocTypes());
        dispatch(getUserKYCDocumentData());
      }
    };

    const formdata = new FormData();
    formdata.append("gov_file", values?.gov_file);
    formdata.append("gov_doc_title", values?.gov_doc_title);
    formdata.append("address_proof", values?.address_proof);
    formdata.append("address_proof_title", values?.address_proof_title);
    if (pathname.includes(businessPath?.KycUpload)) {
      formdata.append("business_reg", values?.business_reg);
      formdata.append("business_reg_title", values?.business_reg_title);
    }
    if (values?.driving_license) {
      formdata.append("driving_licence_title", "Driving Licence");
      formdata.append("driving_license", values?.driving_license);
    }
    dispatch(updateKycDoc({ payload: formdata, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="row">
      <div className="col-md-12">
        <Formik
          initialValues={initialValues}
          validationSchema={kycSchema}
          enableReinitialize
          onSubmit={(values, actions) => {
            handleAddTreatment(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            setTouched,
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            resetForm,
          }) => (
            <>
              <div className="ms-auto mb-3 text-end">
                <span
                  className={`mb-0 ${StatusDefinitions.kycBadge?.[getUserkycData?.status]?.color
                    }  ms-auto`}
                >
                  {StatusDefinitions.kycBadge?.[getUserkycData?.status]?.value}
                </span>
              </div>
              {getUserkycData?.status == 2 && (
                <div className="ct_light_orange_alert mb-4 align-items-start">
                  <svg
                    className="ct_flex_shrink_0"
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_601_7119"
                      style={{ masktype: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="2"
                      width="20"
                      height="20"
                    >
                      <path d="M0 2H20V22H0V2Z" fill="white"></path>
                    </mask>
                    <g mask="url(#mask0_601_7119)">
                      <mask
                        id="mask1_601_7119"
                        style={{ masktype: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="2"
                        width="20"
                        height="20"
                      >
                        <path d="M0 2H20V22H0V2Z" fill="white"></path>
                      </mask>
                      <g mask="url(#mask1_601_7119)">
                        <path
                          d="M10 4.1875C5.69219 4.1875 2.1875 7.69219 2.1875 12C2.1875 16.3078 5.69219 19.8125 10 19.8125C14.3078 19.8125 17.8125 16.3078 17.8125 12C17.8125 7.69219 14.3078 4.1875 10 4.1875ZM10 7.39062C10.2805 7.39062 10.5198 7.48978 10.7182 7.68809C10.9165 7.88641 11.0156 8.12579 11.0156 8.40625C11.0156 8.68671 10.9165 8.92609 10.7182 9.1244C10.5198 9.32272 10.2805 9.42187 10 9.42188C9.71954 9.42187 9.48016 9.32272 9.28184 9.1244C9.08353 8.92609 8.98437 8.68671 8.98438 8.40625C8.98438 8.12579 9.08353 7.88641 9.28184 7.68809C9.48016 7.48978 9.71954 7.39062 10 7.39062ZM11.875 16.2187H8.4375C8.26491 16.2187 8.1176 16.1577 7.99556 16.0357C7.87352 15.9137 7.8125 15.7663 7.8125 15.5937C7.8125 15.4212 7.87352 15.2738 7.99556 15.1518C8.1176 15.0298 8.26491 14.9687 8.4375 14.9687H9.53125V11.5312H8.90625C8.73366 11.5312 8.58635 11.4702 8.46431 11.3482C8.34227 11.2262 8.28125 11.0788 8.28125 10.9062C8.28125 10.7337 8.34227 10.5863 8.46431 10.4643C8.58635 10.3423 8.73366 10.2812 8.90625 10.2812H10.1562C10.3288 10.2812 10.4762 10.3423 10.5982 10.4643C10.7202 10.5863 10.7812 10.7337 10.7812 10.9062V14.9687H11.875C12.0476 14.9687 12.1949 15.0298 12.3169 15.1518C12.439 15.2738 12.5 15.4212 12.5 15.5937C12.5 15.7663 12.439 15.9137 12.3169 16.0357C12.1949 16.1577 12.0476 16.2187 11.875 16.2187Z"
                          fill="#FF5A3C"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <div>
                    <h5 className="ct_fs_18 ct_fw_700 mb-2">Cancellation Reason</h5>
                    <p className="mb-0 ct_para_scroll ct_custom_scroll">
                      {getUserkycData?.rejected_reason || "#N/A"}
                    </p>
                  </div>


                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="ct_white_bg ct_border_grey_1 mb-4">
                  <div className="form-group mb-4">
                    <label className="mb-2 ct_fw_600">
                      Government-Issued ID{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <select
                      value={values.gov_doc_title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="gov_doc_title"
                      className="form-control ct_input"
                      disabled={isDisabled}
                    >
                      <option value={""}>Select Government-Issued ID</option>
                      {govIssueIdList?.map((item, index) => (
                        <option key={index} value={item?.title}>
                          {item?.title}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      errors={errors}
                      touched={touched}
                      fieldName="gov_doc_title"
                    />
                  </div>
                  <ImageUpload
                    subLabel={true}
                    name="gov_file"
                    label={
                      <>
                        Upload Your Document (IMAGE){" "}
                        <span className="text-danger">*</span>
                      </>
                    }
                    value={values.gov_file}
                    onChange={setFieldValue}
                    onBlur={setTouched}
                    error={errors.gov_file}
                    touched={touched.gov_file}
                    placeholderLabel="Upload your document here"
                    isCrossIcon={!isDisabled}
                  />{" "}
                </div>
                <div className="ct_white_bg ct_border_grey_1 mb-4">
                  <div className="form-group mb-4">
                    <label className="mb-2 ct_fw_600">
                      Proof of Address <span className="text-danger">*</span>
                    </label>
                    <select
                      value={values.address_proof_title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="address_proof_title"
                      className="form-control ct_input"
                      disabled={isDisabled}
                    >
                      <option value={""}>Select Proof of Address</option>
                      {proofOfAddressList?.map((item, index) => (
                        <option key={index} value={item?.title}>
                          {item?.title}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      errors={errors}
                      touched={touched}
                      fieldName="address_proof_title"
                    />
                  </div>
                  <ImageUpload
                    subLabel={true}
                    name="address_proof"
                    label={
                      <>
                        Upload Your Document (IMAGE){" "}
                        <span className="text-danger">*</span>
                      </>
                    }
                    value={values.address_proof}
                    onChange={setFieldValue}
                    onBlur={setTouched}
                    error={errors.address_proof}
                    touched={touched.address_proof}
                    placeholderLabel="Upload your document here"
                    isCrossIcon={!isDisabled}
                  />{" "}
                </div>
                 {pathname.includes(businessPath?.KycUpload) && (
                  <div className="ct_white_bg ct_border_grey_1 mb-4">
                    <div className="form-group mb-4">
                      <label className="mb-2 ct_fw_600">
                        Business Registration / Tax Certificate (CIF / NIF – For
                        Corporate Hosts) <span className="text-danger">*</span>
                      </label>
                      <select
                        value={values.business_reg_title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="business_reg_title"
                        className="form-control ct_input"
                        disabled={isDisabled}
                      >
                        <option value={""}>
                          Select Business Registration / Tax Certificate (CIF /
                          NIF – For Corporate Hosts)
                        </option>
                        {businessRegistrationList?.map((item, index) => (
                          <option key={index} value={item?.title}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                      <ErrorMessage
                        errors={errors}
                        touched={touched}
                        fieldName="business_reg_title"
                      />
                    </div>
                    <ImageUpload
                      subLabel={true}
                      name="business_reg"
                      label={
                        <>
                          Upload Your Document (IMAGE){" "}
                          <span className="text-danger">*</span>
                        </>
                      }
                      value={values.business_reg}
                      onChange={setFieldValue}
                      onBlur={setTouched}
                      error={errors.business_reg}
                      touched={touched.business_reg}
                      placeholderLabel="Upload your document here"
                      isCrossIcon={!isDisabled}
                    />{" "}
                  </div>
                )}
                <div className="ct_white_bg ct_border_grey_1 mb-4">
                  <ImageUpload
                    subLabel={true}
                    name="driving_license"
                    label="Upload Your Driving license (IMAGE)"
                    value={values.driving_license}
                    onChange={setFieldValue}
                    onBlur={setTouched}
                    error={errors.driving_license}
                    touched={touched.driving_license}
                    placeholderLabel="Upload your document here"
                    isCrossIcon={!isDisabled}
                  />{" "}
                </div>

                {!isDisabled && (
                  <button type="submit" className="ct_orange_btn ms-auto mt-4">
                    Submit
                  </button>
                )}
                {isRejected && !enableReupload && (
                  <button
                    type="button"
                    className="ct_orange_btn ms-auto mt-4"
                    onClick={() => {
                      setEnableReupload(true); // 🔥 Enable only when clicked
                    }}
                  >
                    Re-upload Documents
                  </button>
                )}
              </form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default KYC;
