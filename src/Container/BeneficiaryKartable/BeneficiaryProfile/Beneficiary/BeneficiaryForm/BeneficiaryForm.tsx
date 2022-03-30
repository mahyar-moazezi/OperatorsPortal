import { FormWrapper, SelectElement } from "../../../../../Components/FormElement";
import UploadElement from "../../../../../Components/FormElement/UploadElement/UploadElement";
import { Modal } from "antd";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import Button from "antd-button-color";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUnitClass } from "../../../../../Requests/BeneficiaryKartable/GetUnitClass/GetUnitClass";
import {
  onErrorMessage,
  onSuccessMessage,
} from "../../../../../Utils/AlertMessage/AlertMessage";
import { genLookupId } from "../../../../../Utils/GenLookup/GenLookup";
import { profileUploadItems } from "../../../../../Requests/BeneficiaryKartable/BeneficiaryProfile/BeneficiaryProfile";
import { addUnitClassProfile } from "../../../../../Requests/BeneficiaryKartable/BeneficiaryProfile/Beneficiary/Beneficiary";
import { addProfileLog } from "../../../../../Requests/RegisterLog/RegisterLog";
type BeneficiaryFormTypes = {
  closeModal: () => void;
  userBeneficiaryUnit: any;
};
const BeneficiaryForm = ({
  closeModal,
  userBeneficiaryUnit,
}: BeneficiaryFormTypes) => {
  const queryClient = useQueryClient();
  const userInfo: any = queryClient.getQueryData("getCurrentUser");
  const { data: unitClassData, isFetching: unitClassDataLoading } = useQuery(
    "getUnitClass",
    getUnitClass,
    {
      refetchOnWindowFocus: false,
    }
  ); //درافت لیست اصناف
  const { mutate: profileUploadData, isLoading: profileUploadDataLoading } =
    useMutation((addingValue: any) => profileUploadItems(addingValue), {
      onSuccess: () => {
        onSuccessMessage();
        closeModal();
      },
      onError: () => {
        onErrorMessage("profileUploadItemsSenf");
        closeModal();
      },
    }); //بارگذاری فایل
  const {
    mutate: addingUnitClassProfile,
    isLoading: addingUnitClassProfileLoading,
  } = useMutation(
    (value: any) =>
      addUnitClassProfile({
        Beneficiary_UnitId: userBeneficiaryUnit?.Id,
        UnitClassId: value.unitClass.value[1],
        StatusId: genLookupId.inProgress,
        IsActive: false,
      }),
    {
      onSettled: (data: any, errors: any, variables: any) => {
        const logValue: any = {
          Beneficiary_UnitId: userBeneficiaryUnit?.Id,
          StatusId: genLookupId.inProgress,
          User_IdId: userInfo?.Id,
          Date: new Date().toISOString(),
          Description: null,
          Edit_Item: "ویرایش صنف",
        };
        addProfileLog(logValue);
        const uploadUnitLicense = {
          uploadedFile: variables.unitLicense,
          type: genLookupId.unitLicense,
          id: data.data.Id,
        };

        profileUploadData(uploadUnitLicense);
        if (variables.unitLease) {
          const uploadUnitLease = {
            uploadedFile: variables.unitLease,
            type: genLookupId.unitLease,
            id: data.data.Id,
          };
          profileUploadData(uploadUnitLease);
        }
      },

      onError: () => {
        onErrorMessage("addingUnitClassProfile");
      },
    }
  ); //افزودن صنف و اسناد

  const ConfirmDeleteFile = (e: any) => {
    return new Promise((resolve) => {
      Modal.confirm({
        title: `آیا از حذف این فایل مطمین هستید؟`,
        content: e.name,
        style: { textAlign: "right" },
        onOk: async () => {
          if (e.status === "done") {
            resolve(true);
          } else {
            // await sp.web
            //   .getFolderByServerRelativeUrl("GIG_OR_Documents")
            //   .files.getByName(`${e.name}`)
            //   .delete();
            resolve(true);
          }
        },
        onCancel: () => false,
      });
    });
  };
  const onSubmit = (value: any) => {
    addingUnitClassProfile(value);
  };
  return (
    <>
      <FormWrapper onSubmit={onSubmit} mode="all">
        <div className="md:grid md:grid-cols-3 md:gap-4">
          <SelectElement
            name={"unitClass"}
            label={"صنف"}
            placeHolder={"صنف را انتخاب کنید"}
            labelInValue={true}
            showSearch={true}
            option={unitClassData?.map((item: any) => ({
              value: [item.Title, item.Id],
              label: item.Title,
            }))}
            loading={unitClassDataLoading}
            required={true}
          />

          <UploadElement
            name={"unitLicense"}
            label={"تصویر جواز"}
            isDisable={false}
            onRemove={(e) => ConfirmDeleteFile(e)}
            listType="picture"
            required={false}
            maxCount={1}
          />
          <UploadElement
            name={"unitLease"}
            label={"تصویر مباعینامه (اجاره نامه) در صورت وجود"}
            isDisable={false}
            onRemove={(e) => ConfirmDeleteFile(e)}
            listType="picture"
            required={false}
            maxCount={1}
          />
        </div>
        <div className="flex justify-center">
          <div className="mx-2">
            <Button
              onClick={closeModal}
              type={"danger"}
              ghost
              icon={<CloseOutlined className=" mx-1" />}
              disabled={profileUploadDataLoading || addingUnitClassProfileLoading}
              style={{ minWidth: "130px" }}
            >
              انصراف
            </Button>
          </div>
          <div className="mx-2">
            <Button
              type={"success"}
              icon={<SaveOutlined className="text-white mx-1" />}
              disabled={profileUploadDataLoading || addingUnitClassProfileLoading}
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

export default BeneficiaryForm;
