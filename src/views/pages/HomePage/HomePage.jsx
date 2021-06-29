import React, { useEffect } from 'react';

export default function Homepage() {
  useEffect(() => {
    document.title = 'Trang chủ';
    window.scrollTo(0, 0);
  }, []);

  return <div></div>;
}
