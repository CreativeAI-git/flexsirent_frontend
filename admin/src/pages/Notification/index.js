import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../components/modal/DeleteModal";
import Loader from "../../components/form/Loader";
import {
  deleteAdminNotification,
  fetchAdminNotifications,
} from "../../redux/actions/authAction";
import { markNotificationsRead } from "../../redux/reducers/authReducers";
import NoRecord from "../../shared/components/others/NoRecord";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PanelLayout from "../../shared/layout/PanelLayout";
import { pip_TimeAgo, pipViewDateTime } from "../../utills/pip";

const Notification = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [isDeleteAll, setIsDeleteAll] = useState(false);

  const { notificationLoading, notificationData } = useSelector(
    (state) => state.authReducers,
  );

  const normalizedNotifications = useMemo(
    () =>
      (notificationData || []).map((item) => ({
        ...item,
        title: item?.title || item?.notification_title || "Notification",
        message:
          item?.message ||
          item?.description ||
          item?.body ||
          item?.notification_message ||
          "#N/A",
        createdAt:
          item?.created_at ||
          item?.createdAt ||
          item?.date ||
          item?.updated_at ||
          "",
      })),
    [notificationData],
  );

  const paginatedList = normalizedNotifications.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages,
  );

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  const refreshNotifications = () => {
    dispatch(markNotificationsRead());
    dispatch(fetchAdminNotifications());
  };

  const openDeleteModal = (notificationId = null) => {
    setSelectedNotificationId(notificationId);
    setIsDeleteAll(!notificationId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteNotification = () => {
    const payload = selectedNotificationId
      ? { notification_id: selectedNotificationId }
      : {};

    dispatch(
      deleteAdminNotification({
        payload,
        callback: (response) => {
          if (response?.success) {
            setIsDeleteModalOpen(false);
            setSelectedNotificationId(null);
            setIsDeleteAll(false);
            setCurrentPage(0);
            refreshNotifications();
          }
        },
      }),
    );
  };

  useEffect(() => {
    dispatch(markNotificationsRead());
    dispatch(fetchAdminNotifications());
  }, [dispatch]);

  if (notificationLoading) return <Loader />;

  return (
    <PanelLayout>
      <div className="row">
        <div className="col-md-12">
          <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_black_text pb-4">
            Notifications
          </h4>
          <div>
            <div className="ct_light_orange_bg p-3 d-flex align-items-center gap-3 mb-4 justify-content-between">
              <p className="mb-0 ct_fw_600">
                Total Notifications: {normalizedNotifications?.length || 0}
              </p>
              {normalizedNotifications?.length > 0 && (
                <p
                  className="mb-0 ct_red_clr ct_fw_500 ct_cursor_pointer"
                  onClick={() => openDeleteModal()}
                >
                  <i className="fa-solid fa-trash-can me-2"></i>
                  Delete All
                </p>
              )}
            </div>
            <ul className="ct_notification_list">
              {paginatedList?.map((item, index) => (
                <li
                  key={item?.notification_id || item?.id || index}
                  className="d-flex align-items-center gap-4 justify-content-between"
                >
                  <div className="d-flex align-items-center gap-3 justify-content-between ct_flex_1">
                    <div>
                      <h5 className="ct_fs_18 ct_fw_600 mb-1">
                        {item?.title ?? "#N/A"}
                      </h5>
                      <p className="mb-0 ct_text_clr_808080">
                        {item?.message ?? "#N/A"}
                      </p>
                    </div>
                    <div className="text-end">
                      <p className="mb-0 ct_white_nowrap ct_text_clr_808080">
                        {item?.createdAt ? pip_TimeAgo(item?.createdAt) : "#N/A"}
                      </p>
                      <small className="ct_text_clr_808080">
                        {item?.createdAt
                          ? pipViewDateTime(item?.createdAt)
                          : ""}
                      </small>
                    </div>
                  </div>
                  <div onClick={() => openDeleteModal(item?.notification_id || item?.id)}>
                    <i className="fa-solid fa-trash-can ct_red_clr ct_cursor_pointer"></i>
                  </div>
                </li>
              ))}
            </ul>
            {paginatedList?.length <= 0 && <NoRecord />}
          </div>
          {normalizedNotifications?.length !== 0 && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                <PaginationDropdown
                  onChange={(val) => {
                    setListPerPages(Number(val));
                    setCurrentPage(0);
                  }}
                />
              </div>
              <div>
                <ReactPagination
                  pageCount={Math.ceil(
                    normalizedNotifications?.length / listPerPages,
                  )}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <DeleteModal
        isViewModal={isDeleteModalOpen}
        setIsViewModal={setIsDeleteModalOpen}
        heading={isDeleteAll ? "Delete All Notifications" : "Delete Notification"}
        value={
          isDeleteAll
            ? "Are you sure you want to delete all notifications?"
            : "Are you sure you want to delete this notification?"
        }
        handleDelete={handleDeleteNotification}
      />
    </PanelLayout>
  );
};

export default Notification;
