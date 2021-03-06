import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Button, Upload, message, Row, Col, Slider } from 'antd';
import { UploadOutlined, CheckOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import NoResultFound from 'views/components/NoResult/no-result';
import Fade from 'react-reveal/Fade';
import { BASE_URL } from 'utils/constants';
import * as htmlToImage from 'html-to-image';

export default function StepTwo({ templates }) {
  useEffect(() => {
    document.title = 'Tạo dữ liệu';
    window.scrollTo(0, 0);
  }, []);
  const imageRef = useRef();
  const [logoList, setLogoList] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [selectedLogo, setSelectedLogo] = useState(0);
  const [logoSize, setLogoSize] = useState(50);
  const [products, setProducts] = useState([]);
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

  const logoProps = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    beforeUpload,
    onChange(info) {
      setLogoList((state) => [...state, info.file]);
    },
  };

  const getUrl = (file) => {
    return URL.createObjectURL(file);
  };
  const setSize = (size) => {
    setLogoSize(size);
  };

  const exportPNG = async () =>
    new Promise(async (resolve) => {
      const url = await htmlToImage.toPng(imageRef.current);
      if (url) {
        resolve(url);
      }
    });

  const exportData = async () => {
    for (let index = 0; index < templates.length; index++) {
      setSelectedTemplate(index);
      await exportPNG().then((result) => {
        console.log('result', result);
        if (result) {
          setProducts((prevArray) => [...prevArray, result]);
        }
      });
    }
  };
  return (
    <Fragment>
      <Row gutter={8}>
        <Col span={12}>
          <Row>
            <Upload {...logoProps}>
              <Button icon={<UploadOutlined />}>Tải lên logo</Button>
            </Upload>
          </Row>
          <Row gutter={8} style={{ marginLeft: 0, marginTop: 10 }}>
            <Col span={12} style={{ padding: 5, border: '1px solid #e6dfdf' }}>
              <Row>
                {logoList.map((file, idx) => {
                  const url = getUrl(file);
                  return (
                    <Col span={6} key={idx} style={{ padding: 5 }}>
                      <ImageWrapper onClick={() => setSelectedLogo(idx)}>
                        <Fade
                          duration={800}
                          delay={1 * 10}
                          style={{ height: '100%' }}
                        >
                          <img src={url} alt="logo" style={{ width: '100%' }} />
                        </Fade>
                      </ImageWrapper>
                      {selectedLogo === idx && (
                        <SelectWrapper onClick={() => setSelectedLogo(null)}>
                          <CheckOutlined />
                        </SelectWrapper>
                      )}
                    </Col>
                  );
                })}
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                {templates.map((template, idx) => {
                  const url = BASE_URL + template.url;
                  return (
                    <Col span={6} key={idx} style={{ padding: 5 }}>
                      <ImageWrapper onClick={() => setSelectedTemplate(idx)}>
                        <Fade
                          duration={800}
                          delay={1 * 10}
                          style={{ height: '100%' }}
                        >
                          <img
                            src={url}
                            alt="avatar"
                            style={{ width: '100%' }}
                          />
                        </Fade>
                      </ImageWrapper>
                      {selectedTemplate === idx && (
                        <SelectWrapper
                          onClick={() => setSelectedTemplate(null)}
                        >
                          <CheckOutlined />
                        </SelectWrapper>
                      )}
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
          {products.length ? (
            products.map((product, idx) => {
              return (
                <Col span={6} key={idx}>
                  <img src={product} style={{ width: '100%' }} alt="img" />
                </Col>
              );
            })
          ) : (
            <div />
          )}
        </Col>
        <Col span={12}>
          {templates.length && logoList.length ? (
            <>
              <Row style={{ marginTop: 20 }} justify="center">
                <div style={{ width: 200 }}>
                  <span
                    style={{ marginLeft: 4 }}
                  >{`Logo Size: ${logoSize}`}</span>
                  <Slider
                    step
                    max={200}
                    min={10}
                    defaultValue={50}
                    onChange={(value) => setSize(value)}
                  />
                </div>
              </Row>
              <Row style={{ marginTop: 10 }} justify="center">
                <Col span={12}>
                  <div ref={imageRef}>
                    <Fade
                      duration={800}
                      delay={1 * 10}
                      style={{ height: '100%' }}
                    >
                      <img
                        src={`data:image/png;base64,${templates[selectedTemplate].url_base_64}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'relative',
                        }}
                        alt="img"
                      />
                      <DraggableWrapper>
                        <Draggable bounds="parent">
                          <img
                            src={getUrl(logoList[selectedLogo])}
                            style={{
                              width: logoSize,
                            }}
                            alt="img"
                          />
                        </Draggable>
                      </DraggableWrapper>
                    </Fade>
                  </div>
                </Col>
              </Row>
            </>
          ) : (
            <Row style={{ marginTop: 20 }}>
              <Col span={24}>
                <NoResultFound title={'Chưa có dữ liệu mẫu!'} width={'50%'} />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <div style={{ textAlign: 'end' }}>
        <Button onClick={() => exportData()} type="primary">
          Tiếp tục
        </Button>
      </div>
    </Fragment>
  );
}

const ImageWrapper = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const SelectWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #f3f3f3;
  background: #06020033;
  color: #019376;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 20px;
  :hover {
    cursor: pointer;
  }
`;
const DraggableWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;
