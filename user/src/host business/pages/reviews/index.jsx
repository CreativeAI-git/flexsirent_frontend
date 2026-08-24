import PanelLayout from "../../../shared/layout/PanelLayout";
import ReviewManagementTable from "../../../shared/components/reviews/ReviewManagementTable";

const Reviews = () => {
  const user = { name: "Reviews", role: "hostBusiness" };

  return (
    <PanelLayout user={user}>
      <div className="row mt-5">
        <div className="col-md-12">
          <ReviewManagementTable />
        </div>
      </div>
    </PanelLayout>
  );
};

export default Reviews;
