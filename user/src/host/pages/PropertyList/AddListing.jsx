import { hostRoutes } from "../../routes";
import { useLocation } from "react-router";
import PanelLayout from "../../../shared/layout/PanelLayout";
import { hostBusinessPaths } from "../../../host business/routes";
import AddListingData from "../../../shared/components/pages/property/AddListingData";

const AddListing = () => {
  const { pathname } = useLocation();
    const isHost = !pathname.includes("/host-business");
  const user = { name: "Add Listings", role: isHost ? "host" : "hostBusiness" };
  return (
    <PanelLayout user={user}>
      <AddListingData redirectURL={isHost ? hostRoutes?.Property : hostBusinessPaths?.Property} role={"host"}/>
    </PanelLayout>
  );
};

export default AddListing;
