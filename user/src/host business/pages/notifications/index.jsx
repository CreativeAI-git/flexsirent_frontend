import NotificationCenter from "../../../shared/components/notifications/NotificationCenter";
import {
  deleteHostNotificationAPI,
  fetchHostNotificationsAPI,
} from "../../../shared/routes/apiURLs";

const Notifications = () => {
  const user = { name: "Notifications", role: "hostBusiness" };

  return (
    <NotificationCenter
      user={user}
      apiRole="host-business"
      fetchUrl={fetchHostNotificationsAPI}
      deleteUrl={deleteHostNotificationAPI}
    />
  );
};

export default Notifications;
