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
import ModalCreateBanner from './Create';
import { useDispatch, useSelector } from 'react-redux';
import { getBanner, bannerSelector, updateBanner, deleteBanner } from 'state/banner/reducer';
import { BASE_LOCAL_URL } from 'utils/constants';
import NoResultFound from 'views/components/NoResult/no-result'
export default function List() {
  useEffect(() => {
    document.title = 'Quản lý banner';
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch()
  const { loading, data, total, bannerUpdate } = useSelector(bannerSelector)
  const [visibleModalCreateBanner, setVisibleModalCreateBanner] = useState(false)
  const [filterConditions, setFilterConditions] = useState({
    page: 1,
    pageSize: 8,
    isActive: true
  })
  useEffect(() => {
    dispatch(getBanner(filterConditions))
  }, [dispatch, filterConditions])
  const openCreateBannerModal = () => {
    setVisibleModalCreateBanner(!visibleModalCreateBanner)
  }

  const handleActiveBanner = (checked, item) => {
    dispatch(updateBanner({ checked, bannerId: item.id, order: item.order, filterConditions }))
  }
  const handleDeleteBanner = useCallback((bannerId) => {
    Modal.confirm({
      centered: true,
      title: 'Xóa banner',
      content: 'Bạn có chắc chắn muốn xóa banner!',
      onOk() {
        dispatch(deleteBanner({ bannerId, filterConditions }))
      },
      onCancel() { },
      okText: 'Đồng ý',
      cancelText: 'Hủy',
    });
  }, [dispatch, filterConditions]);

  const onChangeStatus = e => {
    setFilterConditions((state) => ({
      ...state,
      isActive: e.target.value ? true : false,
      page: 1,
    }))
  };
  const renderBanner = () => {
    if (data.length) {
      return data.map((item) => {
        return (
          <Col span={6} key={item.id} style={{ padding: 5, }}>
            <Spin spinning={item.id === bannerUpdate.id && bannerUpdate.loading}>
              <img src={`${BASE_LOCAL_URL}/${item.image}`} alt={item.id} style={{ width: '100%', border: '1px solid #b9b6b6' }} />
              <Row align='middle' justify='space-between' style={{ marginTop: 5 }}>
                <Button onClick={() => handleDeleteBanner(item.id)} style={{ padding: 'unset' }} icon={<DeleteOutlined />}></Button>
                <Switch defaultChecked={item.is_active === '1' ? true : false} onChange={(checked) => handleActiveBanner(checked, item)} checkedChildren="Bỏ kích hoạt" unCheckedChildren="Kích hoạt" />
              </Row>
            </Spin>
          </Col>
        )
      })
    }
  }
  const handleChangePage = useCallback((page) => {
    setFilterConditions((state) => ({
      ...state,
      page,
    }))
  }, [])
  return (
    <Fragment>
      <div className="container user_list">
        <Row style={{ marginBottom: 10 }} justify="space-between">
          <Col span={6}>
            <Radio.Group onChange={onChangeStatus} value={filterConditions.isActive ? 1 : 0}>
              <Radio value={1}>Kích hoạt</Radio>
              <Radio value={0}>Không kích hoạt</Radio>
            </Radio.Group>
          </Col>
          <Col
            span={6}
            className="btn-create-user"
            style={{ textAlign: 'end' }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => openCreateBannerModal()}
            >
              Tạo banner
            </Button>
          </Col>
        </Row>
        {!loading && !data.length && <NoResultFound />}
        <Spin spinning={loading}>
          <Row type="flex">
            {data.length ?
              <>
                {renderBanner()}
                <div style={{ width: '100%', textAlign: 'end', marginTop: 20 }}>
                  <Pagination
                    onChange={handleChangePage}
                    defaultCurrent={filterConditions.page}
                    current={filterConditions.page}
                    pageSize={filterConditions.pageSize}
                    total={total}
                  />
                </div>
              </>
              :
              null
            }
          </Row>
        </Spin>
      </div>
      {visibleModalCreateBanner && <ModalCreateBanner visible={visibleModalCreateBanner} action={() => openCreateBannerModal()} filterConditions={filterConditions} />}
    </Fragment>
  );
}
