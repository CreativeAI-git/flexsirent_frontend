import { useEffect } from "react";
import Loader from "../../components/loader";
import PanelLayout from "../../layout/PanelLayout";
import { useDispatch, useSelector } from "react-redux";
import ContentManagement from "../../components/pages/content management";
import { getAllPolicyData } from "../../../redux/features/user/actions/authAction";

const PanelCancellationPolicyPage = ({ panelRole }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.guest.auth);
  const user = { name: "Cancellation Policy", role: panelRole };

  useEffect(() => {
    dispatch(getAllPolicyData({ payload: 3 }));
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <ContentManagement />
    </PanelLayout>
  );
};

export default PanelCancellationPolicyPage;
