import React from "react";
import CDescription from "../../../../../../Components/UI/Description/CDescription";
import { useSetRecoilState } from "recoil";
import { modalOpener } from "../../../../../../Store/Atoms/Atoms";
import Button from "antd-button-color";
import { Row } from "antd";
import { CloseOutlined } from "@ant-design/icons";
export type DetailViewTypes = {
  items?: { label?: string; value?: any }[];
};

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
