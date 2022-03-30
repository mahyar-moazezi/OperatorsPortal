import React from "react";
import { SearchbarTypes } from "./CSearchbar.types";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const CSearchbar = ({ onSearch }: SearchbarTypes) => {
  return (
    <Input
      name={"searchBar"}
      placeholder={"جستجو"}
      onChange={onSearch}
      prefix={<SearchOutlined />}
      className="w-full my-2 md:m-0 md:w-5/12"
    />
  );
};

export default CSearchbar;
