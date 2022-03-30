import React, { ReactNode } from "react";
export type ButtonTypes = {
  type?: any;
  clicked?: () => void;
  icon?: ReactNode;
  size?: any;
  text?: String;
  style?: React.CSSProperties;
  htmlType?: "submit" | "reset" | "button";
  ghost?: boolean;
  disable?: boolean;
};
