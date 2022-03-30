import React from "react";
import { Form, InputNumber } from "antd";
import { Controller } from "react-hook-form";
import { InputNumberType } from "./InputNumberElement.types";

export const InputNumberElement = ({
  name,
  label,
  isDisable = false,
  placeHolder,
  min,
  max,
  maxLength,
  minLength,
  required,
}: InputNumberType) => {
  return (
    <Controller
      name={name}
      rules={{
        required: "همکار گرامی این فیلد اجباری است!",
      }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error && "error"}
          help={error?.message}
          required={required}
        >
          <InputNumber
            className={"w-full"}
            placeholder={placeHolder}
            min={min}
            max={max}
            maxLength={maxLength}
            minLength={minLength}
            // defaultValue={0}
            disabled={isDisable}
            value={field.value}
            onChange={field.onChange}
            stringMode={true}
            // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          />
        </Form.Item>
      )}
    />
  );
};
