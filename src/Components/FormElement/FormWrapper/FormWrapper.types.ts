import { ComponentProps } from "react";

export type FormWrapperType = {
  className?: string;
  defaultValues?: any;
  onSubmit: (state: any) => void;
  mode: "onBlur" | "onChange" | "onSubmit" | "all" | "onTouched";
} & Omit<ComponentProps<"form">, "onSubmit">;
