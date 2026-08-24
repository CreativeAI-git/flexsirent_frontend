import { hostBusinessPaths } from "../../routes";
import PanelLayout from "../../../shared/layout/PanelLayout";
import AddListingData from "../../../shared/components/pages/property/AddListingData";

const AddListing = () => {
  const user = { name: "Add Listings", role: "hostBusiness" };
  return (
    <PanelLayout user={user}>
      <AddListingData redirectURL={hostBusinessPaths?.Property} />
    </PanelLayout>
  );
};

export default AddListing;
