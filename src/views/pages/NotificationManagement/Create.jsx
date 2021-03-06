import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Spin,
  Form,
  Input,
  Row,
  Col,
  Radio,
  Tabs,
  Select
} from 'antd';
import styled from 'styled-components';
import ImageUploader from 'react-images-upload';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification, getCourse, getClass, notificationSelector, reset } from 'state/notification/reducer';
import { SEND_NOTIFICATION_TYPE_ALL, SEND_NOTIFICATION_TO_CLASS, TAB_NOTI_NORMAL, TAB_NOTI_CLASS_REVIEW, TAB_NOTI_WITH_POST } from 'utils/constants'

const { TabPane } = Tabs;
const { Option } = Select;
export default function ModalCreateNotification({
  visible,
  action
}) {
  const [form] = Form.useForm();
  const [formWithPost] = Form.useForm();
  const [formReview] = Form.useForm();
  const dispatch = useDispatch()
  const { create, course, classes } = useSelector(notificationSelector)
  const [sendType, setSendType] = useState(SEND_NOTIFICATION_TYPE_ALL)
  const [tabSelected, setTabSelected] = useState(TAB_NOTI_NORMAL)
  const [courseSelected, setCourseSelected] = useState(null)
  const [classesSelected, setClassesSelected] = useState([])
  const [error, showError] = useState(false);
  const selectSendType = e => {
    if (e.target.value === SEND_NOTIFICATION_TYPE_ALL) {
      dispatch(reset())
      setClassesSelected([])
      setCourseSelected(null)
    }
    setSendType(e.target.value);
  };

  useEffect(() => {
    if (sendType === SEND_NOTIFICATION_TO_CLASS) {
      dispatch(getCourse({ page: 1, pageSize: 999 }))
    }
  }, [sendType])
  useEffect(() => {
    if (courseSelected) {
      dispatch(getClass({ page: 1, pageSize: 999, productId: courseSelected }))
    }
  }, [courseSelected])
  useEffect(() => {
    if (create.result) {
      action()
      dispatch(reset())
    }
  }, [create])

  const onFinish = (values) => {
    if (sendType === SEND_NOTIFICATION_TO_CLASS && !classesSelected.length) {
      showError(true)
    } else {
      const payload = {
        ...values,
        type: sendType,
        content_type: tabSelected,
        classes: classesSelected,
      }
      dispatch(createNotification(payload))
    }
  };
  const selectCourse = (selected) => {
    setCourseSelected(selected)
    setClassesSelected([])
  }
  const selectClasses = (selected) => {
    setClassesSelected(selected)
  }

  const changeTab = (key) => {
    setTabSelected(key)
  }
  return (
    <ModalStyled
      title="T???o m???i th??ng b??o"
      visible={visible}
      onCancel={action}
      centered={true}
      maskClosable={false}
      width={900}
      footer={null}
      className="custom_modal"
    >
      <div style={{ padding: '0px 24px 24px' }}>
        <Row gutter={8} style={{ marginBottom: 20 }}>
          <Col>
            <span style={{ fontWeight: 700 }}>H??nh th???c g???i:</span>
          </Col>
          <Col>
            <Radio.Group onChange={selectSendType} value={sendType}>
              <Radio value={SEND_NOTIFICATION_TYPE_ALL}>G???i t???t c???</Radio>
              <Radio value={SEND_NOTIFICATION_TO_CLASS}>G???i t???i l???p</Radio>
            </Radio.Group>
          </Col>
        </Row>
        {sendType === SEND_NOTIFICATION_TO_CLASS &&
          <Row gutter={8} style={{ marginBottom: 20 }}>
            <Col span={12}>
              <SelectStyled placeholder="L???a ch???n kh??a h???c" loading={course.loading} onChange={selectCourse}>
                {course.data && course.data.length && course.data.map((item) => {
                  return (
                    <Option value={item.id} key={item.id}>{item.name}</Option>
                  )
                })}
              </SelectStyled>
            </Col>
            <Col span={12}>
              <SelectStyled value={classesSelected} placeholder="L???a ch???n l???p" loading={classes.loading} mode="multiple" maxTagCount='responsive' onChange={selectClasses}>
                {classes.data && classes.data.length && classes.data.map((item) => {
                  return (
                    <Option value={item.id} key={item.id}>{item.name}</Option>
                  )
                })}
              </SelectStyled>
              {error && <p style={{ color: "#ff4d4f" }}>Vui l??ng l???a ch???n l???p</p>}
            </Col>
          </Row>
        }


        <Spin spinning={create.loading}>
          <Tabs activeKey={tabSelected} defaultActiveKey={TAB_NOTI_NORMAL} onChange={changeTab}>
            <TabPane tab="Th??ng b??o th?????ng" key={TAB_NOTI_NORMAL}>
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
                  name="title"
                  label="Ti??u ?????"
                  rules={[
                    {
                      required: true,
                      message: 'Ti??u ????? kh??ng ???????c ????? tr???ng!'
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="content"
                  label="M?? t???"
                  rules={[
                    {
                      required: true,
                      message: 'M?? t??? kh??ng ???????c ????? tr???ng!'
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" >
                    T???o m???i
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Th??ng b??o ????nh gi?? l???p" key={TAB_NOTI_CLASS_REVIEW}>
              <Form
                form={formReview}
                layout="vertical"
                initialValues={{
                  title: '',
                  content: '',
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="title"
                  label="Ti??u ?????"
                  rules={[
                    {
                      required: true,
                      message: 'Ti??u ????? kh??ng ???????c ????? tr???ng!'
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="content"
                  label="M?? t???"
                  rules={[
                    {
                      required: true,
                      message: 'M?? t??? kh??ng ???????c ????? tr???ng!'
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" >
                    T???o m???i
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Th??ng b??o v???i b??i vi???t" key={TAB_NOTI_WITH_POST}>
              <Form
                form={formWithPost}
                layout="vertical"
                initialValues={{
                  title: '',
                  content: '',
                  post: '',
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="title"
                  label="Ti??u ?????"
                  rules={[
                    {
                      required: true,
                      message: 'Ti??u ????? kh??ng ???????c ????? tr???ng!'
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="post"
                  label="Link b??i vi???t"
                  rules={[
                    {
                      required: true,
                      message: 'Link b??i vi???t kh??ng ???????c ????? tr???ng!'
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="content"
                  label="M?? t???"
                  rules={[
                    {
                      required: true,
                      message: 'M?? t??? kh??ng ???????c ????? tr???ng!'
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" >
                    T???o m???i
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Spin>
      </div>
    </ModalStyled >
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

