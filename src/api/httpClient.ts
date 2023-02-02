import { Notification } from 'app/components/Notification';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { isEmpty } from 'lodash';
import { BaseAPI, ErrorCode } from 'utils/constants';
import { CacheKey, LocalStorageUtil } from 'utils/localStorageUtil';
import { AuthAPIPath } from './auth/authApi';
import { AuthResult } from './auth/models';
import { ResponseResult } from './common/models';

enum StatusCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

interface IHttpClient {}

class HttpClient implements IHttpClient {
  private http: AxiosInstance;

  constructor() {
    this.http = this.initHttp();
  }

  private initHttp() {
    if (this.http != null) {
      return this.http;
    }
    const http = axios.create({
      baseURL: BaseAPI,
      headers,
    });

    http.interceptors.request.use(this.requestInterceptors, error =>
      Promise.reject(error),
    );

    createAuthRefreshInterceptor(http, this.refreshAuthLogic, {
      statusCodes: [StatusCode.Unauthorized],
      interceptNetworkError: false,
    });

    http.interceptors.response.use(
      this.responseInterceptors,
      this.responseErrorInterceptors,
    );

    return http;
  }

  private refreshAuthLogic = failedRequest => {
    const refreshToken = LocalStorageUtil.get<string>(
      CacheKey.WebApiRefreshhToken,
    );
    if (!isEmpty(refreshToken)) {
      axios.post(AuthAPIPath.RefreshToken, {}).then(tokenRefreshResponse => {
        const { token, refreshToken } = tokenRefreshResponse.data as AuthResult;
        LocalStorageUtil.set(CacheKey.WebApiToken, token);
        LocalStorageUtil.set(CacheKey.WebApiRefreshhToken, refreshToken);

        failedRequest.response.config.headers['Authorization'] =
          'Bearer ' + token;
        return Promise.resolve();
      });
    }
    return Promise.reject();
  };

  private requestInterceptors = (
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig => {
    try {
      if (LocalStorageUtil.hasValue(CacheKey.WebApiToken) && config.headers) {
        config.headers[
          'Authorization'
        ] = `Bearer ${LocalStorageUtil.get<string>(CacheKey.WebApiToken)}`;
      }
      return config;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  private responseInterceptors = (response: AxiosResponse) => {
    return response.data;
  };
  private responseErrorInterceptors = (error: AxiosError) => {
    if (error.response?.status === StatusCode.TooManyRequests) {
      var rateLimitRest = error.response.headers['RateLimit-Reset'];
      Notification.error(ErrorCode.TooManyRequest, [`${rateLimitRest}`]);
    }
    if (error.response?.status === StatusCode.NotFound) {
      Notification.error(ErrorCode.UnknownError);
    }

    if (error.response?.status === StatusCode.BadRequest) {
      const data = error.response.data as ResponseResult<boolean>;
      Notification.error(data.code);
    }
    Promise.reject(error);
  };

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  uploadFiles<T>(url: string, files: File[], fileType: string): Promise<T> {
    var formData = new FormData();
    files.forEach(x => formData.append(fileType, x));
    return this.http.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const httpClient = new HttpClient();
