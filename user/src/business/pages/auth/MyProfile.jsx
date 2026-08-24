import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { businessPath } from "../../routes";
import PanelLayout from "../../../shared/layout/PanelLayout";
import { getProfile, pipViewDate } from "../../../shared/utils/pip";
import { fetchUserProfile } from "../../../redux/features/user/actions/authAction";
import ImageWithPreview from "../../../shared/components/image preview/imageWithPreview";
import Loader from "../../../shared/components/loader";

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const user = { name: "My Profile", role: "guestBusiness" };
  const {profileData, isLoading} = useSelector(state=>state.guest.auth)
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);
  
  if(isLoading){
    <Loader/>
  }
  return (
    <PanelLayout user={user}>
      <div className="row">
        <div className="col-md-12">
          <div className="ct_light_blue_outline h-auto p-4 mb-4 shadow-none">
            <div className="d-flex align-items-center  gap-3">
              <div className="ct_upload_user_profile_img">
                <ImageWithPreview
                  image={
                    profileData?.profile_image ||
                    "https://app.flexsirent.com/user_profile.png"
                  }
                />
              </div>
              <div className="d-flex align-items-center justify-content-between ct_flex_1 ct_flex_col_767">
                <div>
                  <h4 className="ct_fs_18 ct_fw_700 mb-1">{`${
                    profileData?.first_name ?? ""
                  } ${profileData?.last_name || "#N/A"}`}</h4>
                  <p className="mb-0 ct_text_op_05 ct_fs_14">
                    {profileData?.email || "#N/A"}
                  </p>
                </div>
                <div className="">
                  <p className="ct_text_clr_4B5563 mb-0">
                    Joined On : {pipViewDate(profileData?.created_at) || "#N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="ct_light_blue_outline ct_p_30 shadow-none h-auto">
            <div className="">
              <div className="d-flex align-items-center justify-content-between gap-3 ct_mb_35 ct_flex_col_575">
                <h4 className="ct_fs_22 ct_fw_600 mb-0">Business Details</h4>
                <div className="d-flex align-items-center gap-3">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(businessPath.EditProfile);
                    }}
                    className="ct_outline_btn  ct_dark_blue_outline_btn ct_border_radius_10"
                  >
                    Edit
                    <i className="fa-solid fa-pencil ms-1"></i>
                  </a>
                </div>
              </div>
              <form className="">
                <div className=" row mt-4">
                  <div className="col-md-6 mb-4">
                    <div>
                      <p className="ct_text_clr_4B5563 mb-1 ct_fw_400">
                        Company Name
                      </p>
                      <h6 className="mb-0 ct_fs_16">{profileData?.business_name || "#N/A"}</h6>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div>
                      <p className="ct_text_clr_4B5563 mb-1 ct_fw_400">Country</p>
                      <h6 className="mb-0 ct_fs_16">{profileData?.country || "#N/A"}</h6>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div>
                      <p className="ct_text_clr_4B5563 mb-1 ct_fw_400">
                        Business Email
                      </p>
                      <h6 className="mb-0 ct_fs_16">{profileData?.email || "#N/A"}</h6>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div>
                      <p className="ct_text_clr_4B5563 mb-1 ct_fw_400">Phone</p>
                      <h6 className="mb-0 ct_fs_16">{profileData?.phone || "#N/A"}</h6>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <div className="ct_light_blue_outline ct_p_30 shadow-none h-auto mt-4">
            <div className="">
              <div className="d-flex align-items-center justify-content-between gap-3 ct_mb_35 ct_flex_col_575">
                <h4 className="ct_fs_22 ct_fw_600 mb-0">Payout Details</h4>
                <div className="d-flex align-items-center gap-3">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(businessPath.EditPayout);
                    }}
                    className="ct_outline_btn  ct_dark_blue_outline_btn ct_border_radius_10"
                  >
                    Edit
                    <i className="fa-solid fa-pencil ms-1"></i>
                  </a>
                </div>
              </div>
              <form className="">
                <div className=" row mt-4">
                  <div className="col-md-6 mb-4">
                    <div>
                      <p className="ct_text_clr_4B5563 mb-1 ct_fw_400">Bank Name</p>
                      <h6 className="mb-0 ct_fs_16">International Trust Bank</h6>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div>
                      <p className="ct_text_clr_4B5563 mb-1 ct_fw_400">
                        Account Holder Name
                      </p>
                      <h6 className="mb-0 ct_fs_16">John Doe</h6>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div>
                      <p className="ct_text_clr_4B5563 mb-1 ct_fw_400">
                        IBAN / Account Number
                      </p>
                      <h6 className="mb-0 ct_fs_16">1234 5678 9012 3456</h6>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div>
                      <p className="ct_text_clr_4B5563 mb-1 ct_fw_400">
                        SWIFT / BIC Code
                      </p>
                      <h6 className="mb-0 ct_fs_16">GCBLUS33XXX</h6>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div> */}
        </div>
      </div>
    </PanelLayout>
  );
};

export default MyProfile;
