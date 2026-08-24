import SubHostManagementPage from "../../../shared/pages/subHost/SubHostManagementPage";
import { hostRoutes } from "../../routes";

const SubHostManagement = () => {
  return <SubHostManagementPage panelRole="host" routes={hostRoutes} />;
};

export default SubHostManagement;
