import { memo } from "react";
import { Form } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { FormWrapperType } from "./FormWrapper.types";

const Provider = FormProvider as any;

export const FormWrapper = memo(
  ({ children, onSubmit, defaultValues, className, mode }: FormWrapperType) => {
    const { control, handleSubmit, setValue, reset, clearErrors, trigger } = useForm(
      { defaultValues, mode: `${mode}` }
    );

    return (
      <Provider
        control={control}
        setValue={setValue}
        reset={reset}
        trigger={trigger}
        clearErrors={clearErrors}
      >
        <Form
          onFinish={handleSubmit(onSubmit)}
          className={className}
          layout="vertical"
        >
          {children}
        </Form>
      </Provider>
    );
  }
);
