import React, { useState, useEffect } from 'react';
import { Button, Modal, Upload, message, Row, Col, Input } from 'antd';
import styled from 'styled-components';
import { UploadOutlined } from '@ant-design/icons';
import Fade from 'react-reveal/Fade';
export default function ModalAddItems({
  visible,
  action,
  save,
  categorySelected
}) {
  const [fileList, setFileList] = useState([])
  useEffect(() => {
    if (categorySelected && categorySelected.items) {
      setFileList(categorySelected.items)
    } else {
      setFileList([])
    }
  }, [])
  console.log('fileList', fileList)
  console.log('categorySelected', categorySelected)
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
  }

  const props = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    beforeUpload,
    onChange(info) {
      setFileList((state) => [...state, { file: info.file, color: '' }])
    },
  };
  const getUrl = (file) => {
    return URL.createObjectURL(file)
  }

  const handleChangeColorCode = (event, idx) => {
    const { value } = event.target;
    const currentState = fileList
    currentState[idx].color = value
    setFileList(() => [...currentState])
  }
  return (
    <ModalStyled
      title="Cập nhật dữ liệu danh mục"
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
          <Col span={12}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Tải lên ảnh mẫu</Button>
            </Upload>
          </Col>
        </Row>
        <Row>
          {fileList.map((item, idx) => {
            const url = getUrl(item.file)
            return (
              <Col span={3} key={idx} style={{ padding: 5 }}>
                <Fade
                  duration={800}
                  delay={1 * 10}
                  style={{ height: '100%' }}
                >
                  <img src={url} alt="avatar" style={{ width: '100%' }} />
                </Fade>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Input size="small" value={item.color} style={{ height: 20, width: '70%' }} onChange={(event) => handleChangeColorCode(event, idx)} />
                  <div style={{ background: item.color, width: 20, height: 20, borderRadius: 10 }} />
                </div>
              </Col>
            )
          })}
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Button type="primary" onClick={() => save(fileList)} >
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
