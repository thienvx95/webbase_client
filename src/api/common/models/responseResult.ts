export interface ResponseResult<T> extends ErrorResult {
  success?: boolean;
  data: T;
}

export interface ErrorResult {
  code: string;
  errors: string[];
  message?: string;
}
