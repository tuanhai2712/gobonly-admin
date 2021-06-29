import React from 'react';
import { Button, Tooltip } from 'antd';
import styled from 'styled-components';
export default function TooltipButton({
  action,
  title,
  icon,
  type,
  disabled,
  style,
  text,
}) {
  return (
    <Tooltip title={title}>
      <ButtonStyled
        type={type}
        style={style}
        onClick={action}
        icon={icon}
        disabled={disabled}
      >
        {text}
      </ButtonStyled>
    </Tooltip>
  );
}

const ButtonStyled = styled(Button)`
  padding: 0px !important;
`;
