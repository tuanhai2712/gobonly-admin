import React, { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Row,
  Spin,
  Col,
  Tree,
  Input
} from 'antd';
import {
  PlusOutlined,
  FormOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createCategories, categoriesSelector } from 'state/categories/reducer';
import styled from 'styled-components';
import ModalAddItems from './ModalAddItems'

const treeData = [{
  title: 'Danh mục',
  key: '0',
  default: true,
  children: [
  ]
}]
  ;
export default function List() {
  useEffect(() => {
    document.title = 'Quản lý danh mục';
    window.scrollTo(0, 0);
  }, []);
  const [tree, setTree] = useState(treeData)
  const [visible, setVisible] = useState(false)
  const [categorySelected, setCategorySelected] = useState(null)
  const [expandedKeys, setExpandedKeys] = useState([])
  const { loading, data } = useSelector(categoriesSelector)
  const dispatch = useDispatch()

  useEffect(() => {

  }, [])
  const addParentNode = (node) => {
    const currentTree = tree;
    const findNode = currentTree.find((i) => i.key === node.key)
    if (findNode) {
      findNode.children = [
        ...findNode.children,
        {
          title: '',
          key: `${node.key}-${findNode.children.length}`,
          children: [],
          items: [],
        }
      ]
    }
    setExpandedKeys((state) => [...state, ...findNode.key])
    setTree((state) => ([
      ...currentTree
    ]))
  }

  const findNode = (keyFind, currentTree) => {
    let result = currentTree.map((item, idx) => {
      if (item.key === keyFind) {
        return item;
      }
      return findNode(keyFind, item.children)
    })
    result = result.filter(function (element) {
      return element !== undefined;
    });
    if (result.length) {
      return result[0];
    }

  }
  const addChildrenNode = (node) => {
    const currentTree = tree;
    const find = findNode(node.key, currentTree)
    if (find) {
      find.children = [
        ...find.children,
        {
          title: '',
          key: `${node.key}-${find.children.length}`,
          children: [],
          items: [],
        }
      ]
    }
    setExpandedKeys((state) => [...state, find.key])
    setTree((state) => ([
      ...currentTree
    ]))

  }

  const buildFormData = (formData, data, parentKey) => {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
      formData.append(parentKey, value);
    }
  }

  const saveCategories = () => {
    console.log('tree[0].children', tree[0].children)
    if (tree[0].children) {
      const formData = new FormData();
      buildFormData(formData, tree[0].children);
      dispatch(createCategories(formData))
    }
  }

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys)
  }

  const handleOpenModal = (node) => {
    setVisible(!visible)
    setCategorySelected(node)
  }

  const saveItemsToCategory = (items) => {
    const currentTree = tree;
    const find = findNode(categorySelected.key, currentTree)
    if (find) {
      find.items = [...items]
    }
    setTree((state) => ([
      ...currentTree
    ]))
    setVisible(!visible)
    setCategorySelected(null)
  }

  const handleChangeNode = (event, node) => {
    const { value } = event.target
    const currentTree = tree;
    const find = findNode(node.key, currentTree)
    if (find) {
      find.title = value
    }
    setTree((state) => ([
      ...currentTree
    ]))
  }
  return (
    <Fragment>
      <Row style={{ marginBottom: 20 }}>
        <Button disabled={!tree[0].children.length} type="primary" onClick={() => saveCategories()} >
          Lưu
        </Button>
      </Row>
      <Spin spinning={false}>
        <Row type="flex">
          <Col span={6}>
            <TreeStyled
              showLine
              allowDrop={true}
              autoExpandParent={false}
              selectable={false}
              expandedKeys={[...expandedKeys]}
              defaultExpandAll={true}
              treeData={tree}
              onExpand={onExpand}
              titleRender={(node) => {
                if (!node.default) {
                  return (
                    <NodeStyled>
                      <Input value={node.title} style={{ height: 25 }} onChange={(event) => handleChangeNode(event, node)} />
                      {node.key.length < 7 ?
                        <>
                          <PlusOutlined style={{ fontSize: 14, color: 'red' }} onClick={() => addChildrenNode(node)} />
                          {node.title && <FormOutlined style={{ fontSize: 14, color: '#010440' }} onClick={() => handleOpenModal(node)} />}
                        </>
                        : null
                      }

                    </NodeStyled>
                  )
                }
                return (
                  <NodeStyled>
                    <span>{node.title}</span>
                    <PlusOutlined style={{ fontSize: 14, color: 'red' }} onClick={() => addParentNode(node)} />
                  </NodeStyled>
                )
              }}
            />
          </Col>
        </Row>
      </Spin>
      {visible && <ModalAddItems visible={visible} action={() => handleOpenModal()} categorySelected={categorySelected} save={(items) => saveItemsToCategory(items)} />}
    </Fragment>
  );
}

const TreeStyled = styled(Tree)`
  .ant-tree-node-selected {
    background-color: unset;
  }
`
const NodeStyled = styled.div`
  display: flex;
  .anticon  {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
`