import { Skeleton } from "antd";
import { SkeletonTypes } from "./CSkeleton.types";

const CSkeleton = ({ loading, children }: SkeletonTypes) => {
  return (
    <>
      <Skeleton active loading={loading}>
        {children}
      </Skeleton>
    </>
  );
};

export default CSkeleton;
