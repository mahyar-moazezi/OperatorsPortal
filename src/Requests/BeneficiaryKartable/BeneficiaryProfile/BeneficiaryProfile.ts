import { getWeb } from "../../../Config/WebConfig/WebConfig";
import { genLookupId } from "../../../Utils/GenLookup/GenLookup";
import { ListName } from "../../../Utils/ListsName/ListsName";
let web = getWeb().kcm;

//------------دریافت اطلاعات بهره بردار وارد شده به سیستم--------------
export const getUserBeneficiaryUnit = async (Id: number) => {};
//-----------------------------بارگذاری فایل ها-----------------------------------------
export const profileUploadItems = async (value: any) => {
  let fileData: any = value.uploadedFile[0].originFileObj;
  const file = await web
    .getFolderByServerRelativeUrl(ListName.profileDocs)
    .files.add(`${value.id}-${value.type}-${fileData.name}`, fileData, true);
  if (
    value.type === genLookupId.uploadPropertyDoc ||
    value.type === genLookupId.uploadAttorneyDoc
  ) {
    const item = await file.file.getItem();
    await item.update({
      OwnerProfileIdId: value.id,
      TypeId: value.type,
    });
  } else if (
    value.type === genLookupId.unitLicense ||
    value.type === genLookupId.unitLease
  ) {
    const item = await file.file.getItem();
    await item.update({
      ProfileUnitClassIdId: value.id,
      TypeId: value.type,
    });
  } else {
    console.log("NOT RECORD ID");
    const item = await file.file.getItem();
    await item.update({
      TypeId: value.type,
    });
  }
};
