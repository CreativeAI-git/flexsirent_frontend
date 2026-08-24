import PanelLayout from "../../../shared/layout/PanelLayout";
import { ChatModule } from "../../../shared/modules/chat";

const GuestCommunications = () => {
  const user = { name: "Communication", role: "guestBusiness" };

  return (
    <PanelLayout user={user}>
      <div className="tab-content pt-4" id="pills-tabContent">
        <div
          className="tab-pane fade active show"
          id="pills-User"
          role="tabpanel"
          aria-labelledby="pills-User-tab"
        >
          <ChatModule
            scope="guest-business"
            panelRole="guestBusiness"
            roomId="guest-business-room"
          />
        </div>
      </div>
    </PanelLayout>
  );
};

export default GuestCommunications;
