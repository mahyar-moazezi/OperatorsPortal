import { lazy, useState, useMemo, ChangeEvent } from "react";
import { BeneficiaryUnitManagmentTypes } from "./BeneficiaryUnitManagment.types";
import CDivider from "../../../Components/UI/Divider/CDivider";
import { Popover, Row } from "antd";
import Button from "antd-button-color";
import CModal from "../../../Components/UI/Modal/CModal";
import CTable from "../../../Components/UI/Table/CTable";
import {
  CheckCircleOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CPopConfirm } from "../../../Components/UI/PopConfirm/CPopConfirm";
import { useRecoilState } from "recoil";
import { modalOpener } from "../../../Store/Atoms/Atoms";
import {
  activeBeneficiary,
  deactiveBeneficiary,
  getBeneficiaryUnitsInfo,
} from "../../../Requests/AdminKartable/BeneficiaryUnitManagment/BeneficiaryUnitManagment";
import { useQuery, useMutation, useQueryClient } from "react-query";
import DetailView from "../../../Container/AdminKartable/BeneficiaryUnitManagment/DetailView/DetailView";
import {
  onErrorMessage,
  onSuccessMessage,
} from "../../../Utils/AlertMessage/AlertMessage";
import CSearchbar from "../../../Components/UI/Searchbar/CSearchbar";
const BeneficiaryUnitManagmentForm = lazy(
  () =>
    import(
      "../../../Container/AdminKartable/BeneficiaryUnitManagment/BeneficiaryUnitManagmentForm"
    )
);
const BeneficiaryUnitManagment = ({ title }: BeneficiaryUnitManagmentTypes) => {
  const queryClient = useQueryClient();
  const [tableData, setTableData] = useState<any>({ raw: [], parsed: [] });
  const { data: beneficiaryData, isFetching: beneficiaryLoading } = useQuery(
    "getBeneficiaryUnitsInfo",
    getBeneficiaryUnitsInfo,
    {
      onSuccess: (data) => {
        const result = data?.map(
          (item: any) =>
            ({
              id: item?.Id,
              businessUnitName: item?.Unit?.Title,
              businessUnitNameId: item?.UnitId,
              name: item?.Name,
              lastname: item?.Lastname,
              nationalCode: item?.NationalCode,
              mobile: item?.Mobile,
              tel: item?.Tel,
              email: item?.Email,
              userRoleType: item?.UserRole?.Title,
              userRoleTypeId: item?.UserRoleId,
              permission: item?.Permission?.map((i: any) => i.Title),
              permissionId: item?.PermissionId,
              isActive: item?.IsActive,
            } ?? [])
        ) as any;
        setTableData({ raw: result, parsed: result });
      },
      refetchOnWindowFocus: false,
    }
  ); //???????????? ?????????????? ???????? ?????? ??????????
  const [modalOpenerValue, setModalOpenerValue] = useRecoilState(modalOpener);
  const [paginationState, setPaginationState] = useState({
    currentPage: 1,
    perPageCount: 8,
    totalPage: beneficiaryData?.length ?? 0,
  });
  const { mutate: deactiveMutation, isLoading: deactiveMutationLoading } =
    useMutation((item: any) => deactiveBeneficiary(item), {
      onSuccess: () => {
        queryClient.invalidateQueries("getBeneficiaryUnitsInfo");
        onSuccessMessage();
      },
      onError: () => {
        onErrorMessage("deactiveBeneficiary");
      },
    }); //?????????????? ???????? ???????? ??????????????
  const { mutate: activeMutation, isLoading: activeMutationLoading } = useMutation(
    (item: any) => activeBeneficiary(item),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getBeneficiaryUnitsInfo");
        onSuccessMessage();
      },
      onError: () => {
        onErrorMessage("activeBeneficiary");
      },
    }
  ); //???????? ???????? ???????? ??????????????
  const columns = useMemo(
    () => [
      {
        title: "#",
        dataIndex: "row",
        key: "row",
        width: "3%",
        align: "center",
        render: (row: any, item: any, index: any) =>
          index +
          1 +
          paginationState.perPageCount * (paginationState.currentPage - 1),
      },
      {
        title: "?????? ???????? ??????????",
        dataIndex: "businessUnitName",
        key: "businessUnitName",
        width: "22%",
        align: "center",
        sorter: (a: any, b: any) =>
          a.businessUnitName.localeCompare(b.businessUnitName),
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
        width: "20%",
        align: "center",
        sorter: (a: any, b: any) => a.lastname.localeCompare(b.lastname),
      },
      {
        title: "???? ??????",
        dataIndex: "nationalCode",
        key: "nationalCode",
        width: "10%",
        align: "center",
        sorter: (a: any, b: any) => a.nationalCode.localeCompare(b.nationalCode),
      },

      {
        title: "?????? ????????????",
        dataIndex: "userRoleType",
        key: "userRoleType",
        width: "15%",
        align: "center",
        sorter: (a: any, b: any) => a.userRoleType.localeCompare(b.userRoleType),
      },
      {
        title: "????????????",
        dataIndex: "action",
        key: "action",
        width: "15%",
        align: "center",
        render: (row: any, item: any, index: any) => (
          <div>
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
              {item?.isActive ? (
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
              <Popover content={"???????????? ??????????????"}>
                <Button
                  shape={"circle"}
                  className="m-1 xl:m-0"
                  type={"primary"}
                  size={"middle"}
                  // onClick={() =>
                  //   setModalOpenerValue({
                  //     isOpen: true,
                  //     type: "PROFILE_ITEM",
                  //     data: item,
                  //   })
                  // }
                  icon={<UserOutlined className="text-white mx-1" />}
                >
                  {/* ???????????? ?????????????? */}
                </Button>
              </Popover>
            </Row>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationState]
  );
  const decriptionItems: { label: string; value: any }[] = useMemo(
    () => [
      { label: "?????? ???????? ??????????", value: modalOpenerValue?.data?.businessUnitName },
      { label: "??????", value: modalOpenerValue?.data?.name },
      { label: "?????? ???????????????? ", value: modalOpenerValue?.data?.lastname },
      { label: "???? ??????", value: modalOpenerValue?.data?.nationalCode },
      { label: "?????????? ??????????", value: modalOpenerValue?.data?.mobile },
      { label: "????????", value: modalOpenerValue?.data?.tel },
      { label: "??????????", value: modalOpenerValue?.data?.email },
      { label: "?????? ????????????", value: modalOpenerValue?.data?.userRoleType },
      {
        label: "?????? ????????",
        value: modalOpenerValue?.data?.permission?.map((item: any) => ` ${item} `),
      },
    ],
    [modalOpenerValue]
  );
  const [searchParam] = useState([
    "businessUnitName",
    "name",
    "lastname",
    "nationalCode",
    "userRoleType",
  ]);
  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    const filteredData: any[] = tableData?.parsed?.filter((item: any) => {
      // eslint-disable-next-line array-callback-return
      return searchParam.some((newItem) => {
        if (item[newItem]) {
          return (
            item[newItem].toString().toLowerCase().indexOf(value.toLowerCase()) > -1
          );
        }
      });
    });
    setTableData({ raw: filteredData, parsed: tableData.parsed });
  };
  return (
    <div>
      <CDivider title={title} />
      <Row justify="space-between">
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
          <span className="mx-2">???????? ????????</span>
        </Button>
        <CSearchbar onSearch={(e) => onSearch(e)} />
      </Row>
      <CModal
        title={title}
        closable={false}
        visible={modalOpenerValue.isOpen}
        width={900}
        destroyOnClose={true}
        footer={null}
      >
        {modalOpenerValue.type === "SHOW_ITEM" ? (
          <DetailView items={decriptionItems} />
        ) : (
          <BeneficiaryUnitManagmentForm allModalValues={modalOpenerValue} />
        )}
      </CModal>
      <Row className="my-5">
        <CTable
          dataSource={tableData.raw}
          columns={columns}
          loading={
            beneficiaryLoading || deactiveMutationLoading || activeMutationLoading
          }
          pagination={{
            onChange(current: number, showTotal: number) {
              setPaginationState({
                ...paginationState,
                currentPage: current,
                perPageCount: showTotal,
              });
            },
          }}
        />
      </Row>
    </div>
  );
};

export default BeneficiaryUnitManagment;
