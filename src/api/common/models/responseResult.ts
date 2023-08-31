export class ErrorResult {
  code?: string;
  errors?: string[];
  message?: string;
}
export class ResponseResult<T> extends ErrorResult {
  success?: boolean;
  data?: T;
}
