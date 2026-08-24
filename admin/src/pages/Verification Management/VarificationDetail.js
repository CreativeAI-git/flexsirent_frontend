import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import { pipViewDate } from "../../utills/pip";
import Loader from "../../components/form/Loader";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import ViewReasonModal from "../../components/modal/ViewReasonModal";
import { kycDeatil, updateKYCStatus } from "../../redux/actions/authAction";

const VarificationDetail = () => {
  const dispatch = useDispatch();
  const [isViewModal2, setIsViewModal2] = useState(false);
  const data = useLocation()?.state?.data || {};
  const { isLoading, docDetail } = useSelector((state) => state.authReducers);

  useEffect(() => {
    dispatch(
      kycDeatil({
        payload: {
          id: data?.id,
          user_type: data?.user_type,
        },
      })
    );
  }, []);

  const handleChangeStatus = (val) => {
    const callback = (response) => {
      if (response.success) {
        dispatch(
          kycDeatil({
            payload: {
              id: data?.id,
              user_type: data?.user_type,
            },
          })
        );
      }
    };
    const payload = {
      id: data?.id,
      user_type: data?.user_type,
      status: val,
    };
    dispatch(updateKYCStatus({ payload, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout>
      <SubHeader label="Verification Details" />
      <div class="ct_white_bg h-auto">
        <div class="ct_px_30_new pt-4">
          <ul class="ct_view_profile_list">
            <li>
              <p class="mb-0 ct_fw_600">User Name :</p>
              <p class="mb-0">
                {" "}
                {`${docDetail?.first_name} ${docDetail?.last_name}` || "#N/A"}
              </p>
            </li>

            <li>
              <p class="mb-0 ct_fw_600">Submitted On :</p>
              <p class="mb-0">
                {" "}
                {docDetail?.created_at
                  ? pipViewDate(docDetail?.created_at)
                  : "#N/A"}
              </p>
            </li>

            <li>
              <p class="mb-0 ct_fw_600">Status :</p>
              <div className="d-flex align-items-center gap-3">
                <select
                  class="form-control ct_input ct_input_h_50 ct_light_blue_input_border w-auto"
                  value={docDetail?.status}
                  onChange={(e) => {
                    if (e.target.value == "2") {
                      setIsViewModal2(true);
                      return;
                    }
                    handleChangeStatus(e.target.value);
                  }}
                  disabled={docDetail?.status === 0 ? false : true}
                >
                  <option value="0">Pending</option>
                  <option value="1">Accept</option>
                  <option value="2">Reject</option>
                </select>
              </div>
            </li>

            {docDetail?.status == 2 && (
              <li>
                <p class="mb-0 ct_fw_600">Cancellation Reason :</p>
                <p class="mb-0"> {docDetail?.rejected_reason || "#N/A"}</p>
              </li>
            )}

            {docDetail?.gov_doc_title && (
              <li>
                <p class="mb-0 ct_fw_600">Government-Issued ID :</p>
                <div>
                  <p class="mb-0 ">{docDetail?.gov_doc_title || "#N/A"}</p>
                  <a href={docDetail?.gov_file} target="blank">
                    <img  loading="lazy"
                      src={docDetail?.gov_file}
                      alt="image"
                      className="ct_doc_id_img"
                    ></img>
                  </a>
                </div>
              </li>
            )}
            {docDetail?.address_proof_title && (
              <li>
                <p class="mb-0 ct_fw_600">Proof of Address :</p>
                <div>
                  <p class="mb-0 ">
                    {docDetail?.address_proof_title || "#N/A"}
                  </p>
                  <a href={docDetail?.address_proof} target="blank">
                    <img  loading="lazy"
                      src={docDetail?.address_proof}
                      alt="image"
                      className="ct_doc_id_img"
                    ></img>
                  </a>
                </div>
              </li>
            )}
            {docDetail?.business_reg_title && (
              <li>
                <p class="mb-0 ct_fw_600">
                  Business Registration / Tax Certificate (CIF / NIF – For
                  Corporate Hosts) :
                </p>
                <div>
                  <p class="mb-0 ">{docDetail?.business_reg_title || "#N/A"}</p>
                  <a href={docDetail?.business_reg} target="blank">
                    <img  loading="lazy"
                      src={docDetail?.business_reg}
                      alt="image"
                      className="ct_doc_id_img"
                    ></img>
                  </a>
                </div>
              </li>
            )}
            {docDetail?.driving_license && (
              <li>
                <p class="mb-0 ct_fw_600">Driving license :</p>
                <div>
                  <a href={docDetail?.driving_license} target="blank">
                    <img  loading="lazy"
                      src={docDetail?.driving_license}
                      alt="image"
                      className="ct_doc_id_img"
                    ></img>
                  </a>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      <ViewReasonModal
        isViewModal={isViewModal2}
        setIsViewModal={setIsViewModal2}
        activeKyc={docDetail}
      />
    </PanelLayout>
  );
};

export default VarificationDetail;
