import React from "react";
import { Row, Table } from "antd";
import { TableTypes } from "./CTable.types";

const Tables = ({ dataSource, columns, loading, pagination }: TableTypes) => {
  return (
    <>
      <Row>
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          bordered
          sticky
          pagination={pagination}
          size={"small"}
          
        />
      </Row>
    </>
  );
};

export default Tables;
