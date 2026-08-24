import { useLocation } from "react-router";
import PanelLayout from "../../../shared/layout/PanelLayout";
import PropertyDetails from "../../../shared/components/pages/property/PropertyDetails";

const ListingDetails = () => {
  const { pathname } = useLocation();
  const propertyDetails = useLocation()?.state?.data || {};
  const isHost = !pathname.includes("/host-business");
  const user = { name: "Property Details", role: isHost ? "host" : "hostBusiness" };

  return (
    <PanelLayout user={user}>
      <PropertyDetails data={propertyDetails}/>
    </PanelLayout>
  );
};

export default ListingDetails;
