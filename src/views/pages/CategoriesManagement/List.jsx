import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  Button,
  Row,
  Spin,
  Col,
  Switch,
  Pagination,
  Modal,
  Radio,
  Tree,
  Input
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getBanner, bannerSelector, updateBanner, deleteBanner } from 'state/banner/reducer';
import { BASE_LOCAL_URL } from 'utils/constants';
import NoResultFound from 'views/components/NoResult/no-result'
import styled from 'styled-components'
const { TreeNode } = Tree;

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
  const [expandedKeys, setExpandedKeys] = useState([])
  const dispatch = useDispatch()


  const handleChangeNode = (event, node) => {
    const { value } = event.target
    console.log('node', node)
    console.log('value', value)
  }
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
        }
      ]
    }
    setExpandedKeys((state) => [...state, find.key])
    setTree((state) => ([
      ...currentTree
    ]))

  }

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys)
  }
  return (
    <Fragment>
      <div className="container user_list">
        {/* {!loading && !data.length && <NoResultFound />} */}
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
                // onDrop={onChange}
                titleRender={(node) => {
                  if (!node.default) {
                    return (
                      <NodeStyled>
                        <Input style={{ height: 25 }} onChange={(event) => handleChangeNode(event, node)} />
                        <PlusOutlined style={{ fontSize: 14, color: 'red' }} onClick={() => addChildrenNode(node)} />
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
      </div>
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