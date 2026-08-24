import { useEffect } from "react";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../../shared/layout/PanelLayout";
import KYC from "../../../shared/components/pages/kyc varification";
import {
  userBusinessKycSchema,
} from "../../../shared/utils/schema";
import {
  fetchBusinessRegistrationTypes,
  fetchDocTypes,
  fetchGovernmentIdTypes,
  fetchProofOfAddressTypes,
  getUserKYCDocumentData,
} from "../../../redux/features/business/actions/managementAction";

const KycUpload = () => {
  const dispatch = useDispatch();
  const user = { name: "KYC Verification", role: "guestBusiness" };

  const { isLoading } = useSelector(
    (state) => state.business.management
  );


  useEffect(() => {
    dispatch(fetchDocTypes());
    dispatch(getUserKYCDocumentData());
    dispatch(fetchGovernmentIdTypes());
    dispatch(fetchProofOfAddressTypes());
    dispatch(fetchBusinessRegistrationTypes());
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout user={user}>
      <KYC kycSchema={userBusinessKycSchema} />
    </PanelLayout>
  );
};

export default KycUpload;
