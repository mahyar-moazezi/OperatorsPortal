import { ReactNode } from "react";
export type PopConfirmTypes = {
  title: string;
  okText: string;
  cancelText: string;
  okType: any;
  onConfirm?: () => void;
  children: ReactNode;
};
