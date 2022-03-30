export type SelectType = {
  isMultiple?: boolean;
  labelInValue?: boolean;
  label?: string;
  name: string;
  placeHolder: string;
  isDisable?: boolean;
  showSearch: boolean;
  loading?: boolean;
  isFetching?: boolean;
  option?: {
    value: string[];
    label: string;
  }[];
  required: boolean;
};
