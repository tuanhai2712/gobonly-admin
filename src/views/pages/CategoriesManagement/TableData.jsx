import React from 'react';
import { EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Tooltip, Button } from 'antd';
import styled from 'styled-components';
export default function TableData(
  handleOpenModalEditCategory,
  handleOpenModalUploadItemsCategory
) {
  const columns = [
    {
      title: 'ID',
      render(text, record) {
        return <p>{record.id}</p>;
      },
    },
    {
      title: 'Tên danh mục',
      render(text, record) {
        return <p>{record.title}</p>;
      },
    },
    {
      title: 'Trạng thái',
      render(text, record) {
        return <p>{record.is_active ? 'Kích hoạt' : 'Ẩn'}</p>;
      },
    },
    {
      title: 'Tùy chọn',
      width: 100,
      render(text, record) {
        return (
          <ActionColumnStyled>
            <Tooltip title="Cập nhật dữ liệu danh mục">
              <ButtonStyled onClick={() => handleOpenModalEditCategory(record)}>
                <EditOutlined />
              </ButtonStyled>
            </Tooltip>
            <Tooltip title="Tải lên ảnh mẫu cho danh mục">
              <ButtonStyled
                onClick={() => handleOpenModalUploadItemsCategory(record)}
              >
                <UploadOutlined />
              </ButtonStyled>
            </Tooltip>
            <Tooltip title="Thêm danh mục con">
              <ButtonStyled onClick={() => console.log(record)}>
                <PlusOutlined />
              </ButtonStyled>
            </Tooltip>
          </ActionColumnStyled>
        );
      },
    },
  ];
  return columns;
}

const ActionColumnStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ButtonStyled = styled(Button)`
  margin: 0px 5px;
  padding: 0px 12px;
`;
