import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { BeneficiaryUnitManagmentFormTypes } from "./BeneficiaryUnitManagmentForm.types";
import {
  FormWrapper,
  InputElement,
  SelectElement,
} from "../../../Components/FormElement";
import { modalOpener } from "../../../Store/Atoms/Atoms";
import Button from "antd-button-color";
import { useSetRecoilState } from "recoil";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUnitsInfo } from "../../../Requests/AdminKartable/BusinessUnitManagment/BusinessUnitManagment";
import { getPermissions } from "../../../Requests/AdminKartable/GetPermissions/GetPermissions";
import { getUserRoles } from "../../../Requests/AdminKartable/GetUserRoles/GetUserRoles";
import PermissionTypeSelect from "./PermissionTypeSelect";
import {
  onErrorMessage,
  onSameValueMessage,
  onSuccessMessage,
} from "../../../Utils/AlertMessage/AlertMessage";
import {
  addBeneficiaryInfo,
  editUnitBeneficiary,
} from "../../../Requests/AdminKartable/BeneficiaryUnitManagment/BeneficiaryUnitManagment";
const BeneficiaryUnitManagmentForm = ({
  allModalValues,
}: BeneficiaryUnitManagmentFormTypes) => {
  const queryClient = useQueryClient();
  const { data: unitsData, isLoading: unitsLoading } = useQuery(
    "getUnitsInfo",
    getUnitsInfo,
    {
      refetchOnWindowFocus: false,
    }
  ); //دریافت اطلاعات واحد های تجاری
  const { data: userRoles, isLoading: userRolesLoading } = useQuery(
    "getUserRoles",
    getUserRoles,
    {
      refetchOnWindowFocus: false,
    }
  ); //دریافت مجوز ها
  const { data: permission, isLoading: permissionLoading } = useQuery(
    "getPermissions",
    getPermissions,
    { refetchOnWindowFocus: false }
  ); //دریافت مجوز ها
  const setModalOpenerValue = useSetRecoilState(modalOpener); //ست کردن استیت مودال
  const { mutate: addBeneficiary, isLoading: addBeneficiaryLoading } = useMutation(
    (addingValue: any) => addBeneficiaryInfo(addingValue),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getBeneficiaryUnitsInfo");
        onSuccessMessage();
        setModalOpenerValue({
          isOpen: false,
        });
      },
      onError: () => {
        onErrorMessage("addBeneficiary");
        setModalOpenerValue({
          isOpen: false,
        });
      },
    }
  ); //افزودن بهره بردار
  const { mutate: editBeneficiary, isLoading: editBeneficiaryLoading } = useMutation(
    (editingValue: any) =>
      editUnitBeneficiary(editingValue, allModalValues?.data.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getBeneficiaryUnitsInfo");
        onSuccessMessage();
        setModalOpenerValue({
          isOpen: false,
        });
      },
      onError: () => {
        onErrorMessage("editUnitBeneficiary");
        setModalOpenerValue({
          isOpen: false,
        });
      },
    }
  ); //ویرایش بهره بردار
  const onSubmit = (value: any) => {
    const data: any = queryClient.getQueryData("getBeneficiaryUnitsInfo");
    const sameData: any = data?.find(
      (item: any) =>
        item.UnitId === value.businessUnitName[1] &&
        item.NationalCode === value.nationalCode
    );
    if (sameData && allModalValues.type === "NEW_ITEM") {
      onSameValueMessage();
    } else {
      if (allModalValues.type === "NEW_ITEM") {
        const addingValue: any = {
          UnitId: value.businessUnitName[1],
          Name: value.name,
          Lastname: value.lastname,
          Mobile: value.mobile,
          NationalCode: value.nationalCode,
          Tel: value.tel,
          Email: value.email,
          UserRoleId: value.userRoleType?.value[1],
          PermissionId: value.permissionType && {
            results: value.permissionType?.map((i: any) => i[1]),
          },
        };

        addBeneficiary(addingValue);
      } else if (allModalValues.type === "EDIT_ITEM") {
        const userRole = value.userRoleType?.value[1];
        const editingValue: any = {
          UnitId: value.businessUnitName[1],
          Name: value.name,
          Lastname: value.lastname,
          Mobile: value.mobile,
          NationalCode: value.nationalCode,
          Tel: value.tel,
          Email: value.email,
          UserRoleId: userRole,
          PermissionId:
            userRole === 3
              ? value.permissionType && {
                  results: value.permissionType?.map((i: any) => i[1]),
                }
              : { results: [] },
        };

        editBeneficiary(editingValue);
      }
    }
  };
  const permissionTitle = allModalValues?.data?.permission;
  const permissionId = allModalValues?.data?.permissionId;
  let allPermission = [];
  for (let i = 0; i < permissionId?.length; i++) {
    const title = permissionTitle[i];
    const id = permissionId[i];
    allPermission.push([title, id]);
  }

  return (
    <div>
      <FormWrapper
        onSubmit={onSubmit}
        mode="all"
        defaultValues={
          allModalValues.type === "EDIT_ITEM" && {
            businessUnitName: [
              allModalValues?.data.businessUnitName,
              allModalValues?.data.businessUnitNameId,
            ],
            name: allModalValues?.data.name,
            lastname: allModalValues?.data.lastname,
            nationalCode: allModalValues?.data.nationalCode,
            mobile: allModalValues?.data.mobile,
            userRoleType: {
              key: [
                allModalValues?.data.userRoleType,
                allModalValues?.data.userRoleTypeId,
              ],
              label: allModalValues?.data.userRoleType,
              value: [
                allModalValues?.data.userRoleType,
                allModalValues?.data.userRoleTypeId,
              ],
            },
            permissionType: allPermission,
          }
        }
      >
        <div className="md:grid md:grid-cols-3 md:gap-4">
          <SelectElement
            name={"businessUnitName"}
            label={"نام واحد تجاری"}
            placeHolder={"نام واحد تجاری را وارد کنید"}
            showSearch={true}
            option={unitsData?.map((item: any) => ({
              value: [item.Title, item.Id],
              label: item.Title,
            }))}
            loading={unitsLoading}
            isDisable={allModalValues.type === "EDIT_ITEM" && true}
            required={true}
          />
          <InputElement
            name={"name"}
            label={"نام"}
            placeHolder={"نام را وارد کنید"}
            required={true}
          />
          <InputElement
            name={"lastname"}
            label={"نام خانوادگی"}
            placeHolder={"نام خانوادگی را وارد کنید"}
            required={true}
          />
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-4">
          <InputElement
            name={"nationalCode"}
            label={"کد ملی"}
            placeHolder={"کد ملی را وارد کنید"}
            maxLength={10}
            minLength={10}
            type="text"
            isDisable={allModalValues.type === "EDIT_ITEM" && true}
            required={true}
          />
          <InputElement
            name={"mobile"}
            label={"شماره همراه"}
            placeHolder={"شماره همراه را وارد کنید"}
            maxLength={11}
            minLength={11}
            type="tel"
            required={true}
          />
          <InputElement
            name={"tel"}
            label={" تلفن"}
            placeHolder={" تلفن را وارد کنید"}
            type="tel"
            required={true}
          />
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-4">
          <InputElement
            name={"email"}
            label={"ایمیل"}
            placeHolder={"ایمیل را وارد کنید"}
            type="email"
            required={true}
          />
          <SelectElement
            name={"userRoleType"}
            label={"نوع کاربری"}
            placeHolder={"نوع کاربری را انتخاب کنید"}
            labelInValue={true}
            showSearch={false}
            option={userRoles?.map((item: any) => ({
              value: [item.Title, item.Id],
              label: item.Title,
            }))}
            loading={userRolesLoading}
            required={true}
          />
          <PermissionTypeSelect
            permission={permission}
            permissionLoading={permissionLoading}
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
              disabled={addBeneficiaryLoading || editBeneficiaryLoading}
              style={{ minWidth: "130px" }}
            >
              انصراف
            </Button>
          </div>
          <div className="mx-2">
            <Button
              type={"success"}
              icon={<SaveOutlined className="text-white mx-1" />}
              disabled={addBeneficiaryLoading || editBeneficiaryLoading}
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

export default BeneficiaryUnitManagmentForm;
