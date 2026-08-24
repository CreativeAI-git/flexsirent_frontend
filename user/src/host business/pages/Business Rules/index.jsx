import { useEffect } from "react";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../../shared/layout/PanelLayout";
import { getAllPolicyData } from "../../../redux/features/user/actions/authAction";
import ContentManagement from "../../../shared/components/pages/content management";

const BusinessRules = () => {
  const dispatch = useDispatch();
  const user = { name: "Business Rules", role: "hostBusiness" };
  const { isLoading } = useSelector((state) => state.guest.auth);

  useEffect(() => {
    dispatch(getAllPolicyData({ payload: 4 }));
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout user={user}>
      <ContentManagement />
    </PanelLayout>
  );
};

export default BusinessRules;
