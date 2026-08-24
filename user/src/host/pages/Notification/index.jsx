import NotificationCenter from "../../../shared/components/notifications/NotificationCenter";
import {
  deleteHostNotificationAPI,
  fetchHostNotificationsAPI,
} from "../../../shared/routes/apiURLs";

const Notification = () => {
  const user = { name: "Notification", role: "host" };

  return (
    <NotificationCenter
      user={user}
      apiRole="host"
      fetchUrl={fetchHostNotificationsAPI}
      deleteUrl={deleteHostNotificationAPI}
    />
  );
};

export default Notification;
