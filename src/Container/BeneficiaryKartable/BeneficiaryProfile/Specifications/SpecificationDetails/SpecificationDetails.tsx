import { Descriptions } from "antd";

type SpecificationDetailsTypes = {
  userBeneficiaryUnit: any;
};
const SpecificationDetails = ({
  userBeneficiaryUnit,
}: SpecificationDetailsTypes) => {
  return (
    <>
      <Descriptions
        layout="horizontal"
        size="small"
        labelStyle={{ fontWeight: "bold" }}
      >
        <Descriptions.Item label={"نام"}>
          {userBeneficiaryUnit?.Name}
        </Descriptions.Item>
        <Descriptions.Item label={"نام خانوادگی"}>
          {userBeneficiaryUnit?.Lastname}
        </Descriptions.Item>
        <Descriptions.Item label={"کد ملی"}>
          {userBeneficiaryUnit?.NationalCode}
        </Descriptions.Item>
        <Descriptions.Item label={"شماره همراه"}>
          {userBeneficiaryUnit?.Mobile}
        </Descriptions.Item>
        <Descriptions.Item label={"تلفن"}>
          {userBeneficiaryUnit?.Tel}
        </Descriptions.Item>
        <Descriptions.Item label={"ایمیل"}>
          {userBeneficiaryUnit?.Email}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default SpecificationDetails;
