import SubHostFormPage from "../../../shared/pages/subHost/SubHostFormPage";
import { hostRoutes } from "../../routes";

const AddSubHost = () => {
  return <SubHostFormPage mode="add" panelRole="host" routes={hostRoutes} />;
};

export default AddSubHost;
