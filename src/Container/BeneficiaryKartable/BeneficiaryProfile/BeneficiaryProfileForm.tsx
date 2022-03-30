import Specifications from "./Specifications/Specifications";
import Owner from "./Owner/Owner";
import Beneficiary from "./Beneficiary/Beneficiary";
import { useQuery, useQueryClient } from "react-query";
import { getUserBeneficiaryUnit } from "../../../Requests/BeneficiaryKartable/BeneficiaryProfile/BeneficiaryProfile";
import CSkeleton from "../../../Components/UI/Skeleton/CSkeleton";

const BeneficiaryProfileForm = () => {
  const queryClient = useQueryClient();
  const userInfo: any = queryClient.getQueryData("getCurrentUser");
  const { isFetching: userBeneficiaryLoading } = useQuery(
    "getUserBeneficiaryUnit",
    () => getUserBeneficiaryUnit(userInfo?.Id),
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
        return result;
      },
      refetchOnWindowFocus: false,
    }
  ); //دریافت اطلاعات واحد تجاری کاربر
  return (
    <>
      <CSkeleton loading={userBeneficiaryLoading}>
        <Specifications />
        <Owner />
        <Beneficiary />
      </CSkeleton>
    </>
  );
};

export default BeneficiaryProfileForm;
