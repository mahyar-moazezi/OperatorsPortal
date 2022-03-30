import React from "react";
import { Result } from "antd";
import { ResultsTypes } from "./CResult.types";
const CResult = ({ status, title, extra }: ResultsTypes) => {
  return (
    <div className="flex justify-center">
      <Result status={status} title={title} extra={extra} />
    </div>
  );
};

export default CResult;
