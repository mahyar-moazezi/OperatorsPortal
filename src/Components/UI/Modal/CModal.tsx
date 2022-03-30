import { Modal, Spin } from "antd";
import React, { Suspense } from "react";
import CSkeleton from "../Skeleton/CSkeleton";
import { ModalTypes } from "./CModal.types";

const CModal = ({
  children,
  title,
  destroyOnClose,
  footer,
  visible,
  width,
  closable,
}: ModalTypes) => {
  return (
    <Modal
      title={<p className="text-lg font-bold">{title}</p>}
      width={width}
      visible={visible}
      destroyOnClose={destroyOnClose}
      closable={closable}
      footer={footer}
    >
      <Suspense fallback={<CSkeleton loading={true} children={""} />}>
        {children}
      </Suspense>
    </Modal>
  );
};
export default CModal;
