import { ReactNode } from "react";

export type InputType = {
  label?: string | ReactNode;
  name: string;
  placeHolder?: string;
  isDisable?: boolean;
  type?: "tel" | "text" | "number" | "email";
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
  required:boolean
};
