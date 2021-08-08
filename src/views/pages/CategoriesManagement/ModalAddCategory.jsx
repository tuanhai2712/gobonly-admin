import React from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { createCategories, getCategories } from 'state/categories/reducer';
export default function ModalAddCategory({ visible, action }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch(createCategories(values));
    dispatch(getCategories());
    action();
  };
  return (
    <ModalStyled
      title="Tạo danh mục"
      visible={visible}
      onCancel={action}
      centered={true}
      maskClosable={false}
      width={350}
      footer={null}
      className="custom_modal"
    >
      <div style={{ padding: '0px 24px 24px' }}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            title: '',
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            label="Danh mục"
            rules={[
              {
                required: true,
                message: 'Tên danh mục không được để trống!',
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
