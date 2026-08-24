import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../shared/components/loader";
import { userKycSchema } from "../../../shared/utils/schema";
import PanelLayout from "../../../shared/layout/PanelLayout";
import KYC from "../../../shared/components/pages/kyc varification";
import { fetchDocTypes, fetchGovernmentIdTypes, fetchProofOfAddressTypes, getUserKYCDocumentData } from "../../../redux/features/business/actions/managementAction";
const KYCVerification = () => {
  const user = { name: "KYC Verification", role: "guest" };
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => state.business.management
  );


  useEffect(() => {
    dispatch(fetchDocTypes());
    dispatch(getUserKYCDocumentData());
    dispatch(fetchGovernmentIdTypes())
    dispatch(fetchProofOfAddressTypes())
  }, []);


  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <KYC kycSchema={userKycSchema}/>
    </PanelLayout>
  );
};

export default KYCVerification;
