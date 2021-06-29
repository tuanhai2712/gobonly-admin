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
import { getReview, reviewSelector } from 'state/review/reducer';
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
  const { loading, data, total } = useSelector(reviewSelector)
  const [filterConditions, setFilterConditions] = useState(initialFilterConditions)
  useEffect(() => {
    dispatch(getReview(filterConditions))
  }, [dispatch, filterConditions])

  const handleChangePage = useCallback((page) => {
    setFilterConditions((state) => ({
      ...state,
      page: page.current,
      pageSize: page.pageSize
    }))
  }, [])
  if (!loading && !data.length) return <NoResultFound />
  return (
    <Fragment>
      <div className="container user_list">
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
