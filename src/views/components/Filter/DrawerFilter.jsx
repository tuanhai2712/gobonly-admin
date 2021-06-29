import React, { Fragment, useState } from 'react';
import { Button, Drawer, Tooltip } from 'antd';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
export default function DrawerFilter({ refresh, children, customStyle }) {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <Fragment>
      <Tooltip title={'Tìm kiếm nâng cao'}>
        <Button
          style={{ padding: 0, marginRight: 10, ...customStyle }}
          type="primary"
          onClick={() => showDrawer()}
          icon={<SearchOutlined />}
        />
      </Tooltip>
      <Drawer
        title="Tìm kiếm nâng cao"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={350}
      >
        {children}
        <ButtonStyled type="primary" onClick={() => refresh()}>
          Làm mới
        </ButtonStyled>
      </Drawer>
    </Fragment>
  );
}

const ButtonStyled = styled(Button)`
  width: 100%;
  margin-bottom: 10px;
`;
