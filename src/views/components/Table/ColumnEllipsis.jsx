import React from 'react';
import { Tooltip } from 'antd';
export default function ColumnEllipsis({ text }) {
  const ellipsisText = (string) => {
    if (string.length > 25) {
      return string.substring(0, 24) + '...';
    }
    return string;
  };
  return (
    <Tooltip title={text}>
      <span>{ellipsisText(text)}</span>
    </Tooltip>
  );
}
