import { BASE_API_URL } from './constants';

export const Endpoint = {
  LOGIN: BASE_API_URL + '/auth/login',
  CATEGORIES: BASE_API_URL + '/categories',
  UPDATE_CATEGORY: BASE_API_URL + '/update-category',
  SIZE: BASE_API_URL + '/size',

  BANNER: BASE_API_URL + '/admin/banner',
  USER: BASE_API_URL + '/admin/user',
  COUPON: BASE_API_URL + '/admin/coupon',
  COUPON_REQUEST: BASE_API_URL + '/admin/coupon/claims',
  NOTIFICATION: BASE_API_URL + '/admin/notification',
  COURSE: BASE_API_URL + '/admin/products',
  CLASS: BASE_API_URL + '/admin/class',
  REVIEW: BASE_API_URL + '/admin/review',
};
