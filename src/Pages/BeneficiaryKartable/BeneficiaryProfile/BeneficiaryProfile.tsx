import CDivider from "../../../Components/UI/Divider/CDivider";
import { BeneficiaryProfileTypes } from "./BeneficiaryProfile.types";
import BeneficiaryProfileForm from "../../../Container/BeneficiaryKartable/BeneficiaryProfile/BeneficiaryProfileForm";

const BeneficiaryProfile = ({ title }: BeneficiaryProfileTypes) => {
  return (
    <>
      <CDivider title={title} />
      <BeneficiaryProfileForm />
    </>
  );
};

export default BeneficiaryProfile;
