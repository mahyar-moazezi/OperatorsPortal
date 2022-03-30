import { getWeb } from "../../../Config/WebConfig/WebConfig";
import { ListName } from "../../../Utils/ListsName/ListsName";
let web = getWeb().kcm;

//------------دریافت اطلاعات بهره برداران--------------
export const getBeneficiaryUnitsInfo = async () => {};
//-----------------------افزودن اطلاعات بهره برداران-------------------------------
export const addBeneficiaryInfo = async (value: any) => {};
//----------------------غیر فعال سازی واحد تجاری------------------------------
export const deactiveBeneficiary = async (item: any) => {};
//---------------------- فعال سازی واحد تجاری------------------------------
export const activeBeneficiary = async (item: any) => {};
//---------------------- ویرایش واحد تجاری------------------------------
export const editUnitBeneficiary = async (value: any, id: number) => {};
