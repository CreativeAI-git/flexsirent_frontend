import { pipViewDate } from "../../utills/pip";
import Loader from "../../components/form/Loader";
import { pageRoutes } from "../../routes/PageRoutes";
import SubHeader from "../../shared/layout/SubHeader";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import PanelLayout from "../../shared/layout/PanelLayout";
import { propetyStatusUpdate } from "../../redux/actions/hostAction";
import PropertyOverView from "../../components/pages/Property/PropertyOverView";

const PropertyDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useLocation()?.state?.data || {};
  const { isLoading } = useSelector((state) => state.hostReducers);

  const handleStatusUpdate = (updateStatus) => {
    const callback = (res) => {
      if (res?.success) {
        navigate(pageRoutes?.propertyManagement);
      }
    };
    const finalData = {
      property_id: data?.property_id,
      status: updateStatus,
    };
    dispatch(propetyStatusUpdate({ payload: finalData, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout>
      <div className="d-flex align-items-center justify-content-between gap-3 pb-4 ct_flex_col_575">
        <div>
          <SubHeader label="Property Details" />
        </div>
        {data?.status == 0 && (
          <div className="d-flex align-items-center gap-3">
            <button
              className="ct_reject_btn"
              onClick={() => {
                handleStatusUpdate(2);
              }}
            >
              <i className="fa-solid fa-xmark me-2"></i>
              Reject
            </button>
            <button
              className="ct_accept_btn"
              type="button"
              onClick={() => {
                handleStatusUpdate(1);
              }}
            >
              <i className="fa-solid fa-check me-2"></i>
              Accept
            </button>
          </div>
        )}
      </div>
      <div className="ct_light_orange_bg ct_grid_4">
        <div>
          <h6 className="mb-1 ct_fs_16">Requested On</h6>
          <p className="mb-0 ct_text_4B5563">{pipViewDate(data?.created_at)}</p>
        </div>
        {data?.approved_at && (
          <div>
            <h6 className="mb-1 ct_fs_16">Approved On</h6>
            <p className="mb-0 ct_text_4B5563">
              {pipViewDate(data?.approved_at)}
            </p>
          </div>
        )}
        {data?.rejected_at && (
          <div>
            <h6 className="mb-1 ct_fs_16">Rejected On</h6>
            <p className="mb-0 ct_text_4B5563">
              {pipViewDate(data?.rejected_at)}
            </p>
          </div>
        )}
        <div>
          <h6 className="mb-1 ct_fs_16">Host Name</h6>
          <p className="mb-0 ct_text_4B5563">
            {" "}
            {data?.host_first_name
              ? `${data?.host_first_name} ${data?.host_lost_name}`
              : "#N/A"}
          </p>
        </div>
      </div>
      <PropertyOverView data={data} />
    </PanelLayout>
  );
};

export default PropertyDetails;
