import { useSelector } from "react-redux";
import Loader from "../../../shared/components/loader";
import { ChatModule } from "../../../shared/modules/chat";
import PanelLayout from "../../../shared/layout/PanelLayout";

const GuestCommunications = () => {
  const { isLoading } = useSelector((state) => state.guest.inbox);
  const user = { name: "Communication", role: "guest" };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="tab-content pt-4" id="pills-tabContent">
        <div
          className="tab-pane fade active show"
          id="pills-User"
          role="tabpanel"
          aria-labelledby="pills-User-tab"
        >
          <ChatModule scope="guest" panelRole="guest" roomId="guest-room" />
        </div>
      </div>
    </PanelLayout>
  );
};

export default GuestCommunications;
