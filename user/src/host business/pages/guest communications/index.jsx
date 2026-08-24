import { ChatModule } from "../../../shared/modules/chat";
import PanelLayout from "../../../shared/layout/PanelLayout";

const GuestCommunications = () => {
  const user = { name: "Communication", role: "hostBusiness" };

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
            scope="host-business"
            panelRole="hostBusiness"
            roomId="host-business-room"
          />
        </div>
      </div>
    </PanelLayout>
  );
};

export default GuestCommunications;
