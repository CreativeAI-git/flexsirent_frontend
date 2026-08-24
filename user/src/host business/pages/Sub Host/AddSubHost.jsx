import SubHostFormPage from "../../../shared/pages/subHost/SubHostFormPage";
import { hostBusinessPaths } from "../../routes";

const AddSubHost = () => {
  return (
    <SubHostFormPage
      mode="add"
      panelRole="hostBusiness"
      routes={hostBusinessPaths}
    />
  );
};

export default AddSubHost;
