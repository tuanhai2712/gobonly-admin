import React from 'react';

export default function TableData() {
  const columns = [
    {
      title: 'ID',
      render(text, record) {
        return <p>{record.id}</p>;
      },
    },
    {
      title: 'Size',
      render(text, record) {
        return <p>{record.name}</p>;
      },
    },
  ];
  return columns;
}
