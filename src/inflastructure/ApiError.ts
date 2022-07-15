import { ErrorResponse } from 'type/response/errorResponse';

export class PantriiApiError extends Error {
  public readonly name = 'PantriiApiError';
  public readonly response: ErrorResponse;

  constructor({
    message,
    response,
  }: {
    message: string;
    response: ErrorResponse;
  }) {
    super(message);
    this.response = response;
  }
}

export class StripeApiError extends Error {
  public readonly name = 'StripeApiError';
  public readonly response: ErrorResponse;

  constructor({
    message,
    response,
  }: {
    message: string;
    response: ErrorResponse;
  }) {
    super(message);
    this.response = response;
  }
}

export class VoucherifyApiError extends Error {
  public readonly name = 'VoucherifyApiError';
  public readonly response: ErrorResponse;

  constructor({
    message,
    response,
  }: {
    message: string;
    response: ErrorResponse;
  }) {
    super(message);
    this.response = response;
  }
}
