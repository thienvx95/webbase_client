export interface ResponseResult<T> {
  errorCode: string;
  errors: string[];
  message?: string;
  success?: boolean;
  data: T | Array<T>;
}
