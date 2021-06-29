import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Spin,
  Form,
  Input,
  DatePicker,
  Row,
  Col
} from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { couponSelector, updateCoupon, reset } from 'state/coupon/reducer';
import moment from 'moment'
export default function ModalEditBanner({
  visible,
  action,
  data,
  filterConditions
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const { couponUpdate } = useSelector(couponSelector)
  const { loading, result } = couponUpdate
  useEffect(() => {
    form.setFieldsValue({
      title: data.title,
      point: parseInt(data.point),
      active_to: moment(data.active_to),
      description: data.description,
    });

  }, [data])
  useEffect(() => {
    if (result) {
      dispatch(reset())
      action()
    }
  }, [result])

  const onFinish = (values) => {
    dispatch(updateCoupon({ ...values, couponId: data.id, filterConditions }))
  };
  return (
    <ModalStyled
      title="Chỉnh sửa phiếu giảm giá"
      visible={visible}
      onCancel={action}
      centered={true}
      maskClosable={false}
      width={600}
      footer={null}
      className="custom_modal"
    >
      <div style={{ padding: 24 }}>
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              title: '',
              point: null,
              active_to: moment(),
              description: '',
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[
                {
                  required: true,
                  message: 'Tiêu đề không được để trống!'
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Row justify="space-between" gutter={8}>
              <Col span={12}>
                <Form.Item
                  label="Ngày hết hạn"
                  name="active_to"
                  rules={[
                    {
                      required: true,
                      message: 'Ngày hết hạn không được để trống!'
                    },
                  ]}
                >
                  <DatePickerStyled
                    allowClear={false}
                    format={'DD-MM-YYYY'}
                    defaultValue={moment()}
                    disabledDate={current => {
                      return current && current < moment();
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="point"
                  label="Điểm"
                  rules={[
                    {
                      required: true,
                      message: 'Điểm không được để trống!'
                    },
                  ]}
                >
                  <InputNumberStyled>
                    <Input type="number" defaultValue={parseInt(data.point)} />
                  </InputNumberStyled>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="Mô tả"
              rules={[
                {
                  required: true,
                  message: 'Mô tả không được để trống!'
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" >
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </ModalStyled>
  );
}


const ModalStyled = styled(Modal)`
  .ant-modal-header .ant-modal-title {
    font-weight: 600;
  }
`;
const DatePickerStyled = styled(DatePicker)`
  width: 100%;
`;
const InputNumberStyled = styled.div`
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
`;

