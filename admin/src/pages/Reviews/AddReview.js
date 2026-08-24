import { useEffect } from "react";
import { useNavigate } from "react-router";
import Loader from "../../components/form/Loader";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import ReviewForm from "../../components/pages/Reviews/ReviewForm";
import {
  createReview,
  fetchPropertyForReview,
} from "../../redux/actions/serviceFeeAction";
const AddReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state?.serviceFeeReducers);
  const initialValues = {
    rating: "",
    review: "",
    first_name: "",
    last_name: "",
    property_id: "",
    file: null,

  };

  useEffect(() => {
    dispatch(fetchPropertyForReview());
  }, []);

  const handleCreate = (values) => {
     const formData = new FormData();

  formData.append("rating", values.rating);
  formData.append("review", values.review);
  formData.append("first_name", values.first_name);
  formData.append("last_name", values.last_name);
  formData.append("property_id", values.property_id);

  if (values.file) {
    formData.append("file", values.file);
  }
    dispatch(
      createReview({
        payload: formData,
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
      <SubHeader label="Add Review" />
      <ReviewForm initialValues={initialValues} onSubmit={handleCreate} />
    </PanelLayout>
  );
};

export default AddReview;
