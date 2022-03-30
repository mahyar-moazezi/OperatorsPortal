import { Form, Upload } from "antd";
import { UploadElementTypes } from "./UploadElement.types";
import { Controller } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import Button from "antd-button-color";

const UploadElement = ({
  name,
  label,
  listType,
  fileList,
  isDisable,
  onRemove,
  className,
  required,
  maxCount,
}: UploadElementTypes) => {
  const dummyRequest = (option: any) => {
    setTimeout(() => {
      option.onSuccess("not-uploaded");
    }, 0);
  };
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          className={className}
          validateStatus={error && "error"}
          help={error?.message}
          required={required}
        >
          <Upload
            onChange={(e) => field.onChange(e.fileList)}
            fileList={field.value}
            multiple={true}
            listType={listType}
            disabled={isDisable}
            defaultFileList={fileList}
            onRemove={onRemove}
            customRequest={dummyRequest}
            maxCount={maxCount}
          >
            <Button
              type="info"
              ghost
              icon={<UploadOutlined className="text-xl mx-2" />}
            >
              بارگذاری فایل
            </Button>
          </Upload>
        </Form.Item>
      )}
    />
  );
};
export default UploadElement;
