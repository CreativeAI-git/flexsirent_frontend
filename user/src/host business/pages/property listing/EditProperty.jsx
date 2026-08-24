import PanelLayout from "../../../shared/layout/PanelLayout";
import EditListingData from "../../../shared/components/pages/property/EditListingData";

const EditProperty = () => {
  const user = { name: "Edit Property", role: "hostBusiness" };

  return (
    <PanelLayout user={user}>
      <EditListingData />
    </PanelLayout>
  );
};

export default EditProperty;
