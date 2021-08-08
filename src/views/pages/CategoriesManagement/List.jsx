import React, { Fragment, useEffect, useState } from 'react';
import { Button, Row, Table } from 'antd';
import TableData from './TableData';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategories,
  updateCategory,
  categoriesSelector,
} from 'state/categories/reducer';
import ModalAddItems from './ModalAddItems';
import ModalAddCategory from './ModalAddCategory';
import ModalUpdateCategory from './ModalUpdateCategory';

export default function List() {
  useEffect(() => {
    document.title = 'Quản lý danh mục';
    window.scrollTo(0, 0);
  }, []);
  const [visible, setVisible] = useState(false);
  const [visibleModalAddCategory, setVisibleModalAddCategory] = useState(false);
  const [
    visibleModalUploadItemsCategory,
    setVisibleModalUploadItemsCategory,
  ] = useState(false);
  const [categorySelected, setCategorySelected] = useState(null);
  const { loading, data } = useSelector(categoriesSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const buildFormData = (formData, data, parentKey) => {
    if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? '' : data;
      formData.append(parentKey, value);
    }
  };

  const saveItemsForCategory = (items) => {
    const formData = new FormData();
    buildFormData(formData, {
      ...items,
      categoryId: categorySelected,
    });
    dispatch(updateCategory(formData));
  };
  const handleOpenModalEditCategory = (item) => {
    setVisible(!visible);
    setCategorySelected(item);
  };
  const handleOpenModalAddCategory = (item) => {
    setVisibleModalAddCategory(!visibleModalAddCategory);
    setCategorySelected(item);
  };
  const handleOpenModalUploadItemsCategory = (item) => {
    setVisibleModalUploadItemsCategory(!visibleModalUploadItemsCategory);
    setCategorySelected(item);
  };

  return (
    <Fragment>
      <Row style={{ marginBottom: 20 }} justify="end">
        <Button type="primary" onClick={() => handleOpenModalAddCategory()}>
          Tạo danh mục
        </Button>
      </Row>
      <Row type="flex">
        <Table
          showSorterTooltip={false}
          dataSource={data}
          columns={TableData(
            handleOpenModalEditCategory,
            handleOpenModalUploadItemsCategory
          )}
          className="full mt-1"
          loading={loading}
          rowKey="id"
          scroll={{ x: true }}
          pagination={false}
        />
      </Row>
      {visible && (
        <ModalUpdateCategory
          visible={visible}
          action={() => handleOpenModalEditCategory()}
          save={(items) => saveItemsForCategory(items)}
          categorySelected={categorySelected}
        />
      )}
      {visibleModalUploadItemsCategory && (
        <ModalAddItems
          visible={visibleModalUploadItemsCategory}
          action={() => handleOpenModalUploadItemsCategory()}
          save={(items) => saveItemsForCategory(items)}
          categorySelected={categorySelected}
        />
      )}
      {visibleModalAddCategory && (
        <ModalAddCategory
          visible={visibleModalAddCategory}
          action={() => handleOpenModalAddCategory()}
        />
      )}
    </Fragment>
  );
}
