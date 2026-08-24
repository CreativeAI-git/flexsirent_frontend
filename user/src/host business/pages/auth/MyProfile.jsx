import { useEffect } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { hostBusinessPaths } from "../../routes";
import { getProfile } from "../../../shared/utils/pip";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../shared/components/loader";
import PanelLayout from "../../../shared/layout/PanelLayout";
import { fetchHostProfile } from "../../../redux/features/host/actions/authAction";
import ImageWithPreview from "../../../shared/components/image preview/imageWithPreview";

const MyProfile = () => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const profileData = getProfile("hostBusiness") || {};
  const user = { name: "My Profile", role: "hostBusiness" };
  const { isLoading } = useSelector((state) => state.host.auth);

  useEffect(() => {
    dispatch(fetchHostProfile());
  }, []);

  if (isLoading) {
    return <Loader />;
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
                  // className="ct_img_60"
                />
              </div>
              <div className="d-flex align-items-center justify-content-between ct_flex_1 ct_flex_col_575 gap-2">
                <div>
                  <h4 className="ct_fs_18 ct_fw_700 mb-1">{`${
                    profileData?.first_name ?? ""
                  } ${profileData?.last_name ?? ""}`}</h4>
                  <p className="mb-0 ct_text_op_05 ct_fs_14">Host Business</p>
                </div>
                {/* <!-- <div className="">
                                                <p className="ct_text_clr_4B5563 mb-0">Joined on: 13 may 2025</p>
                                            </div> --> */}
              </div>
            </div>
          </div>
          <div className="ct_light_blue_outline ct_p_30 shadow-none h-auto">
            <div className="">
              <div className="d-flex align-items-center justify-content-between gap-3 ct_mb_35 ct_flex_col_575">
                <h4 className="ct_fs_22 ct_fw_600 mb-0">Personal information</h4>
                <div className="d-flex align-items-center gap-3 ct_w_100_575">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(hostBusinessPaths.EditProfile, {
                        state: { data: profileData },
                      });
                    }}
                    className="ct_outline_btn  ct_dark_blue_outline_btn ct_border_radius_10 ct_w_100_575"
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
                        First Name
                      </p>
                      <h6 className="mb-0 ct_fs_16">
                        {profileData?.first_name || "#N/A"}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div>
                      <p className="ct_text_clr_4B5563 mb-1 ct_fw_400">Last Name</p>
                      <h6 className="mb-0 ct_fs_16">
                        {profileData?.last_name || "#N/A"}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div>
                      <p className="ct_text_clr_4B5563 mb-1 ct_fw_400">Email</p>
                      <h6 className="mb-0 ct_fs_16">
                        {profileData?.email || "#N/A"}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div>
                      <p className="ct_text_clr_4B5563 mb-1 ct_fw_400">
                        Phone Number
                      </p>
                      <h6 className="mb-0 ct_fs_16">
                        {profileData?.phone || "#N/A"}
                      </h6>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default MyProfile;
