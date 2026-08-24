import { useEffect } from "react";
import { useNavigate } from "react-router";
import Loader from "../../components/form/Loader";
import { pageRoutes } from "../../routes/PageRoutes";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import { myProfile } from "../../redux/actions/authAction";
import ImageWithPreview from "../../shared/components/image preview/imageWithPreview";

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, myProfileData } = useSelector(
    (state) => state.authReducers
  );

  useEffect(() => {
    dispatch(myProfile());
  }, []);

  if (isLoading) {
    return <Loader />;
  };
  return (
    <PanelLayout>
      <div className="row">
        <div className="col-md-12">
          <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_black_text pb-4">
            My Profile
          </h4>
          <div className="ct_white_bg">
            <div className="ct_px_30_new pt-4">
              <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767">
                <div className="d-flex align-items-center gap-4">
                  <div className="ct_upload_user_profile_img">
                    <ImageWithPreview
                      image={
                        myProfileData?.profile_image || "user_profile.png"
                      }
                      className="ct_img_w_90"
                    />
                  </div>
                  <div>
                    <h4 className="ct_fs_18 ct_fw_600 mb-1">
                      {myProfileData?.full_name ?? ""}
                    </h4>
                    <p className="mb-0 ct_text_op_05 ct_fs_14">
                      {myProfileData?.email ?? ""}
                    </p>
                  </div>
                </div>
                <button
                  className="ct_orange_btn ct_border_radius_10 ct_h_40"
                  onClick={() =>
                    navigate(pageRoutes.editProfile, {
                      state: { data: myProfileData },
                    })
                  }
                >
                  Edit Profile
                </button>
              </div>
              <form className="mt-5">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="ct_fw_600 mb-2">Full Name</label>
                      <input
                        type="text"
                        className="form-control ct_input ct_border_op_10"
                        placeholder="Full Name"
                        value={myProfileData?.full_name ?? ""}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="ct_fw_600 mb-2">Email</label>
                      <input
                        type="email"
                        className="form-control ct_input ct_border_op_10"
                        disabled
                        placeholder="Email"
                        value={myProfileData?.email ?? ""}
                      />
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
