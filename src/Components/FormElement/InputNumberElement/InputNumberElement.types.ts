import { ReactNode } from "react";

export type InputNumberType = {
  label?: string | ReactNode;
  name: string;
  isDisable?: boolean;
  placeHolder?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
  required:boolean
};
