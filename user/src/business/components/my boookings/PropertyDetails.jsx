import PanelLayout from '../../../shared/layout/PanelLayout'
import PropertyDetails from '../../../shared/components/pages/property/PropertyDetails'
import { useLocation } from 'react-router';

const BusinessPropertyDetails = () => {
  const data = useLocation()?.state?.data || {}
  const user = { name: "Property Details", role: "guestBusiness" };
  return (
       <PanelLayout user={user}>
            <PropertyDetails data={data}/>
        </PanelLayout>
  )
}

export default BusinessPropertyDetails
