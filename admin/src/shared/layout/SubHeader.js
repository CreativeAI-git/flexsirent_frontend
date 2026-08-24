import { useNavigate, useLocation, matchPath } from "react-router-dom";
import { pageRoutes } from "../../routes/PageRoutes";

const SubHeader = ({
  label = "",
  isBtn = false,
  btnRoute = "",
  btnName = "",
  paddingClass = "pb-4",
}) => {
  const { pathname } = useLocation();
  const backBtnRoute = [
    // pageRoutes?.editReview,
    pageRoutes?.addReview,
    pageRoutes.varificationDetail,
    pageRoutes.editVarificationDetail,
    pageRoutes.serviceFeeDetail,
    pageRoutes.editServiceFeeDetail,
    pageRoutes.addServiceFeeDetail,
    pageRoutes.addReport,
    pageRoutes.reportDetail,
    pageRoutes.editReportDetail,
    // pageRoutes.inquiryDetails,
    pageRoutes.reservationDetails,
    pageRoutes?.editReservationDetail,
    pageRoutes.listingDetail,
    pageRoutes.editListingDetail,
    pageRoutes.addListingDetail,
    pageRoutes.addSubAdmin,
    pageRoutes.subAdminDetail,
    pageRoutes.editSubAdminDetail,
    pageRoutes.addBlog,
    pageRoutes.blogDetails,
    pageRoutes.editBlogs,
    pageRoutes.bookingDetails,
    pageRoutes.businessDetails,
    pageRoutes.hostDetails,
    pageRoutes.propertyDetails,
    pageRoutes.userDetails,
    pageRoutes.editProfile,
    pageRoutes.contactUsDetails,
    pageRoutes.hostBusinessDetails,
    pageRoutes.bookingDetails,
  ];
  
  const shouldShowBackBtn = backBtnRoute?.some((route) =>
    matchPath({ path: route, end: true }, pathname)
  );

  const navigate = useNavigate();
  const renderHeading = () => {
    return (
      <h4 
          className={`ct_fs_24 ct_fw_700 mb-0 ct_black_text ${paddingClass}`}

      >
        {shouldShowBackBtn && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            class="ct_back_icon"
          >
            <i class="fa-solid fa-angle-left"></i>
          </a>
        )}
        {label}
      </h4>
    );
  };
  return (
    <>
      {isBtn ? (
        <div class="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 pb-4">
          {renderHeading()}
          <div class="ct_w_100_575">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(btnRoute);
              }}
              class="ct_orange_btn"
            >
              {btnName}
            </a>
          </div>
        </div>
      ) : (
        renderHeading()
      )}
    </>
  );
};

export default SubHeader;
