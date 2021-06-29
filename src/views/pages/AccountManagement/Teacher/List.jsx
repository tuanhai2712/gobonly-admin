import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Button,
  Col,
  ConfigProvider,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
const { Option } = Select;
export default function List() {
  useEffect(() => {
    document.title = 'Quản lý người dùng';
    window.scrollTo(0, 0);
  }, []);

  const [filterConditions, setFilterConditions] = useState({
    page: 1,
    pageSize: 10,
    searchTerm: ''
  })
  const [loading, setLoading] = useState(false)
  const [totalData, setTotalData] = useState(0)

  const columns = useMemo(() => {
    return [
      {
        title: 'Mã nhân viên',
        dataIndex: 'code',
        ellipsis: true,
      },
      {
        title: 'Họ & tên',
        dataIndex: 'name',
        ellipsis: true,
      },
      {
        title: 'Tên đăng nhập',
        dataIndex: 'userName',

        ellipsis: true,
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
      },
      {
        title: 'Đơn vị',
        dataIndex: 'unitName',
        ellipsis: true,
      },
      {
        title: 'Phòng đội',
        dataIndex: 'userGroup',
        className: 'text_center',
        render(text, record) {
          return (
            <Fragment>
              <span>{record.userGroup}</span>
            </Fragment>
          );
        },
      },
      {
        title: '',
        dataIndex: 'action',
        fixed: 'right',
        className: 'text_right ',
        render(text, record) {
          return (
            <div className="fl_row">
              <Tooltip title={'Chỉnh sửa'}>
                <Button
                  shape="circle"
                  icon={<EditOutlined />}
                  data-id={record.id}
                  onClick={() => console.log('xxxx')}
                  className="border-none"
                />
              </Tooltip>
              <Tooltip title={'Chi tiết'}>
                <Button
                  shape="circle"
                  icon={<EyeOutlined />}
                  onClick={() => console.log('xxxx')}
                  className="border-none"
                />
              </Tooltip>
              <Tooltip title={'Xóa'}>
                <Button
                  shape="circle"
                  icon={<DeleteOutlined />}
                  className="border-none"
                  onClick={() => console.log('xxxx')}
                />
              </Tooltip>
            </div>
          );
        },
      },
    ];
  }, []);

  return (
    <Fragment>
      <div className="container user_list">
        <Row style={{ marginBottom: 10 }}>
          <Col
            span={6}
            xs={24}
            sm={24}
            md={6}
            lg={8}
            xl={6}
            style={{ paddingRight: 10 }}
          >
            <Input
              placeholder="Tìm kiếm"
              value={filterConditions.searchTerm}
              style={{ height: 35, marginBottom: 5 }}
              onChange={() => console.log('xxx')}
              allowClear={true}
              prefix={<SearchOutlined />}
              suffix={
                <Tooltip title="Hỗ trợ tìm kiếm theo tên, tên đăng nhập, số điện thoại, đơn vị, vai trò!">
                  <InfoCircleOutlined />
                </Tooltip>
              }
            />
          </Col>
          <Col
            span={6}
            xs={24}
            sm={24}
            md={6}
            lg={8}
            xl={6}
            style={{ paddingRight: 10 }}
          >
            <div className="fl_row align_center">
              <SelectFilterStyled
                allowClear
                showSearch
                onChange={() => console.log('xxx')}
                className="full"
                placeholder="Lọc theo đơn vị"
                filterOption={(input, option) =>
                  option.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
              </SelectFilterStyled>
            </div>
          </Col>
          <Col
            span={6}
            xs={24}
            sm={24}
            md={6}
            lg={8}
            xl={6}
            className="btn-create-user"
            style={{ textAlign: 'start' }}
          >
            <Tooltip title={'Tạo tài khoản'}>
              <ButtonStyled
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => console.log('xxxx')}
              />
            </Tooltip>
          </Col>
        </Row>
        <Row type="flex">
          <Col span="24">
            <ConfigProvider>
              <TableStyled
                showSorterTooltip={false}
                dataSource={[]}
                columns={columns}
                className="full mt-1"
                loading={loading}
                rowKey="id"
                scroll={{ x: true }}
                onChange={() => console.log('xxx')}
                pagination={{
                  current: filterConditions.pageIndex,
                  total: totalData,
                  size: filterConditions.pageSize,
                  showQuickJumper: true,
                  showSizeChanger: true,
                  hideOnSinglePage: false,
                }}
              />
            </ConfigProvider>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}

const SelectFilterStyled = styled(Select)`
    .ant-select-selector {
      height: 35px !important;
      margin-bottom: 5px;
    }
  `;
const ButtonStyled = styled(Button)`
    height: 35px;
    width: 35px;
    padding: 0px;
  `
const TableStyled = styled(Table)`
    table {
      .text_right {
        right: -5px !important;
      }
    }
  `;