import { useLocation } from "react-router";
import PanelLayout from "../../../shared/layout/PanelLayout";
import PropertyDetails from "../../../shared/components/pages/property/PropertyDetails";


const PropertyData = () => {
  const data = useLocation()?.state?.data || {}
  const user = { name: "Property Details", role: "guest" };
  return (
    <PanelLayout user={user}>
      <div className="row mt-5">
        <PropertyDetails data={data} />
      </div>
    </PanelLayout>
  );
};

export default PropertyData;
