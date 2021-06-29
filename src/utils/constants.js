export const BASE_API_URL = process.env.REACT_APP_API_URL;
export const BASE_LOCAL_URL = process.env.REACT_APP_LOCAL;
export const TOKEN = 'accessToken'
export const STORAGE_PROFILE = 'profile'
export const TIME_CLOSE_MESSAGE = 5000;
export const DEBOUNCE_INPUT_SEARCH_DELAY = 300;
export const DATE_TIME_FORMAT = 'DD/MM/YYYY hh:mm'
export const STATUS_MESSAGE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
};

export const responseStatus = {
  FOUR00: 400,
  FOUR01: 401,
  FOUR03: 403,
  FIVE00: 500,
  FIVE01: 501,
  FIVE02: 502,
  FIVE03: 503,
  PASSWORD_EXPIRED: 1000,
};

export const MESSAGE_LOGOUT = 'Bạn có muốn đăng xuất?';
export const ACCEPT = 'Đồng ý';
export const CANCEL = 'Hủy';
export const CLOSE = 'Đóng';

// Notification Constants
export const TAB_NOTI_NORMAL = "normal";
export const TAB_NOTI_CLASS_REVIEW = "review";
export const TAB_NOTI_WITH_POST = "post";

export const SEND_NOTIFICATION_TYPE_ALL = 0;
export const SEND_NOTIFICATION_TO_CLASS = 1;
// End Notification Constants