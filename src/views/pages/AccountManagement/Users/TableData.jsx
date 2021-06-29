import React from 'react';
import moment from 'moment';
import { TAB_NOTI_CLASS_REVIEW, TAB_NOTI_WITH_POST } from 'utils/constants'

export default function TableData() {

  const renderNotiType = (type) => {
    switch (type) {
      case TAB_NOTI_CLASS_REVIEW:
        return <p style={{ color: 'red' }}>Thông báo đánh giá lớp</p>
      case TAB_NOTI_WITH_POST:
        return <p style={{ color: 'blue' }}>Thông báo với bài viết</p>
      default:
        return <p style={{ color: '#010440' }}>Thông báo thường</p>
    }
  }
  const columns = [
    {
      title: 'Tên',
      render(text, record) {
        return <p>{record.name}</p>;
      },
    },
    {
      title: 'Email',
      render(text, record) {
        return <p>{record.email}</p>;
      },
    },
    {
      title: 'Số điện thoại',
      render(text, record) {
        return <p>{record.phone}</p>;
      },
    },
    {
      title: 'Sinh nhật',
      render(text, record) {
        return <p>{moment(record.dob).format('DD-MM-YYYY')}</p>;
      },
    },
    {
      title: 'Trường',
      render(text, record) {
        return <p>{record.school}</p>;
      },
    },
  ];
  return columns;
}
