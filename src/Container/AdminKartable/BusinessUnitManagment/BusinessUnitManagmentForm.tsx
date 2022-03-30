import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import {
  FormWrapper,
  InputElement,
  InputNumberElement,
  SelectElement,
} from "../../../Components/FormElement";
import { modalOpener } from "../../../Store/Atoms/Atoms";
import { getFloors } from "../../../Requests/AdminKartable/GetFloors/GetFloors";
import {
  addUnitsInfo,
  editUnits,
} from "../../../Requests/AdminKartable/BusinessUnitManagment/BusinessUnitManagment";
import Button from "antd-button-color";
import {
  onErrorMessage,
  onSameValueMessage,
  onSuccessMessage,
} from "../../../Utils/AlertMessage/AlertMessage";
import { BusinessUnitFormTypes } from "./BusinessUnitManagmentForm.types";

const BusinessUnitManagmentForm = ({ allModalValues }: BusinessUnitFormTypes) => {
  const queryClient = useQueryClient();
  const { data: floors, isFetching: floorsLoading } = useQuery(
    "getFloors",
    getFloors,
    { refetchOnWindowFocus: false }
  ); //دریافت طبقات
  const setModalOpenerValue = useSetRecoilState(modalOpener); //ست کردن استیت مودال
  const { mutate: addUnit, isLoading: addUnitLoading } = useMutation(
    (addingValue: any) => addUnitsInfo(addingValue),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getUnitsInfo");
        onSuccessMessage();
        setModalOpenerValue({
          isOpen: false,
        });
      },
      onError: () => {
        onErrorMessage("addingUnit");
        setModalOpenerValue({
          isOpen: false,
        });
      },
    }
  ); //افزودن واحد تجاری
  const { mutate: editUnit, isLoading: editUnitLoading } = useMutation(
    (editingValue: any) => editUnits(editingValue, allModalValues?.data.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getUnitsInfo");
        onSuccessMessage();
        setModalOpenerValue({
          isOpen: false,
        });
      },
      onError: () => {
        onErrorMessage("editingUnit");
        setModalOpenerValue({
          isOpen: false,
        });
      },
    }
  ); //ویرایش واحد تجاری
  const onSubmit = (value: any) => {
    const data: any = queryClient.getQueryData("getUnitsInfo");
    const sameData: any = data?.find(
      (item: any) =>
        item.FloorIdId === value.floor[2] &&
        item.Unit_Number === value.unitNumber.toString()
    ); //چک کردن طبقه و پلاک تکراری
    if (sameData) {
      onSameValueMessage();
    } else {
      if (allModalValues.type === "NEW_ITEM") {
        const addingValue: any = {
          Title: value.businessUnitName,
          FloorIdId: value.floor[2],
          Unit_Number: value.unitNumber.toString(),
          IsActive: true,
        };
        addUnit(addingValue);
      } else {
        const editingValue: any = {
          Title: value.businessUnitName,
          FloorIdId: value.floor[2],
          Unit_Number: value.unitNumber.toString(),
        };
        editUnit(editingValue);
      }
    }
  };
  return (
    <div>
      <FormWrapper
        onSubmit={onSubmit}
        mode="all"
        defaultValues={
          allModalValues.type === "EDIT_ITEM" && {
            businessUnitName: allModalValues?.data.businessUnitName,
            floor: [
              allModalValues?.data.floorTitle,
              allModalValues?.data.floorNumber,
              allModalValues?.data.floorId,
            ],
            unitNumber: allModalValues?.data.unitNumber,
          }
        }
      >
        <div className="md:grid md:grid-cols-3 md:gap-4">
          <InputElement
            name={"businessUnitName"}
            label={"نام واحد تجاری"}
            placeHolder={"نام واحد تجاری را وارد کنید"}
            required={true}
          />
          <SelectElement
            name={"floor"}
            label={"طبقه"}
            placeHolder={"طبقه را انتخاب کنید"}
            showSearch={false}
            option={floors?.map((item: any) => ({
              value: [item.Title, item.Floor_Number, item.Id],
              label: item.Title,
            }))}
            loading={floorsLoading}
            required={true}
          />
          <InputNumberElement
            name={"unitNumber"}
            label={"پلاک"}
            placeHolder={"پلاک را وارد کنید"}
            min={0}
            required={true}
          />
        </div>
        <div className="flex justify-center">
          <div className="mx-2">
            <Button
              onClick={() =>
                setModalOpenerValue({
                  isOpen: false,
                })
              }
              type={"danger"}
              ghost
              icon={<CloseOutlined className=" mx-1" />}
              disabled={addUnitLoading || editUnitLoading}
              style={{ minWidth: "130px" }}
            >
              انصراف
            </Button>
          </div>
          <div className="mx-2">
            <Button
              type={"success"}
              icon={<SaveOutlined className="text-white mx-1" />}
              disabled={addUnitLoading || editUnitLoading}
              htmlType={"submit"}
              style={{ minWidth: "130px" }}
            >
              ثبت
            </Button>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
};

export default BusinessUnitManagmentForm;
