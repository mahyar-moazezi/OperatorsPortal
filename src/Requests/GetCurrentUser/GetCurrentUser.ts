import { getWeb } from "../../Config/WebConfig/WebConfig";
let web = getWeb().kcm;
//---------------دریافت اطلاعات کاربر----------------------
export const getCurrentUser = async () => {
  return await web.currentUser();
};
