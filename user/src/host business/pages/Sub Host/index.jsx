import SubHostManagementPage from "../../../shared/pages/subHost/SubHostManagementPage";
import { hostBusinessPaths } from "../../routes";

const SubHostManagement = () => {
  return (
    <SubHostManagementPage
      panelRole="hostBusiness"
      routes={hostBusinessPaths}
    />
  );
};

export default SubHostManagement;
