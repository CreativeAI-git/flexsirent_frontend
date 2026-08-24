import NotificationCenter from "../../../shared/components/notifications/NotificationCenter";
import {
  deleteUserNotificationAPI,
  fetchUserNotificationsAPI,
} from "../../../shared/routes/apiURLs";

const Notifications = () => {
  const user = { name: "Notifications", role: "guest" };

  return (
    <NotificationCenter
      user={user}
      apiRole="guest"
      fetchUrl={fetchUserNotificationsAPI}
      deleteUrl={deleteUserNotificationAPI}
    />
  );
};

export default Notifications;
