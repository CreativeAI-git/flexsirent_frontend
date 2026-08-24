import SubHostFormPage from "../../../shared/pages/subHost/SubHostFormPage";
import { hostRoutes } from "../../routes";

const EditSubHost = () => {
  return <SubHostFormPage mode="edit" panelRole="host" routes={hostRoutes} />;
};

export default EditSubHost;
