import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

import { build } from '../../utils/requests';
import { debounce, searchInline } from '../../utils/function';
import { DEBOUNCE_INPUT_SEARCH_DELAY } from '../../utils/constants';
import { getListData } from '../../effect/common';

const { Option } = Select;

export default function Selection({
  mode = 'default',
  placeholder,
  url,
  form,
  field,
  isSearch,
  payload = {},
  handleChange,
  value,
  allowClear,
  isSaveInput,
  selectDefault,
  children,
  className = '',
  keyValue,
  disabled = false,
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [blur, setBlur] = useState(false);
  useEffect(() => {
    if (url) {
      getListData({
        setLoading,
        setList: setData,
        url: `${url}?${build(payload)}`,
        selectDefault,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSaveInput && searchTerm && data.length === 0) {
      form.setFieldsValue({
        [field]: searchTerm,
      });
      if (handleChange) {
        handleChange({
          name: searchTerm,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const onChange = (value, data) => {
    setBlur(false);
    if (isSaveInput) {
      setSearchTerm(value);
    }
    if (form) {
      form.setFieldsValue({
        [field]: value,
      });
    }
    if (handleChange) {
      handleChange(data ? data.item : undefined);
    }
  };

  const fetchData = async (value) => {
    setBlur(true);

    if (value) {
      if (isSaveInput) {
        setSearchTerm(value);
      }
      await getListData({
        setLoading,
        setList: setData,
        url: `${url}?${build({
          ...payload,
          searchTerm: value,
        })}`,
      });
    }
  };
  const debounceFetchData = debounce(fetchData, DEBOUNCE_INPUT_SEARCH_DELAY);

  const onBlur = () => {
    if (blur && isSaveInput && searchTerm) {
      const items = data.filter((item) => item.name === searchTerm);
      if (items.length) {
        if (form) {
          form.setFieldsValue({
            [field]: items[0][keyValue] || items[0].id,
          });
        }
        handleChange(items[0]);
      } else {
        handleChange({
          name: searchTerm,
        });
      }
    }
  };
  return (
    <Select
      mode={mode}
      disabled={disabled}
      className={className}
      value={value || searchTerm}
      onBlur={onBlur}
      onChange={onChange}
      loading={loading}
      allowClear={allowClear}
      placeholder={placeholder}
      onSearch={isSearch ? debounceFetchData : false}
      showSearch
      filterOption={
        isSearch
          ? false
          : (input, option) => {
              searchInline(input, option);
              if (isSaveInput) {
                setSearchTerm(input);
                setBlur(true);
              }
            }
      }
    >
      {data.map((item) => (
        <Option
          key={item[keyValue] || item.id}
          value={item[keyValue] || item.id}
          item={item}
        >
          {item[children || 'name']}
        </Option>
      ))}
    </Select>
  );
}
