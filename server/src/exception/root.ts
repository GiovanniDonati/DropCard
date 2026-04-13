export class HttpException extends Error {
    message: string;
    errorCode: ErrorCode;
    statusCode: number;
    errors: any;

    constructor(
      message: string, 
      errorCode: ErrorCode, 
      statusCode: number, 
      error: any
    ) {
        super(message)
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}

export enum ErrorCode {
  NOT_FOUND = 1001,
  ALREADY_EXISTS = 1002,
  INCORRECT_CREDENTIALS = 1003,
  UNPROCESSABLE_ENTITY = 20001,
  INTERNAL_EXCEPTION = 30001,
  UNAUTHORIZED = 40001
}