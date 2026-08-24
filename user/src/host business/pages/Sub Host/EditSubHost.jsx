import SubHostFormPage from "../../../shared/pages/subHost/SubHostFormPage";
import { hostBusinessPaths } from "../../routes";

const EditSubHost = () => {
  return (
    <SubHostFormPage
      mode="edit"
      panelRole="hostBusiness"
      routes={hostBusinessPaths}
    />
  );
};

export default EditSubHost;
