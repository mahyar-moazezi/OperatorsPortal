import { Divider, Row } from "antd";
import Button from "antd-button-color";
import CModal from "../../../../Components/UI/Modal/CModal";
import { EditOutlined } from "@ant-design/icons";
import { lazy, useState } from "react";
import OwnerDetails from "./OwnerDetails/OwnerDetails";
import { useQuery, useQueryClient } from "react-query";
import {
  getOwnerDocuments,
  getOwnerProfile,
} from "../../../../Requests/BeneficiaryKartable/BeneficiaryProfile/Owner/Owner";
import CSkeleton from "../../../../Components/UI/Skeleton/CSkeleton";
import { sortOnId } from "../../../../Utils/Sorter/Sorter";
const OwnerForm = lazy(() => import("./OwnerForm/OwnerForm"));
const Owner = () => {
  const queryClient = useQueryClient();
  const userBeneficiaryUnit: any = queryClient.getQueryData(
    "getUserBeneficiaryUnit"
  );

  const { data: ownerProfileData, isFetching: ownerProfileDataLoading } = useQuery(
    "getOwnerProfile",
    () => getOwnerProfile(userBeneficiaryUnit[0]?.Id),
    {
      select: (data) => {
        return sortOnId(data);
      },

      refetchOnWindowFocus: false,
    }
  ); //دریافت اطلاعات مالک

  const [modalVisibility, setModalVisibility] = useState(false);
  const closeModal = () => {
    setModalVisibility(false);
  };

  return (
    <>
      <div className="bg-lightBlue my-1 pt-3 px-3 pb-2">
        <CSkeleton loading={ownerProfileDataLoading}>
          {ownerProfileData !== undefined ? (
            <OwnerDetails
              ownerProfileData={ownerProfileData && ownerProfileData[0]}
            />
          ) : null}

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
        title={"مشخصات مالک"}
        closable={false}
        visible={modalVisibility}
        width={900}
        destroyOnClose={true}
        footer={null}
      >
        <OwnerForm
          closeModal={closeModal}
          userBeneficiaryUnit={userBeneficiaryUnit && userBeneficiaryUnit[0]}
        />
      </CModal>{" "}
    </>
  );
};

export default Owner;
