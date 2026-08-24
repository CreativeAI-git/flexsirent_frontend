import NotificationCenter from "../../../shared/components/notifications/NotificationCenter";
import {
  deleteUserNotificationAPI,
  fetchUserNotificationsAPI,
} from "../../../shared/routes/apiURLs";

const Notifications = () => {
  const user = { name: "Notifications", role: "guestBusiness" };

  return (
    <NotificationCenter
      user={user}
      apiRole="guest-business"
      fetchUrl={fetchUserNotificationsAPI}
      deleteUrl={deleteUserNotificationAPI}
    />
  );
};

export default Notifications;
