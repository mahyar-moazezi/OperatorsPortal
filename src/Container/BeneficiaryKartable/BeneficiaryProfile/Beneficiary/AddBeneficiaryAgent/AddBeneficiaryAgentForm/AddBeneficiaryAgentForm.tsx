import React from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { modalOpener } from "../../../../../../Store/Atoms/Atoms";
import { FormWrapper } from "../../../../../../Components/FormElement/FormWrapper/FormWrapper";
import { InputElement } from "../../../../../../Components/FormElement/InputElement/InputElement";
import Button from "antd-button-color";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { SelectElement } from "../../../../../../Components/FormElement";
import { getPermissions } from "../../../../../../Requests/AdminKartable/GetPermissions/GetPermissions";
import { AddBeneficiaryAgentFormTypes } from "./AddBeneficiaryAgentForm.types";
import {
  onErrorMessage,
  onSuccessMessage,
} from "../../../../../../Utils/AlertMessage/AlertMessage";
import {
  addBeneficiaryAgentInfo,
  editBeneficiaryAgentInfo,
} from "../../../../../../Requests/BeneficiaryKartable/BeneficiaryProfile/Beneficiary/Beneficiary";
import { genLookupId } from "../../../../../../Utils/GenLookup/GenLookup";
import { addProfileLog } from "../../../../../../Requests/RegisterLog/RegisterLog";

const AddBeneficiaryAgentForm = ({
  allModalValues,
  userBeneficiaryUnit,
}: AddBeneficiaryAgentFormTypes) => {
  const queryClient = useQueryClient();
  const userInfo: any = queryClient.getQueryData("getCurrentUser");

  const { data: permission, isLoading: permissionLoading } = useQuery(
    "getPermissions",
    getPermissions,
    { refetchOnWindowFocus: false }
  ); //دریافت مجوز ها
  const setModalOpenerValue = useSetRecoilState(modalOpener); //ست کردن استیت مودال
  const { mutate: addBeneficiaryAgent, isLoading: addBeneficiaryAgentLoading } =
    useMutation((addingValue: any) => addBeneficiaryAgentInfo(addingValue), {
      onSettled: (data: any, errors: any, variables: any) => {
        const logValue: any = {
          Beneficiary_UnitId: userBeneficiaryUnit?.Id,
          StatusId: genLookupId.newBeneficiaryAgent,
          User_IdId: userInfo?.Id,
          Date: new Date().toISOString(),
          Description: null,
          Edit_Item: "افزودن نماینده بهره بردار",
        };
        addProfileLog(logValue);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("getBeneficiaryAgentInfo");
        onSuccessMessage();
        setModalOpenerValue({
          isOpen: false,
        });
      },
      onError: () => {
        onErrorMessage("addBeneficiaryAgentInfo");
        setModalOpenerValue({
          isOpen: false,
        });
      },
    }); //افزودن نماینده بهره بردار
  const { mutate: editBeneficiaryAgent, isLoading: editBeneficiaryAgentLoading } =
    useMutation(
      (editingValue: any) =>
        editBeneficiaryAgentInfo(editingValue, allModalValues?.data.id),
      {
        onSettled: (data: any, errors: any, variables: any) => {
          const logValue: any = {
            Beneficiary_UnitId: userBeneficiaryUnit?.Id,
            StatusId: genLookupId.editBeneficiaryAgent,
            User_IdId: userInfo?.Id,
            Date: new Date().toISOString(),
            Description: null,
            Edit_Item: "ویرایش نماینده بهره بردار",
          };
          addProfileLog(logValue);
        },
        onSuccess: () => {
          queryClient.invalidateQueries("getBeneficiaryAgentInfo");
          onSuccessMessage();
          setModalOpenerValue({
            isOpen: false,
          });
        },
        onError: () => {
          onErrorMessage("editBeneficiaryAgentInfo");
          setModalOpenerValue({
            isOpen: false,
          });
        },
      }
    ); //ویرایش نماینده
  const onSubmit = (value: any) => {
    if (allModalValues.type === "NEW_ITEM") {
      const addingValue: any = {
        Beneficiary_UnitId: userBeneficiaryUnit?.Id,
        Name: value.name,
        Lastname: value.lastname,
        Mobile: value.mobile,
        NationalCode: value.nationalCode,
        Tel: value.tel,
        Email: value.email,
        PermissionId: {
          results: value.permissionType?.map((i: any) => i[1]),
        },
        StatusId: genLookupId.newBeneficiaryAgent,
        IsActive: false,
      };

      addBeneficiaryAgent(addingValue);
    } else if (allModalValues.type === "EDIT_ITEM") {
      const editingValue: any = {
        Name: value.name,
        Lastname: value.lastname,
        Mobile: value.mobile,
        NationalCode: value.nationalCode,
        Tel: value.tel,
        Email: value.email,
        PermissionId: {
          results: value.permissionType?.map((i: any) => i[1]),
        },
        StatusId: genLookupId.editBeneficiaryAgent,
        IsActive: false,
      };
      editBeneficiaryAgent(editingValue);
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
    <>
      <FormWrapper
        onSubmit={onSubmit}
        mode="all"
        defaultValues={
          allModalValues.type === "EDIT_ITEM" && {
            name: allModalValues?.data.name,
            lastname: allModalValues?.data.lastname,
            nationalCode: allModalValues?.data.nationalCode,
            mobile: allModalValues?.data.mobile,
            tel: allModalValues?.data.tel,
            email: allModalValues?.data.email,
            permissionType: allPermission,
          }
        }
      >
        <div className="md:grid md:grid-cols-3 md:gap-4">
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
          <InputElement
            name={"nationalCode"}
            label={"کد ملی"}
            placeHolder={"کد ملی را وارد کنید"}
            maxLength={10}
            minLength={10}
            type="text"
            required={true}
          />
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-4">
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
          <InputElement
            name={"email"}
            label={"ایمیل"}
            placeHolder={"ایمیل را وارد کنید"}
            type="email"
            required={true}
          />
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-4">
          <SelectElement
            name={"permissionType"}
            label={"نوع مجوز"}
            placeHolder={"نوع مجوز را انتخاب کنید"}
            showSearch={false}
            option={permission?.map((item: any) => ({
              value: [item.Title, item.Id],
              label: item.Title,
            }))}
            loading={permissionLoading}
            isMultiple={true}
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
              disabled={addBeneficiaryAgentLoading || editBeneficiaryAgentLoading}
              style={{ minWidth: "130px" }}
            >
              انصراف
            </Button>
          </div>
          <div className="mx-2">
            <Button
              type={"success"}
              icon={<SaveOutlined className="text-white mx-1" />}
              disabled={addBeneficiaryAgentLoading || editBeneficiaryAgentLoading}
              htmlType={"submit"}
              style={{ minWidth: "130px" }}
            >
              ثبت
            </Button>
          </div>
        </div>
      </FormWrapper>
    </>
  );
};

export default AddBeneficiaryAgentForm;
