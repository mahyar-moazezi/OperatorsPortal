import { Popover, Row } from "antd";
import { lazy, useMemo } from "react";
import Button from "antd-button-color";
import CTable from "../../../../../Components/UI/Table/CTable";
import {
  CheckCircleOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { CPopConfirm } from "../../../../../Components/UI/PopConfirm/CPopConfirm";
import { useRecoilState } from "recoil";
import { modalOpener } from "../../../../../Store/Atoms/Atoms";
import CModal from "../../../../../Components/UI/Modal/CModal";
import CDivider from "../../../../../Components/UI/Divider/CDivider";
import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  activeBeneficiaryAgent,
  deactiveBeneficiaryAgent,
  getBeneficiaryAgentInfo,
} from "../../../../../Requests/BeneficiaryKartable/BeneficiaryProfile/Beneficiary/Beneficiary";
import DetailView from "./DetailView/DetailView";
import {
  onErrorMessage,
  onSuccessMessage,
} from "../../../../../Utils/AlertMessage/AlertMessage";
import { addProfileLog } from "../../../../../Requests/RegisterLog/RegisterLog";
import { genLookupId } from "../../../../../Utils/GenLookup/GenLookup";
const AddBeneficiaryAgentForm = lazy(
  () => import("./AddBeneficiaryAgentForm/AddBeneficiaryAgentForm")
);
export const CheckStatusBtn = ({ title }: any) => {
  return (
    <Button className="m-1 xl:m-0" type={"primary"} size={"middle"}>
      {title}
    </Button>
  );
};
const AddBeneficiaryAgent = () => {
  const queryClient = useQueryClient();
  const userInfo: any = queryClient.getQueryData("getCurrentUser");
  const [modalOpenerValue, setModalOpenerValue] = useRecoilState(modalOpener);
  const userBeneficiaryUnit: any = queryClient.getQueryData(
    "getUserBeneficiaryUnit"
  );
  const { data: beneficiaryAgentData, isFetching: beneficiaryAgentLoading } =
    useQuery(
      "getBeneficiaryAgentInfo",
      () => getBeneficiaryAgentInfo(userBeneficiaryUnit[0]?.Id),
      {
        select: (data) => {
          const result = data?.map(
            (item: any) =>
              ({
                id: item?.Id,
                businessUnitName: item?.Beneficiary_Unit?.Title,
                businessUnitNameId: item?.Beneficiary_UnitId,
                name: item?.Name,
                lastname: item?.Lastname,
                nationalCode: item?.NationalCode,
                mobile: item?.Mobile,
                tel: item?.Tel,
                email: item?.Email,
                permission: item?.Permission?.map((i: any) => i.Title),
                permissionId: item?.PermissionId,
                isActive: item?.IsActive,
                userIsActive: item?.User_IsActive,
                statusId: item?.StatusId,
              } ?? [])
          ) as any;
          return result;
        },
        refetchOnWindowFocus: false,
      }
    ); //دریافت اطلاعات واحد های تجاری
  // ---------------فعال سازی و غیر فعال سازی-------------
  const { mutate: deactiveMutation, isLoading: deactiveMutationLoading } =
    useMutation((item: any) => deactiveBeneficiaryAgent(item), {
      onSettled: () => {
        const logValue: any = {
          Beneficiary_UnitId: userBeneficiaryUnit?.Id,
          StatusId: genLookupId.inProgress,
          User_IdId: userInfo?.Id,
          Date: new Date().toISOString(),
          Description: null,
          Edit_Item: "غیر فعال سازی نماینده بهره بردار",
        };
        addProfileLog(logValue);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("getBeneficiaryAgentInfo");
        onSuccessMessage();
      },
      onError: () => {
        onErrorMessage("deactiveBeneficiaryAgent");
      },
    }); //غیر فعال سازی نماینده بهره بردار

  const { mutate: activeMutation, isLoading: activeMutationLoading } = useMutation(
    (item: any) => activeBeneficiaryAgent(item),
    {
      onSettled: () => {
        const logValue: any = {
          Beneficiary_UnitId: userBeneficiaryUnit?.Id,
          StatusId: genLookupId.inProgress,
          User_IdId: userInfo?.Id,
          Date: new Date().toISOString(),
          Description: null,
          Edit_Item: "فعال سازی نماینده بهره بردار",
        };
        addProfileLog(logValue);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("getBeneficiaryAgentInfo");
        onSuccessMessage();
      },
      onError: () => {
        onErrorMessage("activeBeneficiaryAgent");
      },
    }
  ); //فعال سازی نماینده بهره بردار

  // ----------
  const columns = useMemo(
    () => [
      {
        title: "#",
        dataIndex: "row",
        key: "row",
        width: "3%",
        align: "center",
        render: (row: any, item: any, index: any) => index + 1,
      },

      {
        title: "نام",
        dataIndex: "name",
        key: "name",
        width: "15%",
        align: "center",
        sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      },
      {
        title: "نام خانوادگی",
        dataIndex: "lastname",
        key: "lastname",
        width: "27%",
        align: "center",
        sorter: (a: any, b: any) => a.lastname.localeCompare(b.lastname),
      },
      {
        title: "تلفن همراه",
        dataIndex: "mobile",
        key: "mobile",
        width: "20%",
        align: "center",
        sorter: (a: any, b: any) => a.mobile.localeCompare(b.mobile),
      },
      {
        title: "کد ملی",
        dataIndex: "nationalCode",
        key: "nationalCode",
        width: "25%",
        align: "center",
        sorter: (a: any, b: any) => a.nationalCode.localeCompare(b.nationalCode),
      },

      {
        title: "عملیات",
        dataIndex: "action",
        key: "action",
        width: "10%",
        align: "center",
        render: (row: any, item: any, index: any) => (
          <div>
            {item.isActive ? (
              <Row justify={"space-between"}>
                <Popover content={"ویرایش"}>
                  <Button
                    shape={"circle"}
                    className="m-1 xl:m-0"
                    type={"warning"}
                    size={"middle"}
                    onClick={() =>
                      setModalOpenerValue({
                        isOpen: true,
                        type: "EDIT_ITEM",
                        data: item,
                      })
                    }
                    icon={<EditOutlined className="text-white mx-1" />}
                  >
                    {/* ویرایش */}
                  </Button>
                </Popover>
                {item?.userIsActive ? (
                  <CPopConfirm
                    title={"برای غیر فعال سازی اطمینان دارید؟"}
                    okText={"بله"}
                    cancelText={"خیر"}
                    okType={"danger"}
                    onConfirm={() => deactiveMutation(item)}
                  >
                    <Popover content={"غیرفعال سازی"}>
                      <Button
                        shape={"circle"}
                        className="m-1 xl:m-0"
                        type={"danger"}
                        size={"middle"}
                        icon={<StopOutlined className="text-white mx-1" />}
                        // style={{ minWidth: "130px" }}
                      >
                        {/* غیر فعال سازی */}
                      </Button>
                    </Popover>
                  </CPopConfirm>
                ) : (
                  <CPopConfirm
                    title={"برای فعال سازی اطمینان دارید؟"}
                    okText={"بله"}
                    cancelText={"خیر"}
                    okType={"success"}
                    onConfirm={() => activeMutation(item)}
                  >
                    <Popover content={"فعال سازی"}>
                      <Button
                        shape={"circle"}
                        className="m-1 xl:m-0"
                        type={"success"}
                        size={"middle"}
                        icon={<CheckCircleOutlined className="text-white mx-1" />}
                        // style={{ minWidth: "130px" }}
                      >
                        {/* فعال سازی */}
                      </Button>
                    </Popover>
                  </CPopConfirm>
                )}
                <Popover content={"جزییات"}>
                  <Button
                    shape={"circle"}
                    className="m-1 xl:m-0"
                    type={"info"}
                    size={"middle"}
                    onClick={() =>
                      setModalOpenerValue({
                        isOpen: true,
                        type: "SHOW_ITEM",
                        data: item,
                      })
                    }
                    icon={<EyeOutlined className="text-white mx-1" />}
                  >
                    {/* جزییات */}
                  </Button>
                </Popover>
              </Row>
            ) : (
              <CheckStatusBtn title={"در حال بررسی"} />
            )}
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const decriptionItems: { label: string; value: any }[] = useMemo(
    () => [
      { label: "نام", value: modalOpenerValue?.data?.name },
      { label: "نام خانوادگی", value: modalOpenerValue?.data?.lastname },
      { label: "تلفن همراه", value: modalOpenerValue?.data?.mobile },
      { label: "کد ملی", value: modalOpenerValue?.data?.nationalCode },
      { label: "تلفن", value: modalOpenerValue?.data?.tel },
      { label: "ایمیل", value: modalOpenerValue?.data?.email },
    ],
    [modalOpenerValue]
  );
  return (
    <>
      <CDivider title={"نمایندگان بهره بردار"} />
      <Row justify="start">
        <Button
          type={"success"}
          onClick={() =>
            setModalOpenerValue({
              isOpen: true,
              type: "NEW_ITEM",
              data: {},
            })
          }
          icon={<PlusOutlined className="text-white" />}
          style={{ minWidth: "130px" }}
        >
          <span className="mx-2">افزودن نماینده بهره‌بردار</span>
        </Button>
      </Row>
      <CModal
        title={"افزودن نماینده بهره بردار"}
        closable={false}
        visible={modalOpenerValue.isOpen}
        width={900}
        destroyOnClose={true}
        footer={null}
      >
        {modalOpenerValue.type === "SHOW_ITEM" ? (
          <DetailView items={decriptionItems} />
        ) : (
          <AddBeneficiaryAgentForm
            allModalValues={modalOpenerValue}
            userBeneficiaryUnit={userBeneficiaryUnit && userBeneficiaryUnit[0]}
          />
        )}
      </CModal>
      <Row className="my-5">
        <CTable
          dataSource={beneficiaryAgentData}
          columns={columns}
          loading={
            beneficiaryAgentLoading ||
            deactiveMutationLoading ||
            activeMutationLoading
          }
          pagination={false}
        />
      </Row>
    </>
  );
};

export default AddBeneficiaryAgent;
