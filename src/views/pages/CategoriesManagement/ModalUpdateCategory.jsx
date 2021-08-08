import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Input, Select, Form } from 'antd';
import styled from 'styled-components';
import { getSize, sizeSelector } from 'state/size/reducer';
import { useDispatch, useSelector } from 'react-redux';
const { Option } = Select;
export default function ModalAddItems({ visible, action, save }) {
  const dispatch = useDispatch();
  const [sizeSelected, setSizeSelected] = useState({});
  const { loading, data } = useSelector(sizeSelector);
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(getSize());
  }, [dispatch]);

  const selectSize = (selected) => {
    setSizeSelected({ size: selected });
  };
  const onFinish = (values) => {};
  return (
    <ModalStyled
      title="Cập nhật danh mục"
      visible={visible}
      onCancel={action}
      centered={true}
      maskClosable={false}
      width={500}
      footer={null}
      className="custom_modal"
    >
      <div style={{ padding: '0px 24px 24px' }}>
        <Row>
          <Col span={24}>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                title: '',
                content: '',
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Size"
                name="size"
                rules={[
                  {
                    required: true,
                    message: 'Size không được để trống!',
                  },
                ]}
              >
                <SelectStyled
                  placeholder="Lựa chọn size"
                  loading={loading}
                  mode="multiple"
                  maxTagCount="responsive"
                  onChange={selectSize}
                >
                  {data.length &&
                    data.map((item) => {
                      return (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                </SelectStyled>
              </Form.Item>
              <Form.Item
                label="Tên danh mục"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Tên danh mục không được để trống!',
                  },
                ]}
              >
                <Input placeholder="Tên danh mục" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </ModalStyled>
  );
}

const ModalStyled = styled(Modal)`
  .ant-modal-header .ant-modal-title {
    font-weight: 600;
  }
`;

const SelectStyled = styled(Select)`
  width: 100%;
`;
