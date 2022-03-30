import { PopConfirmTypes } from "./CPopConfirm.types";
import { Popconfirm } from "antd";
export const CPopConfirm = ({
  onConfirm,
  title,
  okText,
  okType,
  cancelText,
  children,
}: PopConfirmTypes) => {
  return (
    <>
      <Popconfirm
        onConfirm={onConfirm}
        title={title}
        okText={okText}
        okType={okType}
        cancelText={cancelText}
      >
        {children}
      </Popconfirm>
    </>
  );
};
