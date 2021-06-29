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
      title: 'Tiêu đề',
      render(text, record) {
        return <p>{record.title}</p>;
      },
    },
    {
      title: 'Nội dung',
      render(text, record) {
        return <p>{record.content}</p>;
      },
    },
    {
      title: 'Loại thông báo',
      render(text, record) {
        return renderNotiType(record.content_type);
      },
    },
    {
      title: 'Ngày gửi',
      render(text, record) {
        return <p>{moment(record.created_at).format('DD-MM-YYYY HH:mm')}</p>;
      },
    },
  ];
  return columns;
}
