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
  Pagination,
  Modal,
  Radio,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  ToolOutlined
} from '@ant-design/icons';
import ModalCreateCoupon from './Create';
import ModalEditCoupon from './Edit';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupon, couponSelector, deleteCoupon } from 'state/coupon/reducer';
import { BASE_LOCAL_URL } from 'utils/constants';
import NoResultFound from 'views/components/NoResult/no-result'
import moment from 'moment'
import styled from 'styled-components'
export default function List() {
  useEffect(() => {
    document.title = 'Quản lý voucher';
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch()
  const { loading, data, total, couponUpdate } = useSelector(couponSelector)
  const [visibleModalCreateCoupon, setVisibleModalCreateCoupon] = useState(false)
  const [visibleModalEditCoupon, setVisibleModalEditCoupon] = useState(false)
  const [couponEdit, setCouponEdit] = useState(null)
  const [filterConditions, setFilterConditions] = useState({
    page: 1,
    pageSize: 8,
    isActive: true
  })

  useEffect(() => {
    dispatch(getCoupon(filterConditions))
  }, [filterConditions, dispatch])
  const openCreateBannerModal = () => {
    setVisibleModalCreateCoupon(!visibleModalCreateCoupon)
  }

  const handleDeleteCoupon = useCallback((couponId) => {
    Modal.confirm({
      centered: true,
      title: 'Xóa banner',
      content: 'Bạn có chắc chắn muốn xóa banner!',
      onOk() {
        dispatch(deleteCoupon({ couponId, filterConditions }))
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
  const handleChangePage = useCallback((page) => {
    setFilterConditions((state) => ({
      ...state,
      page,
    }))
  }, [])

  const openEditCoupon = (coupon) => {
    setVisibleModalEditCoupon(!visibleModalEditCoupon);
    setCouponEdit(coupon)
  }
  const closeEditCoupon = () => {
    setVisibleModalEditCoupon(!visibleModalEditCoupon);
  }

  const checkActiveCoupon = (activeTo) => {
    if (new Date().setHours(0, 0, 0, 0) <= new Date(activeTo).setHours(0, 0, 0, 0)) return true;
    return false
  }
  const renderBanner = () => {
    if (data.length) {
      return data.map((item) => {
        return (
          <Col span={6} key={item.id} style={{ padding: 5, }}>
            <Spin spinning={item.id === couponUpdate.id && couponUpdate.loading}>
              <img src={`${BASE_LOCAL_URL}/${item.thumbnail}`} alt={item.id} style={{ width: '100%', border: '1px solid #b9b6b6' }} />
              <Row align='middle' justify='space-between' style={{ marginTop: 5 }}>
                <div>
                  <Button onClick={() => handleDeleteCoupon(item.id)} style={{ padding: 'unset', marginRight: 10 }} icon={<DeleteOutlined />}></Button>
                  {checkActiveCoupon(item.active_to) && <Button onClick={() => openEditCoupon(item)} style={{ padding: 'unset' }} icon={<ToolOutlined />}></Button>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <TitleStyled>
                    {item.title}
                  </TitleStyled>
                  <PointStyled>
                    Điểm: {item.point}
                  </PointStyled>
                  <TimeActiveTextStyled>Ngày hết hạn: {moment(item.active_to).format('DD-MM-YYYY')}</TimeActiveTextStyled>
                </div>
              </Row>
            </Spin>
          </Col>
        )
      })
    }
  }
  return (
    <Fragment>
      <div className="container user_list">
        <Row style={{ marginBottom: 10 }} justify="space-between">
          <Col span={6}>
            <Radio.Group onChange={onChangeStatus} value={filterConditions.isActive ? 1 : 0}>
              <Radio value={1}>Còn hạn</Radio>
              <Radio value={0}>Hết hạn</Radio>
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
              Tạo phiếu giảm giá
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
      {visibleModalCreateCoupon && <ModalCreateCoupon visible={visibleModalCreateCoupon} action={() => openCreateBannerModal()} filterConditions={filterConditions} />}
      {visibleModalEditCoupon && <ModalEditCoupon visible={visibleModalEditCoupon} action={() => closeEditCoupon()} data={couponEdit} filterConditions={filterConditions} />}
    </Fragment>
  );
}

const TitleStyled = styled.span`
  font-weight: 700;
  color: #001529;
`
const TimeActiveTextStyled = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #919496;
`
const PointStyled = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #919496;
`