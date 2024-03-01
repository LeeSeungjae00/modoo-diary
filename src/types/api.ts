export interface APIResponseType<T> extends APIErrorType {
  data: T;
}

export interface APIErrorType {
  error: {
    code: string;
    message: string;
  };
}
