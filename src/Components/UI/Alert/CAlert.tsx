import { Alert } from "antd";
import { AlertTypes } from "./CAlert.types";

const CAlert = ({ message, type }: AlertTypes) => {
  return (
    <>
      <Alert message={message} type={type} showIcon className="m-2" />
    </>
  );
};

export default CAlert;
