import PanelLayout from '../../../shared/layout/PanelLayout';
import PropertyDetails from '../../../shared/components/pages/property/PropertyDetails';

const ListingDetails = () => {
    const user = { name: "Property Details", role: "hostBusiness" };

    return (
        <PanelLayout user={user}>
            <PropertyDetails />
        </PanelLayout>
    )
};

export default ListingDetails;