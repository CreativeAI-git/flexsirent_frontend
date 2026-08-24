import { Modal } from "antd";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import ListingForYouFields, {
  listingForYouInitialValues,
} from "../form/ListingForYouFields";
import { listingForYouSchema } from "../../utils/schema";
import {
  fetchProperties,
  listingForYou,
} from "../../../redux/features/host/actions/bookingAction";

const CreateListingForYou = ({ isViewModal, setIsViewModal }) => {
  const dispatch = useDispatch();

  const handleAddListing = (values) => {
    const callback = (res) => {
      if (res?.success) {
        dispatch(fetchProperties());
        setIsViewModal(false);
      }
    };
    dispatch(listingForYou({ payload: values, callback }));
  };
  return (
    <Modal
      title="We Create Listing For You"
      open={isViewModal}
      onCancel={() => {
        setIsViewModal(false);
      }}
      centered={true}
      footer={null}
      width={"800px"}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content bg-transparent">
          <Formik
            initialValues={listingForYouInitialValues}
            enableReinitialize
            validationSchema={listingForYouSchema}
            onSubmit={(values) => {
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
            }) => (
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="modal-body">
                  <ListingForYouFields
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                  />
                </div>

                <div className="modal-footer border-0 d-flex align-items-center gap-3 mt-4">
                  <button
                    type="button"
                    className="ct_outline_btn"
                    onClick={() => {
                      setIsViewModal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="ct_orange_btn"
                  >
                    Create
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default CreateListingForYou;
