import React from 'react';
import i18next from 'i18next';
import { toast } from 'react-toastify';
import * as moment from 'moment';
import { Select } from 'antd';

import { STATUS_MESSAGE, DATE_TIME_FORMAT } from './constants';

// http://modernjavascript.blogspot.com/2013/08/building-better-debounce.html
export function debounce(func, wait, immediate) {
  // we need to save these in the closure
  let timeout, args, context, timestamp, result;
  return function () {
    context = this;
    args = arguments;
    timestamp = new Date();
    // this is where the magic happens
    // eslint-disable-next-line no-var
    var later = function () {
      // how long ago was the last call
      const last = new Date() - timestamp;
      // if the latest call was less that the wait period ago
      // then we reset the timeout to wait for the difference
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      }
      // or if not we can null out the timer and run the latest
      else {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    // we only need to set the timer now if one isn't already running
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) result = func.apply(context, args);
    return result;
  };
}

// Show Message
export const alertMessage = ({ status, title, content }) => {
  const Msg = () => (
    <div className="box_message">
      <h3
        style={{
          color: 'white',
          fontWeight: '600',
          textTransform: 'capitalize',
        }}
      >
        {title}
      </h3>
      <p>{content}</p>
    </div>
  );
  if (status) {
    // eslint-disable-next-line default-case
    switch (status) {
      case STATUS_MESSAGE.SUCCESS: {
        toast.success(Msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      }
      case STATUS_MESSAGE.ERROR: {
        toast.error(Msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      }
      case STATUS_MESSAGE.WARN: {
        toast.warn(Msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      }
      case STATUS_MESSAGE.INFO: {
        toast.info(Msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      }
    }
  }
};

// Get timezone
export const timezone = new Date().getTimezoneOffset();

// Validate Email
export const validateEmail = (value) => {
  if (value) {
    // eslint-disable-next-line no-useless-escape
    const format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!format.test(String(value).toLowerCase())) {
      return Promise.reject(i18next.t('general.validate.email'));
    } else {
      return Promise.resolve();
    }
  } else {
    return Promise.resolve();
  }
};

// Validate Email
export const validatePassword = (value) => {
  if (value) {
    // eslint-disable-next-line no-useless-escape
    const format = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
    if (!format.test(String(value))) {
      return Promise.reject(i18next.t('general.validate.passwordValid'));
    } else {
      return Promise.resolve();
    }
  } else {
    return Promise.resolve();
  }
};

// Validate PhoneNumber
export const validatePhoneNumber = (value) => {
  if (value) {
    // eslint-disable-next-line no-useless-escape
    const format = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    if (!format.test(String(value))) {
      return Promise.reject(i18next.t('general.validate.phoneNumberValid'));
    } else {
      return Promise.resolve();
    }
  } else {
    return Promise.resolve();
  }
};

// Can not select days after today
export function disabledFutureDate(current) {
  return (
    current &&
    current > moment().startOf('day') &&
    current.format('DD/MM/YYYY') !==
    moment().startOf('day').format('DD/MM/YYYY')
  );
}

// only date, no time, always convert time to 17:00:00
export function convertDateToISO(date) {
  if (date) {
    return moment(date)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toISOString();
  }
  return undefined;
}

// convertDateToISO
export function convertDateToISOForFilter(date) {
  if (date) {
    return moment.utc(moment(date)).format();
  }
  return undefined;
}

// formatDate
export const formatDate = (date, formatDate = DATE_TIME_FORMAT) => {
  if (date) {
    date = moment.utc(moment(date));
    return date.isValid() ? date.format(formatDate) : '';
  }
  return '';
};

// Empty Function
export function emptyFunction() { }

// Catch error in call api
export function catchErrorApiCaller(err) {
  if (err && err.request && err.request.response) {
    const arrMessage = JSON.parse(err.request.response);
    const message = arrMessage.message;
    alertMessage({
      status: STATUS_MESSAGE.ERROR,
      title: i18next.t('general.titleError'),
      content: message,
    });
  }
}


export function searchInline(input, option) {
  const data = option.props.children
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const filter = input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return data.indexOf(filter) >= 0;
}

export function mapType(works) {
  return Object.entries(works).map((w) => (
    <Select.Option key={w[0]} value={w[0]}>
      {w[1]}
    </Select.Option>
  ));
}

export function validateStartAndEndTime(value, startDate, endDate) {
  const startDateFormat = startDate
    ? startDate.set({
      second: 0,
      millisecond: 0,
    })
    : undefined;

  const endDateFormat = endDate
    ? endDate.set({
      second: 0,
      millisecond: 0,
    })
    : undefined;

  if (!value) {
    return Promise.reject(new Error(i18next.t('general.requireMessage')));
  } else if (value && startDateFormat > endDateFormat) {
    return Promise.reject(
      new Error('Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc')
    );
  } else {
    return Promise.resolve();
  }
}
