import { message } from "antd";
export const messages = {
  success: " با موفقیت ثبت گردید.",
  error: "درخواست شما با خطا مواجه شد.",
  sameValue: "اطلاعات وارد شده قبلا ثبت شده است.",
  inProgress:"درخواست شما در حال بررسی توسط واحد فروش می باشد.",
  
};
export const onSuccessMessage = () => {
  return message.success(messages.success);
};
export const onErrorMessage = (item: string) => {
  console.log(`Error => ${item}`);
  return message.error(messages.error);
};
export const onSameValueMessage = () => {
  return message.warning(messages.sameValue);
};
