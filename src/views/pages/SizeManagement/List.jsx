import React, { Fragment, useEffect, useState } from 'react';
import { Button, Row, Spin, Col, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getSize, sizeSelector } from 'state/size/reducer';
import ModalCreateSize from './Create';
import TableData from './TableData';
export default function List() {
  useEffect(() => {
    document.title = 'Quản lý size';
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const { loading, data } = useSelector(sizeSelector);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(getSize());
  }, [dispatch]);
  const openModalCreate = () => {
    setVisible(!visible);
  };
  return (
    <Fragment>
      <div className="container user_list">
        <Row style={{ marginBottom: 10 }} justify="space-between">
          <Col
            span={24}
            className="btn-create-user"
            style={{ textAlign: 'end' }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => openModalCreate()}
            >
              Tạo dữ liệu
            </Button>
          </Col>
        </Row>
        <Spin spinning={loading}>
          <Table
            showSorterTooltip={false}
            dataSource={data}
            columns={TableData()}
            className="full mt-1"
            loading={loading}
            rowKey="id"
            scroll={{ x: true }}
            pagination={false}
          />
        </Spin>
      </div>
      {visible && (
        <ModalCreateSize visible={visible} action={() => openModalCreate()} />
      )}
    </Fragment>
  );
}
