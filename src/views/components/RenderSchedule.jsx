import { dateFormat, typeDay, typeMonth, typeWeek } from 'utils/constants';
import { formatDate } from 'utils/function';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
export default function renderTitle({
  title,
  typeFilterDate,
  currentMonth,
  fromDate,
  currentWeek,
  currentDay,
}) {
  switch (typeFilterDate) {
    case typeDay: {
      return (
        <TitleStyled className="text_center">
          {title} ngày{' '}
          {formatDate(moment().add(currentDay, 'days'), dateFormat)}
        </TitleStyled>
      );
    }

    case typeWeek: {
      return (
        <TitleStyled className="text_center">
          {title} tuần {fromDate && fromDate.weeks()}: Từ ngày{' '}
          {formatDate(moment().isoWeekday(1).isoWeek(currentWeek), dateFormat)}{' '}
          đến ngày{' '}
          {formatDate(moment().isoWeekday(7).isoWeek(currentWeek), dateFormat)}
        </TitleStyled>
      );
    }

    case typeMonth: {
      return (
        <TitleStyled className="text_center">
          {title} tháng {fromDate && fromDate.month() + 1}: Từ ngày{' '}
          {formatDate(
            moment().month(currentMonth).startOf('month'),
            dateFormat
          )}{' '}
          đến ngày{' '}
          {formatDate(moment().month(currentMonth).endOf('month'), dateFormat)}
        </TitleStyled>
      );
    }

    default: {
      return (
        <TitleStyled className="text_center">{title} tùy chọn</TitleStyled>
      );
    }
  }
}

const TitleStyled = styled.h3`
  margin-bottom: 0px;
  margin-top: 0.15em;
`;
