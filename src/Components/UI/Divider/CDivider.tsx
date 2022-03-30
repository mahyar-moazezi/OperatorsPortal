import { Divider } from "antd";
import { DividerTypes } from "./CDivider.types";

const CDivider = ({ title }: DividerTypes) => {
  return (
    <>
      <Divider orientation="right">
        <p className="text-lg font-bold">{title}</p>
      </Divider>
    </>
  );
};

export default CDivider;
