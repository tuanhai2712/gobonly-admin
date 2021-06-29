
import axios from 'axios';
import {
  STATUS_MESSAGE,
  responseStatus,
  TOKEN
} from './constants';
import { alertMessage } from './function';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
// declare a response interceptor



export const setToken = async (token = '') => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};


export const clearToken = async () => {
  axios.defaults.headers.common['Authorization'] = '';
};

const requestAbordCode = 'ECONNABORTED';

axios.defaults.baseURL = '';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.timeout = 5000;

axios.interceptors.response.use(
  (response) => {
    // do something with the response data
    return response;
  },
  (error) => {
    // do something with the error
    if (
      error.response &&
      error.response.status &&
      error.response.data.statusCode === responseStatus.PASSWORD_EXPIRED
    ) {
      return error.response;
    }
    if (error.response && error.response.status) {
      // eslint-disable-next-line default-case
      switch (error.response.status) {
        case responseStatus.FOUR00: {
          if (error.response.data.errors) {
            const messages = [];
            Object.entries(error.response.data.errors).forEach(([, value]) => {
              messages.push(value[0]);
            });
            alertMessage({
              status: STATUS_MESSAGE.ERROR,
              title: 'Lỗi hệ thống',
              content: messages.join(' '),
            });
          } else {
            alertMessage({
              status: STATUS_MESSAGE.ERROR,
              title: 'Lỗi hệ thống',
              content: error.response.data.message,
            });
          }

          break;
        }
        case responseStatus.FOUR03:
          alertMessage({
            status: STATUS_MESSAGE.ERROR,
            title: 'Lỗi hệ thống',
            content: 'Lỗi hệ thống'
          });
          break;
        case responseStatus.FOUR01:
          // localStorage.clear()
          // history.push('/login');
          // window.location.reload();
          break;
        case responseStatus.FIVE00:
        case responseStatus.FIVE03:
          alertMessage({
            status: STATUS_MESSAGE.ERROR,
            title: 'Lỗi hệ thống',
            content: error.response.data.message,
          });
          break;
      }
    }
    return error.response
  }
);
const RequestClient = class {

  constructor() {
    this.init();
  }
  async init() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(TOKEN)}`;
  }
  async headers(params) {
    let keys = Object.keys(params);
    keys.map((key) => {
      return axios.defaults.headers.common[key] = params[key];
    });
  }

  async authPost(endpoint, params) {
    let response = await axios.post(endpoint, params);

    return response;
  }

  async get(endpoint, params = {}) {
    try {
      const response = await axios.get(endpoint, params);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(endpoint, params = {}) {
    try {
      const response = await axios.post(endpoint, params);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async put(endpoint, params = {}) {
    try {
      const response = await axios.put(endpoint, params);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(endpoint, body) {
    try {
      const response = await axios.delete(endpoint, { data: body });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response && error.response.status === 401) {
    }
    if (error.code === requestAbordCode || ('response' in error && error.response === undefined)) {
      error.recall = true;
    }
    throw error;
  }

  async postFormData(endpoint, body, params = {}) {
    try {
      const response = await axios.post(endpoint, body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }
};

const client = new RequestClient();

export { client };

