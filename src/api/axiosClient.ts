import axios from 'axios';
import { BaseAPI } from 'utils/constants';

export const axiosClinet = axios.create({
  baseURL: BaseAPI,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axios.interceptors.request.use(
  request => {
    if (!request.headers?.get('')) {
      request.headers.set('Authorization', 'Bearer ' + getAccessToken());
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);
