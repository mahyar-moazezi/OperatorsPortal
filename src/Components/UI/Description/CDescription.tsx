import React from "react";
import { Descriptions } from "antd";
import { DescriptionTypes } from "./CDescription.types";
const CDescription = ({ items }: DescriptionTypes) => {
  return (
    <Descriptions
      bordered
      column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      size="small"
    >
      {items?.map((item: any) => (
        <Descriptions.Item label={item.label} key={item.label}>
          {item.value}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

export default CDescription;
