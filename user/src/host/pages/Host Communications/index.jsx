import { ChatModule } from "../../../shared/modules/chat";
import PanelLayout from "../../../shared/layout/PanelLayout";
import ViewProfile from "../../../shared/components/pages/chat management/ViewProfile";
import CheckInInstruction from "../../../shared/components/pages/chat management/CheckInInstruction";

const HostCommunications = () => {
  const user = { name: "Communication", role: "host" };

  return (
    <PanelLayout user={user}>
      <div className="tab-content pt-4" id="pills-tabContent">
        <div
          className="tab-pane fade active show"
          id="pills-User"
          role="tabpanel"
          aria-labelledby="pills-User-tab"
        >
             <ChatModule scope="host" panelRole="host" roomId="host-room" />
        </div>
      </div>

      {/* Modal profile view*/}
      <ViewProfile />
      {/* Modal */}
      <CheckInInstruction />
    </PanelLayout>
  );
};

export default HostCommunications;
