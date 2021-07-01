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
  Radio
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getBanner, bannerSelector, updateBanner, deleteBanner } from 'state/banner/reducer';
import { BASE_LOCAL_URL } from 'utils/constants';
import NoResultFound from 'views/components/NoResult/no-result'
import { useHistory } from 'react-router';
export default function List() {
  useEffect(() => {
    document.title = 'Quản lý banner';
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, data, total, bannerUpdate } = useSelector(bannerSelector)
  const [filterConditions, setFilterConditions] = useState({
    page: 1,
    pageSize: 8,
    isActive: true
  })
  const onChangeStatus = e => {
    setFilterConditions((state) => ({
      ...state,
      isActive: e.target.value ? true : false,
      page: 1,
    }))
  };
  const handleChangePage = useCallback((page) => {
    setFilterConditions((state) => ({
      ...state,
      page,
    }))
  }, [])
  const goToCreateStoreData = () => {
    history.push('/store/create')
  }
  return (
    <Fragment>
      <div className="container user_list">
        <Row style={{ marginBottom: 10 }} justify="space-between">
          <Col
            span={24}
            className="btn-create-user"
            style={{ textAlign: 'end' }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => goToCreateStoreData()}
            >
              Tạo dữ liệu
            </Button>
          </Col>
        </Row>
        {!loading && !data.length && <NoResultFound />}
        <Spin spinning={loading}>

        </Spin>
      </div>
    </Fragment>
  );
}
