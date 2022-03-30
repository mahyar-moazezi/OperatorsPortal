import { useWatch } from "react-hook-form";
import { SelectElement } from "../../../Components/FormElement";
import { PermissionTypeSelectTypes } from "./PermissionTypeSelect.types";
const PermissionTypeSelect = ({
  permission,
  permissionLoading,
}: PermissionTypeSelectTypes) => {
  const userRoleType = useWatch({
    name: "userRoleType",
  });
  const role = userRoleType
    ? userRoleType?.value
      ? userRoleType?.value[1]
      : userRoleType[1]
    : undefined;
  if (role && role === 3) {
    return (
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
    );
  }
  return <></>;
};

export default PermissionTypeSelect;
