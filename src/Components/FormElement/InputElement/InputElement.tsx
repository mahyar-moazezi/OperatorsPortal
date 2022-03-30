import React from "react";
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import { InputType } from "./InputElement.types";

export const InputElement = ({
  name,
  label,
  placeHolder,
  isDisable = false,
  type = "text",
  min,
  max,
  maxLength,
  minLength,
  required
}: InputType) => {
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
          <Input
            type={type}
            value={field.value}
            onChange={field.onChange}
            disabled={isDisable}
            placeholder={placeHolder}
            min={min}
            max={max}
            maxLength={maxLength}
            minLength={minLength}
          />
        </Form.Item>
      )}
    />
  );
};
