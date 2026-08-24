import { useLocation } from "react-router";
import PropertyDetails from "../../../shared/components/pages/property/PropertyDetails";
import PanelLayout from "../../../shared/layout/PanelLayout";

const BookingPropertyDetail = () => {
    const data = useLocation()?.state?.data || {}
  const user = { name: "Property Details", role: "hostBusiness" };
  return (
       <PanelLayout user={user}>
            <PropertyDetails data={data} />
        </PanelLayout>
  )
}

export default BookingPropertyDetail
