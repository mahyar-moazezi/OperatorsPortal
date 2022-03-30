export type UploadElementTypes = {
  className?: string;
  isDisable?: boolean;
  onRemove?: (e: any) => Promise<any>;
  name: string;
  listType?: "text" | "picture" | "picture-card";
  label?: string;
  fileList?: {
    name: string;
    uid: string;
    status: "error" | "success" | "done" | "uploading" | "removed";
    url: string;
  }[];
  required: boolean;
  maxCount?: number;
};
