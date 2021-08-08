import React from 'react';
import { Button, Modal, Input, Form, Spin } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { createSize, sizeSelector } from 'state/size/reducer';
export default function ModalCreateSize({ visible, action }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector(sizeSelector);
  const onFinish = (values) => {
    dispatch(createSize(values));
  };
  return (
    <ModalStyled
      title="Tạo mới size"
      visible={visible}
      onCancel={action}
      centered={true}
      maskClosable={false}
      width={300}
      footer={null}
      className="custom_modal"
    >
      <Spin spinning={loading}>
        <div style={{ padding: '0px 24px 24px' }}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              name: '',
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Size"
              rules={[
                {
                  required: true,
                  message: 'Tên Size không được để trống!',
                },
              ]}
              style={{ width: '100%' }}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </ModalStyled>
  );
}

const ModalStyled = styled(Modal)`
  .ant-modal-header .ant-modal-title {
    font-weight: 600;
  }
`;
