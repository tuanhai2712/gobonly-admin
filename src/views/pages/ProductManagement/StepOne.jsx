import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Tree, Spin, Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, categoriesSelector } from 'state/categories/reducer';
import { BASE_URL } from 'utils/constants';
import NoResultFound from 'views/components/NoResult/no-result';
const treeData = [
  {
    title: 'Danh mục',
    key: '0',
    default: true,
    children: [],
  },
];
export default function StepOne({
  selectTemplates,
  templates,
  unCheckTemplateSelected,
  nextStep,
  step,
}) {
  useEffect(() => {
    document.title = 'Tạo dữ liệu';
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const [categoryChecked, setCategoryChecked] = useState([]);

  const { loading, data } = useSelector(categoriesSelector);

  const [tree, setTree] = useState(treeData);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (data.length) {
      setTree([
        {
          title: 'Danh mục',
          key: '0',
          default: true,
          children: data,
        },
      ]);
    }
  }, [data]);

  const onCheck = (checkedKeys, info) => {
    if (info && info.node && info.node.items) {
      info.node.items.map((item) => {
        setCategoryChecked((prevArray) => [
          ...prevArray,
          {
            ...item,
            category_name: info.node.title,
          },
        ]);
      });
    }
  };

  const selectTemplate = (item) => {
    selectTemplates(item);
  };
  const unCheck = (item) => {
    unCheckTemplateSelected(item);
  };
  return (
    <Fragment>
      <Spin spinning={loading}>
        <Row>
          <Col span={4}>
            <Tree
              checkable
              showLine
              allowDrop={true}
              autoExpandParent={true}
              selectable={true}
              multiple={false}
              defaultExpandAll={true}
              treeData={tree}
              onCheck={onCheck}
            />
          </Col>
          <Col span={20}>
            <Row>
              {categoryChecked && categoryChecked.length ? (
                categoryChecked.map((item, idx) => {
                  const url = BASE_URL + item.url;
                  return (
                    <Col span={4} key={idx} style={{ padding: 5 }}>
                      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        {item.category_name}
                      </div>
                      <ImageWrapper onClick={() => selectTemplate(item)}>
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
                      {templates.map((itemSelected) => {
                        if (itemSelected.id === item.id) {
                          return (
                            <SelectWrapper
                              onClick={() => unCheck(item)}
                              key={itemSelected.id}
                            >
                              <CheckOutlined />
                            </SelectWrapper>
                          );
                        }
                      })}
                    </Col>
                  );
                })
              ) : (
                <NoResultFound
                  title={'Vui lòng lựa chọn mẫu từ danh mục!'}
                  width={'30%'}
                />
              )}
            </Row>
            <div style={{ textAlign: 'end', marginTop: 20 }}>
              <Button
                onClick={() => nextStep(step)}
                type="primary"
                disabled={!templates.length}
              >
                Tiếp tục
              </Button>
            </div>
          </Col>
        </Row>
      </Spin>
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
