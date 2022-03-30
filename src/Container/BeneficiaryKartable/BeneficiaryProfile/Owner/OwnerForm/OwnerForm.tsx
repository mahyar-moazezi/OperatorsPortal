import {
  FormWrapper,
  InputNumberElement,
} from "../../../../../Components/FormElement";
import UploadElement from "../../../../../Components/FormElement/UploadElement/UploadElement";
import { Modal } from "antd";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import Button from "antd-button-color";
import { useQueryClient, useMutation } from "react-query";
import {
  onErrorMessage,
  onSuccessMessage,
} from "../../../../../Utils/AlertMessage/AlertMessage";
import { addOwnerProfile } from "../../../../../Requests/BeneficiaryKartable/BeneficiaryProfile/Owner/Owner";
import { genLookupId } from "../../../../../Utils/GenLookup/GenLookup";
import { profileUploadItems } from "../../../../../Requests/BeneficiaryKartable/BeneficiaryProfile/BeneficiaryProfile";
import { addProfileLog } from "../../../../../Requests/RegisterLog/RegisterLog";
type OwnerFormTypes = {
  closeModal: () => void;
  userBeneficiaryUnit: any;
};
const OwnerForm = ({ closeModal, userBeneficiaryUnit }: OwnerFormTypes) => {
  const queryClient = useQueryClient();
  const userInfo: any = queryClient.getQueryData("getCurrentUser");

  const { mutate: profileUploadData, isLoading: profileUploadDataLoading } =
    useMutation((addingValue: any) => profileUploadItems(addingValue), {
      onSuccess: (data: any, variables: any) => {
        onSuccessMessage();
        closeModal();
      },
      onError: () => {
        onErrorMessage("profileUploadItemsOwner");
        closeModal();
      },
    }); //بارگذاری فایل

  const { mutate: addingOwnerProfile, isLoading: addingOwnerProfileLoading } =
    useMutation(
      (value: any) =>
        addOwnerProfile({
          Beneficiary_UnitId: userBeneficiaryUnit?.Id,
          OwnerPercentage: value.ownerPercentage,
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
            Edit_Item: "ویرایش درصد مالکیت",
          };
          addProfileLog(logValue);
          const uploadPropertyDoc = {
            uploadedFile: variables.uploadPropertyDoc,
            type: genLookupId.uploadPropertyDoc,
            id: data.data.Id,
          };

          profileUploadData(uploadPropertyDoc);
          if (variables.uploadAttorneyDoc) {
            const uploadAttorneyDoc = {
              uploadedFile: variables.uploadAttorneyDoc,
              type: genLookupId.uploadAttorneyDoc,
              id: data.data.Id,
            };
            profileUploadData(uploadAttorneyDoc);
          }
        },

        onError: () => {
          onErrorMessage("addOwnerProfile");
        },
      }
    ); //افزودن مشخصات سهم مالکیت

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
    addingOwnerProfile(value);
  };

  return (
    <>
      <FormWrapper onSubmit={onSubmit} mode="all">
        <div className="md:grid md:grid-cols-3 md:gap-4">
          <InputNumberElement
            name={"ownerPercentage"}
            label={"درصد مالکیت"}
            placeHolder={"درصد مالکیت را وارد کنید"}
            maxLength={3}
            minLength={0}
            max={100}
            min={0}
            required={true}
          />
          <UploadElement
            name={"uploadPropertyDoc"}
            label={"تصویر سند ملک (پشت و رو)"}
            isDisable={false}
            onRemove={(e) => ConfirmDeleteFile(e)}
            listType="picture"
            required={true}
            maxCount={1}
          />
          <UploadElement
            name={"uploadAttorneyDoc"}
            label={"تصویر وکالت نامه (در صورت وکالتی بودن ملک)"}
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
              disabled={addingOwnerProfileLoading || profileUploadDataLoading}
              style={{ minWidth: "130px" }}
            >
              انصراف
            </Button>
          </div>
          <div className="mx-2">
            <Button
              type={"success"}
              icon={<SaveOutlined className="text-white mx-1" />}
              disabled={addingOwnerProfileLoading || profileUploadDataLoading}
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

export default OwnerForm;
