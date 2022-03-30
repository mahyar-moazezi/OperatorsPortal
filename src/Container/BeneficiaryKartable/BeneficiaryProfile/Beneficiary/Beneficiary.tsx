import { Divider, Row } from "antd";
import AddBeneficiaryAgent from "./AddBeneficiaryAgent/AddBeneficiaryAgent";
import Button from "antd-button-color";
import CModal from "../../../../Components/UI/Modal/CModal";
import { lazy, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import BeneficiaryDetails from "./BeneficiaryDetails/BeneficiaryDetails";
import { useQuery, useQueryClient } from "react-query";
import { getProfileUnitClass } from "../../../../Requests/BeneficiaryKartable/BeneficiaryProfile/Beneficiary/Beneficiary";
import CSkeleton from "../../../../Components/UI/Skeleton/CSkeleton";
const BeneficiaryForm = lazy(() => import("./BeneficiaryForm/BeneficiaryForm"));
const Beneficiary = () => {
  const queryClient = useQueryClient();
  const userBeneficiaryUnit: any = queryClient.getQueryData(
    "getUserBeneficiaryUnit"
  );
  const { data: beneficiaryProfileData, isFetching: beneficiaryProfileDataLoading } =
    useQuery(
      "getProfileUnitClass",
      () => getProfileUnitClass(userBeneficiaryUnit[0]?.Id),
      {
        refetchOnWindowFocus: false,
      }
    ); //دریافت اطلاعات بهره بردار
  const [modalVisibility, setModalVisibility] = useState(false);
  const closeModal = () => {
    setModalVisibility(false);
  };
  return (
    <>
      <div className="bg-lightBlue  pt-3 px-3 pb-2">
        <CSkeleton loading={beneficiaryProfileDataLoading}>
          <BeneficiaryDetails
            beneficiaryProfileData={
              beneficiaryProfileData && beneficiaryProfileData[0]
            }
          />
          <Divider />
          <Row justify="end">
            <Button
              type={"warning"}
              onClick={() => setModalVisibility(true)}
              icon={<EditOutlined className="text-white" />}
            >
              <span className="mx-2">ویرایش</span>
            </Button>
          </Row>
        </CSkeleton>
      </div>
      <CModal
        title={"مشخصات بهره‌بردار"}
        closable={false}
        visible={modalVisibility}
        width={900}
        destroyOnClose={true}
        footer={null}
      >
        <BeneficiaryForm
          closeModal={closeModal}
          userBeneficiaryUnit={userBeneficiaryUnit && userBeneficiaryUnit[0]}
        />
      </CModal>

      <div className="bg-lightBlue my-2 pt-1 pb-1 px-3">
        <AddBeneficiaryAgent />
      </div>
    </>
  );
};

export default Beneficiary;
