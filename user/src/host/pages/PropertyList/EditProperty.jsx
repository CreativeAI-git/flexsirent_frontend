import PanelLayout from "../../../shared/layout/PanelLayout";
import EditListingData from "../../../shared/components/pages/property/EditListingData";
import { useLocation } from "react-router";
import { hostRoutes } from "../../routes";
import { hostBusinessPaths } from "../../../host business/routes";

const EditProperty = () => {
  const { pathname } = useLocation();
  const propertyDetails = useLocation()?.state?.data || {}
   const isHost = !pathname.includes("/host-business");
  const user = { name: "Edit Property", role: isHost ? "host" : "hostBusiness" };

  return (
    <PanelLayout user={user}>
      <EditListingData data={propertyDetails} role={user?.role} redirectURL={isHost ? hostRoutes?.Property : hostBusinessPaths?.Property}/>
    </PanelLayout>
  );
};

export default EditProperty;
