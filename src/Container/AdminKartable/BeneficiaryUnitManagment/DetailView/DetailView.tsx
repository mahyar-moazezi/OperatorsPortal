import CDescription from "../../../../Components/UI/Description/CDescription";
import { DetailViewTypes } from "./DetailView.types";
import Button from "antd-button-color";
import { useSetRecoilState } from "recoil";
import { modalOpener } from "../../../../Store/Atoms/Atoms";
import { CloseOutlined } from "@ant-design/icons";
import { Row } from "antd";

const DetailView = ({ items }: DetailViewTypes) => {
  const setModalOpenerValue = useSetRecoilState(modalOpener); //ست کردن استیت مودال

  return (
    <>
      <CDescription items={items} />
      <Row justify="center" className="mt-6">
        {" "}
        <Button
          onClick={() =>
            setModalOpenerValue({
              isOpen: false,
            })
          }
          type={"danger"}
          ghost
          icon={<CloseOutlined className=" mx-1" />}
          style={{ minWidth: "130px" }}
        >
          بستن
        </Button>
      </Row>
    </>
  );
};

export default DetailView;
