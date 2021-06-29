import React, { Fragment, useCallback } from 'react';
import { Button, Col, Row } from 'antd';
import moment from 'moment';
import { typeDay, typeMonth, typeWeek } from 'utils/constants';
export default function FilterDay({
  setCurrentWeek,
  typeFilterDate,
  setTypeFilterDate,
  setCurrentDay,
  setCurrentMonth,
  resetFilterData,
}) {
  const handleChangeTypeDate = useCallback(
    (event) => {
      resetFilterData();
      const type = event.currentTarget.dataset.type;
      switch (type) {
        case typeDay:
          setCurrentDay(0);
          break;
        case typeWeek:
          setCurrentWeek(Number(moment().format('ww')) - 1);
          break;
        case typeMonth:
          setCurrentMonth(Number(moment().format('MM')) - 1);
          break;
        default:
          break;
      }
      setTypeFilterDate(type);
    },
    [
      resetFilterData,
      setTypeFilterDate,
      setCurrentDay,
      setCurrentWeek,
      setCurrentMonth,
    ]
  );

  return (
    <Fragment>
      <Row type="flex" className="mb-1" justify="left">
        <Col>
          <Button
            style={{ marginRight: 10 }}
            type={typeFilterDate === typeMonth ? 'primary' : 'default'}
            data-type={typeMonth}
            onClick={handleChangeTypeDate}
          >
            Tháng
          </Button>
        </Col>
        <Col>
          <Button
            style={{ marginRight: 10 }}
            type={typeFilterDate === typeWeek ? 'primary' : 'default'}
            data-type={typeWeek}
            onClick={handleChangeTypeDate}
          >
            Tuần
          </Button>
        </Col>

        <Col>
          <Button
            type={typeFilterDate === typeDay ? 'primary' : 'default'}
            data-type={typeDay}
            onClick={handleChangeTypeDate}
          >
            Ngày
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}
