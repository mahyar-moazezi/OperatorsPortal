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
    ); //???????????? ?????????????? ???????? ?????? ??????????
  // ---------------???????? ???????? ?? ?????? ???????? ????????-------------
  const { mutate: deactiveMutation, isLoading: deactiveMutationLoading } =
    useMutation((item: any) => deactiveBeneficiaryAgent(item), {
      onSettled: () => {
        const logValue: any = {
          Beneficiary_UnitId: userBeneficiaryUnit?.Id,
          StatusId: genLookupId.inProgress,
          User_IdId: userInfo?.Id,
          Date: new Date().toISOString(),
          Description: null,
          Edit_Item: "?????? ???????? ???????? ?????????????? ???????? ??????????",
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
    }); //?????? ???????? ???????? ?????????????? ???????? ??????????

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
          Edit_Item: "???????? ???????? ?????????????? ???????? ??????????",
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
  ); //???????? ???????? ?????????????? ???????? ??????????

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
        title: "??????",
        dataIndex: "name",
        key: "name",
        width: "15%",
        align: "center",
        sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      },
      {
        title: "?????? ????????????????",
        dataIndex: "lastname",
        key: "lastname",
        width: "27%",
        align: "center",
        sorter: (a: any, b: any) => a.lastname.localeCompare(b.lastname),
      },
      {
        title: "???????? ??????????",
        dataIndex: "mobile",
        key: "mobile",
        width: "20%",
        align: "center",
        sorter: (a: any, b: any) => a.mobile.localeCompare(b.mobile),
      },
      {
        title: "???? ??????",
        dataIndex: "nationalCode",
        key: "nationalCode",
        width: "25%",
        align: "center",
        sorter: (a: any, b: any) => a.nationalCode.localeCompare(b.nationalCode),
      },

      {
        title: "????????????",
        dataIndex: "action",
        key: "action",
        width: "10%",
        align: "center",
        render: (row: any, item: any, index: any) => (
          <div>
            {item.isActive ? (
              <Row justify={"space-between"}>
                <Popover content={"????????????"}>
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
                    {/* ???????????? */}
                  </Button>
                </Popover>
                {item?.userIsActive ? (
                  <CPopConfirm
                    title={"???????? ?????? ???????? ???????? ?????????????? ????????????"}
                    okText={"??????"}
                    cancelText={"??????"}
                    okType={"danger"}
                    onConfirm={() => deactiveMutation(item)}
                  >
                    <Popover content={"?????????????? ????????"}>
                      <Button
                        shape={"circle"}
                        className="m-1 xl:m-0"
                        type={"danger"}
                        size={"middle"}
                        icon={<StopOutlined className="text-white mx-1" />}
                        // style={{ minWidth: "130px" }}
                      >
                        {/* ?????? ???????? ???????? */}
                      </Button>
                    </Popover>
                  </CPopConfirm>
                ) : (
                  <CPopConfirm
                    title={"???????? ???????? ???????? ?????????????? ????????????"}
                    okText={"??????"}
                    cancelText={"??????"}
                    okType={"success"}
                    onConfirm={() => activeMutation(item)}
                  >
                    <Popover content={"???????? ????????"}>
                      <Button
                        shape={"circle"}
                        className="m-1 xl:m-0"
                        type={"success"}
                        size={"middle"}
                        icon={<CheckCircleOutlined className="text-white mx-1" />}
                        // style={{ minWidth: "130px" }}
                      >
                        {/* ???????? ???????? */}
                      </Button>
                    </Popover>
                  </CPopConfirm>
                )}
                <Popover content={"????????????"}>
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
                    {/* ???????????? */}
                  </Button>
                </Popover>
              </Row>
            ) : (
              <CheckStatusBtn title={"???? ?????? ??????????"} />
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
      { label: "??????", value: modalOpenerValue?.data?.name },
      { label: "?????? ????????????????", value: modalOpenerValue?.data?.lastname },
      { label: "???????? ??????????", value: modalOpenerValue?.data?.mobile },
      { label: "???? ??????", value: modalOpenerValue?.data?.nationalCode },
      { label: "????????", value: modalOpenerValue?.data?.tel },
      { label: "??????????", value: modalOpenerValue?.data?.email },
    ],
    [modalOpenerValue]
  );
  return (
    <>
      <CDivider title={"?????????????????? ???????? ??????????"} />
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
          <span className="mx-2">???????????? ?????????????? ?????????????????????</span>
        </Button>
      </Row>
      <CModal
        title={"???????????? ?????????????? ???????? ??????????"}
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
