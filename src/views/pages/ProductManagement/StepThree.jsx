import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Button, Row, Col } from 'antd';
import styled from 'styled-components';
import * as htmlToImage from 'html-to-image';
export default function StepThree() {
  useEffect(() => {
    document.title = 'Tạo dữ liệu';
    window.scrollTo(0, 0);
  }, []);
  const imageRef = useRef();
  const [fileList, setFileList] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [products, setProducts] = useState([]);

  const exportPNG = async () =>
    new Promise(async (resolve) => {
      const url = await htmlToImage.toPng(imageRef.current);
      if (url) {
        resolve(url);
      }
    });

  const exportData = async () => {
    for (let index = 0; index < fileList.length; index++) {
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
      <Row>
        <Col span={8}>
          <Button onClick={() => exportData()}>Xuất sản phẩm</Button>
          <Row>
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
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
}
