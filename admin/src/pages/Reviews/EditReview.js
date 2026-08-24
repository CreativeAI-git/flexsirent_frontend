import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import Loader from "../../components/form/Loader";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import ReviewForm from "../../components/pages/Reviews/ReviewForm";
import {
  updateReview,
  fetchPropertyForReview,
} from "../../redux/actions/serviceFeeAction";
const EditReview = () => {
  const reviewData = useLocation()?.state?.data || {};
  console.log({ reviewData });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state?.serviceFeeReducers);
  const initialValues = {
    rating: reviewData?.rating || "",
    review: reviewData?.review || "",
    first_name: reviewData?.user_first_name || "",
    last_name: reviewData?.user_last_name || "",
    property_id: reviewData?.property_id || "",
    rating_id: reviewData?.rating_id || "",
  };

  useEffect(() => {
    dispatch(fetchPropertyForReview());
  }, []);

  const handleCreate = (values) => {
    dispatch(
      updateReview({
        payload: values,
        callback: (res) => {
          if (res?.success) navigate(-1);
        },
      }),
    );
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout>
      <SubHeader label="Edit Review" />
      <ReviewForm initialValues={initialValues} onSubmit={handleCreate} />
    </PanelLayout>
  );
};

export default EditReview;
