import { ChangeEvent, lazy, useMemo, useState } from "react";
import { Popover, Row } from "antd";
import Button from "antd-button-color";
import CTable from "../../../Components/UI/Table/CTable";
import {
  CheckCircleOutlined,
  EditOutlined,
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";
import CModal from "../../../Components/UI/Modal/CModal";
import CDivider from "../../../Components/UI/Divider/CDivider";
import { useRecoilState } from "recoil";
import { modalOpener } from "../../../Store/Atoms/Atoms";
import { BusinessUnitTypes } from "./BusinessUnitManagment.types";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  deactiveUnits,
  activeUnits,
  getUnitsInfo,
} from "../../../Requests/AdminKartable/BusinessUnitManagment/BusinessUnitManagment";
import { CPopConfirm } from "../../../Components/UI/PopConfirm/CPopConfirm";
import {
  onErrorMessage,
  onSuccessMessage,
} from "../../../Utils/AlertMessage/AlertMessage";
import CSearchbar from "../../../Components/UI/Searchbar/CSearchbar";
import {
  activeBeneficiary,
  deactiveBeneficiary,
  getBeneficiaryUnitsInfo,
} from "../../../Requests/AdminKartable/BeneficiaryUnitManagment/BeneficiaryUnitManagment";
const BusinessUnitManagmentForm = lazy(
  () =>
    import(
      "../../../Container/AdminKartable/BusinessUnitManagment/BusinessUnitManagmentForm"
    )
);
const BusinessUnitManagment = ({ title }: BusinessUnitTypes) => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: beneficiaryData, isFetching: beneficiaryLoading } = useQuery(
    "getBeneficiaryUnitsInfo",
    getBeneficiaryUnitsInfo,
    {
      refetchOnWindowFocus: false,
    }
  ); //دریافت اطلاعات واحد های تجاری
  const [tableData, setTableData] = useState<any>({ raw: [], parsed: [] });
  const { data: unitsData, isFetching: unitsLoading } = useQuery(
    "getUnitsInfo",
    getUnitsInfo,
    {
      onSuccess: (data) => {
        const result = data?.map(
          (item: any) =>
            ({
              id: item?.Id,
              businessUnitName: item?.Title,
              floor: `${item.FloorId?.Floor_Number} / ${item.FloorId?.Title} `,
              floorNumber: item.FloorId?.Floor_Number,
              floorTitle: item.FloorId?.Title,
              floorId: item?.FloorIdId,
              unitNumber: item?.Unit_Number,
              isActive: item?.IsActive,
            } ?? [])
        ) as any;
        setTableData({ raw: result, parsed: result });
      },
      refetchOnWindowFocus: false,
    }
  ); //دریافت اطلاعات واحد های تجاری
  const [modalOpenerValue, setModalOpenerValue] = useRecoilState(modalOpener);
  const { mutate: deactiveMutation, isLoading: deactiveMutationLoading } =
    useMutation((item: any) => deactiveUnits(item), {
      onSettled: (data: any, errors: any, variables: any) => {
        const beneficiaryData: any[] | undefined = queryClient.getQueryData(
          "getBeneficiaryUnitsInfo"
        );
        const beneficiaryItems = beneficiaryData?.filter(
          (item: any) => item.UnitId === variables?.id
        );
        // eslint-disable-next-line array-callback-return
        beneficiaryItems?.map((item: any) => {
          const items = { id: item.Id };
          deactiveBeneficiary(items);
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries("getUnitsInfo");
        queryClient.invalidateQueries("getBeneficiaryUnitsInfo");
        onSuccessMessage();
      },
      onError: () => {
        onErrorMessage("deactiveUnits");
      },
    }); //غیرفعال سازی واحد تجاری

  const { mutate: activeMutation, isLoading: activeMutationLoading } = useMutation(
    (item: any) => activeUnits(item),

    {
      onSettled: (data: any, errors: any, variables: any) => {
        const beneficiaryData: any[] | undefined = queryClient.getQueryData(
          "getBeneficiaryUnitsInfo"
        );
        const beneficiaryItems = beneficiaryData?.filter(
          (item: any) => item.UnitId === variables?.id
        );
        // eslint-disable-next-line array-callback-return
        beneficiaryItems?.map((item: any) => {
          const items = { id: item.Id };
          activeBeneficiary(items);
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries("getUnitsInfo");
        queryClient.invalidateQueries("getBeneficiaryUnitsInfo");
        onSuccessMessage();
      },
      onError: () => {
        onErrorMessage("activeUnits");
      },
    }
  ); //فعال سازی واحد تجاری
  const [paginationState, setPaginationState] = useState({
    currentPage: 1,
    perPageCount: 10,
    totalPage: unitsData?.length ?? 0,
  });

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
        title: "نام واحد تجاری",
        dataIndex: "businessUnitName",
        key: "businessUnitName",
        width: "40%",
        align: "center",
        sorter: (a: any, b: any) =>
          a.businessUnitName.localeCompare(b.businessUnitName),
      },
      {
        title: "طبقه",
        dataIndex: "floor",
        key: "floor",
        width: "15%",
        align: "center",
        sorter: (a: any, b: any) => a.floor.localeCompare(b.floor),
      },
      {
        title: "پلاک",
        dataIndex: "unitNumber",
        key: "unitNumber",
        width: "15%",
        align: "center",
        sorter: (a: any, b: any) => a.unitNumber.localeCompare(b.unitNumber),
      },
      {
        title: "وضعیت",
        dataIndex: "isActive",
        key: "isActive",
        width: "17%",
        align: "center",
        render: (row: any, item: any, index: any) =>
          item?.isActive ? "فعال" : "غیر فعال",
        sorter: (a: any, b: any) => a.isActive || b.isActive,
      },
      {
        title: "عملیات",
        dataIndex: "action",
        key: "action",
        width: "10%",
        align: "center",
        render: (row: any, item: any, index: any) => (
          <div>
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
              {item?.isActive ? (
                <CPopConfirm
                  title={"برای غیر فعال سازی اطمینان دارید؟"}
                  okText={"بله"}
                  cancelText={"خیر"}
                  okType={"danger"}
                  onConfirm={() => {
                    deactiveMutation(item);
                  }}
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
                  onConfirm={() => {
                    activeMutation(item);
                  }}
                >
                  <Popover content={"فعال سازی"}>
                    <Button
                      className="m-1 xl:m-0"
                      type={"success"}
                      size={"middle"}
                      icon={<CheckCircleOutlined className="text-white mx-1" />}
                      // style={{ minWidth: "130px" }}
                      shape={"circle"}
                    >
                      {/* فعال سازی */}
                    </Button>
                  </Popover>
                </CPopConfirm>
              )}
            </Row>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationState]
  );
  const [searchParam] = useState([
    "businessUnitName",
    "floor",
    "unitNumber",
    "isActive",
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
          <span className="mx-2">مورد جدید</span>
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
        <BusinessUnitManagmentForm allModalValues={modalOpenerValue} />
      </CModal>
      <Row className="my-5">
        <CTable
          dataSource={tableData.raw}
          columns={columns}
          loading={unitsLoading || activeMutationLoading || deactiveMutationLoading}
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

export default BusinessUnitManagment;
