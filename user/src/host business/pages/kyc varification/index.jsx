import KYC from "../../../shared/components/pages/kyc varification";
import PanelLayout from "../../../shared/layout/PanelLayout";

const KYCVerification = () => {
  const user = { name: "KYC Verification", role: "hostBusiness" };

  return (
    <PanelLayout user={user}>
      <KYC />
    </PanelLayout>
  );
};

export default KYCVerification;
