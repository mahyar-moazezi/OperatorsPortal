import { Divider, Row } from "antd";
import CModal from "../../../../Components/UI/Modal/CModal";
import Button from "antd-button-color";
import { EditOutlined } from "@ant-design/icons";
import { lazy, useState } from "react";
import SpecificationDetails from "./SpecificationDetails/SpecificationDetails";
import { useQueryClient } from "react-query";
import CAlert from "../../../../Components/UI/Alert/CAlert";
import { messages } from "../../../../Utils/AlertMessage/AlertMessage";
const SpecificationForm = lazy(
  () => import("./SpecificationForm/SpecificationForm")
);
const Specifications = () => {
  const queryClient = useQueryClient();
  const userBeneficiaryUnit: any = queryClient.getQueryData(
    "getUserBeneficiaryUnit"
  );
  const [modalVisibility, setModalVisibility] = useState(false);
  const closeModal = () => {
    setModalVisibility(false);
  };
  return (
    <>
      <div className="bg-lightBlue my-2 pt-3 px-3 pb-2">
        <SpecificationDetails
          userBeneficiaryUnit={userBeneficiaryUnit && userBeneficiaryUnit[0]}
        />
        <Divider />
        <Row justify="space-between" align="middle">
          {userBeneficiaryUnit && !userBeneficiaryUnit[0].Specification_Check ? (
            <CAlert message={messages.inProgress} type={"info"} />
          ) : (
            <div></div>
          )}
          <Button
            disabled={
              userBeneficiaryUnit && !userBeneficiaryUnit[0].Specification_Check
            }
            type={"warning"}
            onClick={() => setModalVisibility(true)}
            icon={<EditOutlined className="text-white" />}
          >
            <span className="mx-2">ویرایش</span>
          </Button>
        </Row>
      </div>
      <CModal
        title={"مشخصات"}
        closable={false}
        visible={modalVisibility}
        width={900}
        destroyOnClose={true}
        footer={null}
      >
        <SpecificationForm
          closeModal={closeModal}
          userBeneficiaryUnit={userBeneficiaryUnit}
        />
      </CModal>{" "}
    </>
  );
};

export default Specifications;
