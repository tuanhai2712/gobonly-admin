import React from 'react';

import { formatDate } from '../../utils/function';

export default function HistoryUser({ formValues }) {
  const create =
    formValues.createdBy && formValues.createdDate
      ? `Tạo bởi ${formValues.createdBy} vào lúc ${formatDate(
          formValues.createdDate
        )}`
      : '';
  const update =
    formValues.updatedBy && formValues.updatedDate
      ? `Cập nhật bởi ${formValues.updatedBy} vào lúc ${formatDate(
          formValues.updatedDate
        )}`
      : '';

  return (
    <div className="creator-modifier-dv">
      {[create, update].filter(Boolean).join(' | ')}
    </div>
  );
}
