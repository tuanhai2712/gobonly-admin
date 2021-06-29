import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, signIn } from 'state/auth/reducer';
import { Form, Input, Button, Row, Col, Spin } from 'antd';
import './style.scss';
const background_app = require('assets/images/background.jpg');
export default function Login() {
  useEffect(() => {
    document.title = 'Đăng nhập';
    window.scrollTo(0, 0);
  }, []);
  const { loading, user } = useSelector(authSelector)
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onLogin = useCallback((values) => {
    dispatch(signIn(values))
  }, []);

  return (
    <Spin spinning={loading}>
      <Row
        id="login"
        justify="center"
        align="middle"
        style={{ backgroundImage: `url(${background_app})` }}
      >
        <Col span={7}>
          <div className="form_login">
            <Form name="basic" onFinish={onLogin} form={form}>
              <Row align="middle" type="flex" className="mb-1">
                <Col span={24} className="text_center">
                  <img
                    src={
                      'https://onthiielts.com.vn/wp-content/uploads/2019/04/tiw-logo.png?fbclid=IwAR3sUph0GsMb4ylqlGYEhzQtlwgHB9V8yeS4vQfZxXuVjW2_7MaWxzgSq3k'
                    }
                    alt="logo"
                    width={100}
                  />
                </Col>
              </Row>
              <Row align="middle" type="flex" className="mb-1">
                <Col span={24} className="text_center">
                  <h3 className="title_login">Hệ thống quản trị</h3>
                </Col>
              </Row>
              <Row align="middle" type="flex">
                <Col span={24}>
                  <Form.Item
                    className="mb-1"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập tài khoản!',
                      },
                    ]}
                  >
                    <Input placeholder={'Tài khoản'} />
                  </Form.Item>
                </Col>
              </Row>

              <Row align="middle" type="flex">
                <Col span={24}>
                  <Form.Item
                    className="mb-1 input-pass"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu',
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder={'Mật khẩu'}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item className="mb-0">
                <Button type="primary" htmlType="submit" className="full">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Spin>
  );
}
