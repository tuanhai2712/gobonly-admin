import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  Button,
  Row,
  Col,
  Table
} from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountUser, accountSelector } from 'state/account/reducer';
import TableData from './TableData'
import NoResultFound from 'views/components/NoResult/no-result'

const initialFilterConditions = {
  page: 1,
  pageSize: 10
}
export default function List() {
  useEffect(() => {
    document.title = 'Quản lý thông báo';
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch()
  const { users } = useSelector(accountSelector)
  const { loading, data, total } = users
  const [visibleModalCreateNotification, setVisibleModalCreateNotification] = useState(false)
  const [filterConditions, setFilterConditions] = useState(initialFilterConditions)
  useEffect(() => {
    dispatch(getAccountUser(filterConditions))
  }, [dispatch, filterConditions])
  const openCreateUserAccount = () => {
    setVisibleModalCreateNotification(!visibleModalCreateNotification)
  }

  const handleChangePage = useCallback((page) => {
    setFilterConditions((state) => ({
      ...state,
      page: page.current,
      pageSize: page.pageSize
    }))
  }, [])
  return (
    <Fragment>
      <div className="container user_list">
        <Row style={{ marginBottom: 10 }} justify="end">
          <Col
            span={6}
            className="btn-create-user"
            style={{ textAlign: 'end' }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => openCreateUserAccount()}
            >
              Tạo mới
            </Button>
          </Col>
        </Row>
        {!loading && !data.length && <NoResultFound />}
        <Col span="24">
          <Table
            showSorterTooltip={false}
            dataSource={data}
            columns={TableData()}
            className="full mt-1"
            loading={loading}
            rowKey="id"
            scroll={{ x: true }}
            onChange={handleChangePage}
            pagination={{
              current: filterConditions.page,
              total: total,
              size: filterConditions.pageSize,
              showSizeChanger: true,
              hideOnSinglePage: false,
            }}
          />
        </Col>
      </div>
    </Fragment>
  );
}
