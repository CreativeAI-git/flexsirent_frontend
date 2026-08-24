import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";
import ChatModule from "../../shared/modules/chat/ChatModule";

const ChatManagement = () => {
  return (
    <PanelLayout>
      <SubHeader label="Chat Management" />
      <div className="pt-4">
        <ChatModule scope="admin" roomId="admin-room" />
      </div>
    </PanelLayout>
  );
};

export default ChatManagement;
