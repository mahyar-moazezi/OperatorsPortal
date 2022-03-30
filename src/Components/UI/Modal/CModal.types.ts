import { ReactNode } from "react";

export type ModalTypes = {
  children: ReactNode;
  title: ReactNode | string | null;
  closable: boolean;
  visible: boolean;
  width: number;
  destroyOnClose: boolean;
  footer?: ReactNode | string | null;
};
