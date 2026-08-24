import { useState } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import CreateListingForYou from "./CreateListingForYou";

const AddListingModal = ({ redirectURL }) => {
  const [isViewModal, setIsViewModal] = useState(false);

  const navigate = useLocalizedNavigate();
  return (
    <>
      {/*  Add listing modal */}
      <div
        className="modal fade"
        id="ct_add_listing_modal"
        tabindex="-1"
        aria-labelledby="ct_add_listing_modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title ct_fs_20 ct_fw_600">
                List a New Property?
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(redirectURL);
                      }}
                      className="ct_orange_btn mb-3"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Create a New Property
                    </a>
                    <button
                      className="ct_outline_btn mb-2 w-100"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setIsViewModal(true)}
                    >
                      We Create Listings For You
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Listing */}
      <CreateListingForYou
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
      />

    </>
  );
};

export default AddListingModal;
