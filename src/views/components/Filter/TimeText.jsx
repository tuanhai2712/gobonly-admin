import React, { Fragment, useCallback } from 'react';
import { Col, Row } from 'antd';
import { typeDay, typeWeek } from 'utils/constants';
import renderTitle from 'views/components/RenderSchedule';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import TooltipButton from 'views/components/Button/TooltipButton';
export default function TimeText({
  setCurrentWeek,
  typeFilterDate,
  setCurrentDay,
  setCurrentMonth,
  currentDay,
  currentWeek,
  currentMonth,
  title,
}) {
  // date
  const handleGetYesterday = useCallback(() => {
    setCurrentDay(currentDay - 1);
  }, [currentDay, setCurrentDay]);

  const handleGetTomorrow = useCallback(() => {
    setCurrentDay(currentDay + 1);
  }, [currentDay, setCurrentDay]);

  // week
  const handleGetLastWeek = useCallback(() => {
    setCurrentWeek(currentWeek - 1);
  }, [currentWeek, setCurrentWeek]);

  const handleGetNextWeek = useCallback(() => {
    setCurrentWeek(currentWeek + 1);
  }, [currentWeek, setCurrentWeek]);

  // month
  const handleGetLastMonth = useCallback(() => {
    setCurrentMonth(currentMonth - 1);
  }, [currentMonth, setCurrentMonth]);

  const handleGetNextMonth = useCallback(() => {
    setCurrentMonth(currentMonth + 1);
  }, [currentMonth, setCurrentMonth]);

  const renderPreviousButtonFilter = () => {
    switch (typeFilterDate) {
      case typeDay:
        return () => handleGetYesterday();
      case typeWeek:
        return () => handleGetLastWeek();
      default:
        return () => handleGetLastMonth();
    }
  };
  const renderBackButtonFilter = () => {
    switch (typeFilterDate) {
      case typeDay:
        return () => handleGetTomorrow();
      case typeWeek:
        return () => handleGetNextWeek();
      default:
        return () => handleGetNextMonth();
    }
  };

  return (
    <Fragment>
      <Row type="flex" justify="center" className="mb-1" align="center">
        <TooltipButton
          icon={<CaretLeftOutlined />}
          type="link"
          action={renderPreviousButtonFilter()}
        />
        <Col span="12">
          {renderTitle({
            typeFilterDate,
            currentMonth,
            currentWeek,
            currentDay,
            title,
          })}
        </Col>
        <TooltipButton
          icon={<CaretRightOutlined />}
          type="link"
          action={renderBackButtonFilter()}
        />
      </Row>
    </Fragment>
  );
}
