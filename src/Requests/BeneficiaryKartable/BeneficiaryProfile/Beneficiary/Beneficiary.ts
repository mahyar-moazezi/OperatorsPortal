import { getWeb } from "../../../../Config/WebConfig/WebConfig";
import { genLookupId } from "../../../../Utils/GenLookup/GenLookup";
import { ListName } from "../../../../Utils/ListsName/ListsName";

let web = getWeb().kcm;
//-----------------------دریافت اطلاعات بهره بردار-------------------------------
export const getProfileUnitClass = async (beneficiaryUnitId: any) => {};
//----------------------------افزودن نماینده بهره بردار-------------------------------
export const addBeneficiaryAgentInfo = async (value: any) => {};
//-------------------دریافت اطلاعات نماینده بهره بردار--------------------------------
export const getBeneficiaryAgentInfo = async (beneficiaryUnitId: number) => {};
//----------------------ویرایش نماینده بهره بردار------------------------------
export const editBeneficiaryAgentInfo = async (value: any, id: number) => {};

//----------------------غیر فعال سازی ناینده بهره بردار------------------------------
export const deactiveBeneficiaryAgent = async (item: any) => {};
//----------------------فعال سازی نماینده بهره بردار------------------------------
export const activeBeneficiaryAgent = async (item: any) => {};

//-------------------------------افزودن اطلاعات صنف------------------------------------
export const addUnitClassProfile = async (value: any) => {};
//-----------------------درافت فایل های بهره بردار و صنف-------------------------------
export const getBeneficiaryDocuments = async (Id: any) => {};
