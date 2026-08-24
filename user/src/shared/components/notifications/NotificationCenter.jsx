import Loader from "../loader";
import NoRecord from "../other/NoRecord";
import PanelLayout from "../../layout/PanelLayout";
import { useEffect, useMemo, useState } from "react";
import { API_REQUEST } from "../../../redux/features";
import ReactPagination from "../table/ReactPagination";
import PaginationDropdown from "../table/PaginationDropdown";
import { pip_TimeAgo, pipViewDateTime } from "../../utils/pip";
import DeleteModal from "../../../host/components/modals/DeleteModal";

const NotificationCenter = ({ user, apiRole, fetchUrl, deleteUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [notifications, setNotifications] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [isDeleteAll, setIsDeleteAll] = useState(false);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await API_REQUEST({
        url: fetchUrl,
        method: "GET",
        loggedInRole: apiRole,
      });
      const data = Array.isArray(response?.data)
        ? response.data
        : response?.data?.notifications || [];
      setNotifications(data);
    } finally {
      setIsLoading(false);
    }
  };

  const normalizedNotifications = useMemo(
    () =>
      (notifications || []).map((item) => ({
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
        notificationId: item?.notification_id || item?.id,
      })),
    [notifications],
  );

  const paginatedList = normalizedNotifications.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages,
  );

  const openDeleteModal = (notificationId = null) => {
    setSelectedNotificationId(notificationId);
    setIsDeleteAll(!notificationId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteNotification = async () => {
    const payload = selectedNotificationId
      ? { notification_id: selectedNotificationId }
      : {};

    try {
      setIsLoading(true);
      const response = await API_REQUEST({
        url: deleteUrl,
        method: "POST",
        data: payload,
        loggedInRole: apiRole,
      });

      if (response?.success) {
        setCurrentPage(0);
        setSelectedNotificationId(null);
        setIsDeleteAll(false);
        await loadNotifications();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [apiRole, fetchUrl]);

  if (isLoading) return <Loader />;

  return (
    <PanelLayout user={user}>
      <div className="row">
        <div className="col-md-12">
          
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
                  key={item?.notificationId || index}
                  className="d-flex align-items-center gap-4 justify-content-between"
                >
                  <div className="d-flex align-items-center gap-3 justify-content-between ct_flex_1">
                    <div>
                      <h5 className="ct_fs_18 ct_fw_600 mb-1">
                        {item?.title}
                      </h5>
                      <p className="mb-0 ct_text_op_6">{item?.message}</p>
                    </div>
                    <div className="text-end">
                      <p className="mb-0 ct_white_nowrap">
                        {item?.createdAt ? pip_TimeAgo(item?.createdAt) : "#N/A"}
                      </p>
                      <small className="ct_text_op_6">
                        {item?.createdAt
                          ? pipViewDateTime(item?.createdAt)
                          : ""}
                      </small>
                    </div>
                  </div>
                  <div onClick={() => openDeleteModal(item?.notificationId)}>
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
                  onPageChange={(data) => setCurrentPage(data?.selected)}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <DeleteModal
        value={isDeleteAll ? "Delete All Notifications" : "Delete Notification"}
        heading={
          isDeleteAll
            ? "Are you sure you want to delete all notifications?"
            : "Are you sure you want to delete this notification?"
        }
        body={
          isDeleteAll
            ? "This action will remove all notifications from your account."
            : "This action will remove the selected notification from your account."
        }
        isViewModal={isDeleteModalOpen}
        handleDelete={handleDeleteNotification}
        setIsViewModal={setIsDeleteModalOpen}
      />
    </PanelLayout>
  );
};

export default NotificationCenter;
