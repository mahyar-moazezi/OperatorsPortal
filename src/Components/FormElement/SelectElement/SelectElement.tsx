import React from "react";
import { Form, Select, Spin } from "antd";
import { Controller } from "react-hook-form";
import { SelectType } from "./SelectElement.types";

export const SelectElement = ({
  name,
  label,
  placeHolder,
  showSearch,
  labelInValue = false,
  option = [],
  isDisable = false,
  isMultiple = false,
  loading,
  isFetching,
  required,
}: SelectType) => {
  const { Option } = Select;
  return (
    <Controller
      name={name}
      rules={{ required: "همکار گرامی این فیلد اجباری است!" }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error && "error"}
          help={error?.message}
          required={required}
        >
          {isMultiple ? (
            <Select
              value={field.value}
              mode="multiple"
              showSearch={showSearch}
              onChange={field.onChange}
              disabled={isDisable}
              loading={loading}
              notFoundContent={isFetching ? <Spin size="small" /> : null}
              placeholder={placeHolder}
            >
              {option.map((item: any) => (
                <Option key={item?.label} value={item?.value}>
                  {item?.label}
                </Option>
              ))}
            </Select>
          ) : (
            <Select
              value={field.value}
              showSearch={showSearch}
              labelInValue={labelInValue}
              onChange={field.onChange}
              disabled={isDisable}
              loading={loading}
              notFoundContent={
                isFetching ? <Spin size="small" /> : <p>موردی یافت نشد</p>
              }
              placeholder={placeHolder}
            >
              {option.map((item: any) => (
                <Option key={item?.value} value={item?.value}>
                  {item?.label}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      )}
    />
  );
};
