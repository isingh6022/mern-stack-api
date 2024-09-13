import httpStatus from 'http-status';

export class ApiError extends Error {
  stack: string = ''; // acutally initialized by Error.captureStackTrade

  constructor(public code: number, message: string, stack?: string) {
    super(message);

    if (stack) {
      this.stack = stack;
    } else {
      // So that this call is not included in the stack trace.
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

abstract class GenericError extends Error {
  constructor(className: string, type: string, message: string) {
    super(`[ERROR | ${type}] :: ${className} : ${message}`);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class MultipleSingletonInstancesError extends GenericError {
  constructor(className: string) {
    super(
      className,
      MultipleSingletonInstancesError.name,
      `Attempting to create multiple instances of ${className} which is a singleton class.`
    );
  }
}

export class MethodNotImplemented extends ApiError {
  constructor() {
    super(httpStatus.NOT_IMPLEMENTED, 'Method not implemented');
  }
}
