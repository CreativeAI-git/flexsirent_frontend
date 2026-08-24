import React from "react";
import { Formik } from "formik";
import { Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../../shared/components/form/ErrorMessage";
import { createOfferSchema } from "../../../shared/utils/schema";
import { createMultipleOffer } from "../../../redux/features/host/actions/reviewAction";

const getPropertyOption = (item) => {
  const value = Number(item?.property_id ?? item?.id ?? item?.value);
  const label =
    item?.property_title ??
    item?.website_address ??
    item?.address ??
    item?.title ??
    item?.property_name ??
    item?.label ??
    `#N/A`;

  return { value, label };
};

const initialValues = {
  property_id: "",
  offer_value: "",
  start_date: "",
  end_date: "",
};

const AddOffersModal = ({ isViewModal, setIsViewModal, onSuccess }) => {
  const dispatch = useDispatch();
  const { offerPropertyOptions, offerSubmitting } = useSelector(
    (state) => state.host.review
  );

  const propertyOptions = (offerPropertyOptions || [])
    .map(getPropertyOption)
    .filter((item) => !Number.isNaN(item?.value));

  return (
    <Modal
      title="Create Offer"
      open={isViewModal}
      onCancel={() => {
        if (!offerSubmitting) {
          setIsViewModal(false);
        }
      }}
      centered
      footer={null}
      width="800px"
      destroyOnHidden
    >
      <Formik
        initialValues={initialValues}
        validationSchema={createOfferSchema}
        onSubmit={(values, actions) => {
          const callback = (res) => {
            if (res?.success) {
              actions.resetForm();
              setIsViewModal(false);
              onSuccess?.();
            }
          };

          dispatch(
            createMultipleOffer({
              payload: {
                property_ids: [Number(values.property_id)],
                offer_value: Number(values.offer_value),
                start_date: values.start_date,
                end_date: values.end_date,
              },
              callback,
            })
          );
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
            <div className="row pt-2">
              <div className="col-md-12 mb-4">
                <div className="form-group">
                  <label className="mb-2">Select Property</label>
                  <Select
  allowClear
  showSearch
  size="large"
  className="w-100"
  placeholder="Choose property"
  value={values.property_id || undefined}
  options={propertyOptions}
  disabled={offerSubmitting || propertyOptions.length === 0}
  getPopupContainer={(trigger) => trigger.parentNode}
  virtual={false}
  onChange={(value) => {
    setFieldTouched("property_id", true);
    setFieldValue("property_id", value || "");
  }}
/>
                  
                  <ErrorMessage
                    errors={errors}
                    touched={touched}
                    fieldName="property_id"
                  />
                  {propertyOptions.length === 0 && (
                    <span style={{ color: "#6b7280" }}>
                      No properties are available for a new offer.
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="form-group">
                  <label className="mb-2">Offer Discount</label>
                  <div className="position-relative">
                    <input
                      id="offer_value"
                      type="number"
                      min="1"
                      max="100"
                      className="form-control ct_input ct_input_h_50"
                      placeholder="Enter discount"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.offer_value}
                    />
                    <span className="ct_show_eye">%</span>
                  </div>
                  <ErrorMessage
                    errors={errors}
                    touched={touched}
                    fieldName="offer_value"
                  />
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="form-group">
                  <label className="mb-2">Start Date</label>
                  <input
                    id="start_date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="form-control ct_input ct_input_h_50"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.start_date}
                  />
                  <ErrorMessage
                    errors={errors}
                    touched={touched}
                    fieldName="start_date"
                  />
                </div>
              </div>

              <div className="col-md-6 mb-2">
                <div className="form-group">
                  <label className="mb-2">End Date</label>
                  <input
                    id="end_date"
                    type="date"
                    min={values.start_date || undefined}
                    className="form-control ct_input ct_input_h_50"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.end_date}
                  />
                  <ErrorMessage
                    errors={errors}
                    touched={touched}
                    fieldName="end_date"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
              <button
                type="button"
                className="ct_outline_btn"
                onClick={() => setIsViewModal(false)}
                disabled={offerSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ct_dark_blue_btn"
                disabled={offerSubmitting || propertyOptions.length === 0}
              >
                {offerSubmitting ? "Saving..." : "Save Offer"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddOffersModal;
