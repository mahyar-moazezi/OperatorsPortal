import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { FormWrapper, InputElement } from "../../../../../Components/FormElement";
import Button from "antd-button-color";
import { useMutation, useQueryClient } from "react-query";
import {
  addNewProfileSpecification,
  adminCheckProfileSpecification,
} from "../../../../../Requests/BeneficiaryKartable/BeneficiaryProfile/Specification/Specification";
import { genLookupId } from "../../../../../Utils/GenLookup/GenLookup";
import { addProfileLog } from "../../../../../Requests/RegisterLog/RegisterLog";
import {
  onErrorMessage,
  onSuccessMessage,
} from "../../../../../Utils/AlertMessage/AlertMessage";
type SpecificationFormTypes = {
  closeModal: () => void;
  userBeneficiaryUnit: any;
};
const SpecificationForm = ({
  closeModal,
  userBeneficiaryUnit,
}: SpecificationFormTypes) => {
  const queryClient = useQueryClient();
  const genLookupItems: any = queryClient.getQueryData("getGenLookupItems");
  const userInfo: any = queryClient.getQueryData("getCurrentUser");

  const {
    mutate: newProfileSpecification,
    isLoading: newProfileSpecificationLoading,
  } = useMutation((addingValue: any) => addNewProfileSpecification(addingValue), {
    onSettled: (data: any, errors: any, variables: any) => {
      const logValue: any = {
        Beneficiary_UnitId: variables.Beneficiary_UnitId,
        StatusId: variables.StatusId,
        User_IdId: userInfo?.Id,
        Date: new Date().toISOString(),
        Description: null,
        Edit_Item: "ویرایش مشخصات",
      };
      addProfileLog(logValue);
    },
    onSuccess: () => {
      onSuccessMessage();
      closeModal();
    },
    onError: () => {
      onErrorMessage("addNewProfileSpecification");
      closeModal();
    },
  }); //افزودن مشخصات کاربر
  const { mutate: adminCheckSpecification } = useMutation(
    (id: any) => adminCheckProfileSpecification(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getUserBeneficiaryUnit");
      },
      onError: () => {
        onErrorMessage("adminCheckProfileSpecification");
      },
    }
  ); //غیر فعال سازی دکمه ویرایش

  const onSubmit = (value: any) => {
    const status: any = genLookupItems.filter(
      (item: any) => item.Id === genLookupId.inProgress
    )[0];
    const addingValue: any = {
      Beneficiary_UnitId: userBeneficiaryUnit[0]?.Id,
      StatusId: status.Id,
      Name: value.name,
      Lastname: value.lastname,
      Mobile: value.mobile,
      NationalCode: value.nationalCode,
      Tel: value.tel,
      Email: value.email,
    };
    newProfileSpecification(addingValue);
    // adminCheckSpecification(userBeneficiaryUnit[0]?.Id);
  };

  return (
    <>
      <FormWrapper
        onSubmit={onSubmit}
        mode="all"
        defaultValues={{
          name: userBeneficiaryUnit[0]?.Name,
          lastname: userBeneficiaryUnit[0]?.Lastname,
          nationalCode: userBeneficiaryUnit[0]?.NationalCode,
          mobile: userBeneficiaryUnit[0]?.Mobile,
          tel: userBeneficiaryUnit[0]?.Tel,
          email: userBeneficiaryUnit[0]?.Email,
        }}
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
        <div className="flex justify-center">
          <div className="mx-2">
            <Button
              onClick={closeModal}
              type={"danger"}
              ghost
              icon={<CloseOutlined className=" mx-1" />}
              disabled={newProfileSpecificationLoading}
              style={{ minWidth: "130px" }}
            >
              انصراف
            </Button>
          </div>
          <div className="mx-2">
            <Button
              type={"success"}
              icon={<SaveOutlined className="text-white mx-1" />}
              disabled={newProfileSpecificationLoading}
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

export default SpecificationForm;
