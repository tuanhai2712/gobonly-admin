import React, { useState, useEffect } from 'react';
import { Button, Modal, Upload, message, Row, Col, Input, Select } from 'antd';
import styled from 'styled-components';
import { UploadOutlined } from '@ant-design/icons';
import Fade from 'react-reveal/Fade';
import { getSize } from 'state/size/reducer';
import { useDispatch } from 'react-redux';
export default function ModalAddItems({
  visible,
  action,
  save,
  categorySelected,
}) {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  console.log('categorySelected', categorySelected);
  useEffect(() => {
    dispatch(getSize());
  }, [dispatch]);
  const beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    if (!isJPG && !isPNG) {
      message.error('You can only upload JPG or PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isPNG && isLt2M;
  };

  const props = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    beforeUpload,
    onChange(info) {
      setFileList((state) => [...state, { file: info.file, color: '' }]);
    },
  };
  const getUrl = (file) => {
    return URL.createObjectURL(file);
  };

  const handleChangeColorCode = (event, idx) => {
    const { value } = event.target;
    const currentState = fileList;
    currentState[idx].color = value;
    setFileList(() => [...currentState]);
  };

  return (
    <ModalStyled
      title="Tải lên dữ liệu ảnh mẫu"
      visible={visible}
      onCancel={action}
      centered={true}
      maskClosable={false}
      width={850}
      footer={null}
      className="custom_modal"
    >
      <div style={{ padding: '0px 24px 24px' }}>
        <Row>
          <Col span={6}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Tải lên ảnh mẫu</Button>
            </Upload>
          </Col>
        </Row>
        <Row>
          {fileList.map((item, idx) => {
            const url = getUrl(item.file);
            return (
              <Col span={3} key={idx} style={{ padding: 5 }}>
                <Fade duration={800} delay={1 * 10} style={{ height: '100%' }}>
                  <img src={url} alt="avatar" style={{ width: '100%' }} />
                </Fade>
                <Input
                  size="small"
                  value={item.color}
                  style={{ height: 20 }}
                  onChange={(event) => handleChangeColorCode(event, idx)}
                />
                <div
                  style={{
                    background: item.color,
                    width: '100%',
                    height: 20,
                    borderRadius: 10,
                    marginTop: 5,
                  }}
                />
              </Col>
            );
          })}
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Button type="primary" onClick={() => save(fileList)}>
            Lưu
          </Button>
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
