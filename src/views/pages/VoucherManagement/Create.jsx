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
import ImageUploader from 'react-images-upload';
import { useDispatch, useSelector } from 'react-redux';
import { createCoupon, couponSelector } from 'state/coupon/reducer';
import moment from 'moment'
export default function ModalCreateBanner({
  visible,
  action,
  filterConditions
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const { loading, uploadResult } = useSelector(couponSelector)
  const [thumbnail, setThumnail] = useState(null);
  const [error, setError] = useState(false);
  const onDrop = (picture) => {
    if (picture) {
      setError(false)
    }
    setThumnail(picture);
  }
  useEffect(() => {
    if (uploadResult) {
      action()
    }
  }, [uploadResult])

  const onFinish = (values) => {
    if (!thumbnail) {
      setError(true)
    } else {
      let formData = new FormData()
      formData.append('thumbnail', thumbnail[0])
      formData.append('title', values.title)
      formData.append('point', values.point)
      formData.append('description', values.description)
      formData.append('active_to', moment(values.active_to).format('DD-MM-YYYY'))
      dispatch(createCoupon({ formData, filterConditions }))
    }
  };
  return (
    <ModalStyled
      title="Tạo mới phiếu giảm giá"
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
          <section id="register">
            <div className="container">
              <UploadImageStyled
                withIcon={true}
                label={'Dung lượng ảnh: < 5mb với định dạng: jpg, jpeg, png'}
                buttonText='Chọn ảnh mô tả'
                onChange={onDrop}
                imgExtension={['.jpg', '.png', '.jpeg']}
                maxFileSize={5242880}
                withPreview={true}
                fileTypeError="Định dạng ảnh không được hỗ trợ!"
                fileSizeError="Dung lượng file quá lớn!"
                singleImage={true}
              />
            </div>
            {error && <span style={{ color: 'red' }}>Vui lòng lựa chọn ảnh mô tả !</span>}
          </section>
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
                    <Input type="number" />
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
                Tạo mới
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

const UploadImageStyled = styled(ImageUploader)`
  .uploadPictureContainer .deleteImage {
    background: #464dda;
  }

  .fileContainer .uploadPicturesWrapper {
    > div {
      align-items: unset !important;
    }
  }
`

