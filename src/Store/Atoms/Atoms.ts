import { atom } from "recoil";

type ModalTypes = {
  isOpen: boolean;
  type?: "NEW_ITEM" | "EDIT_ITEM" | "SHOW_ITEM" | "PROFILE_ITEM";
  data?: any;
};
export const modalOpener = atom({
  key: "modalOpener",
  default: {} as ModalTypes,
});
