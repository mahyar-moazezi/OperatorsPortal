import { Button } from "antd";
import { ButtonTypes } from "./CButton.types";
const CButton = ({
  text,
  type,
  clicked,
  icon,
  size,
  style = size === "small" ? { fontSize: "0.7rem" } : { minWidth: "130px" },
  htmlType,
  ghost = false,
  disable,
}: ButtonTypes) => {
  return (
    <>
      <Button
        type={type}
        ghost={ghost}
        onClick={clicked}
        icon={icon}
        size={size}
        style={style}
        htmlType={htmlType}
        disabled={disable}
      >
        <span className="mx-2">{text}</span>
      </Button>
    </>
  );
};
export default CButton;
