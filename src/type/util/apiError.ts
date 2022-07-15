import { AxiosResponse } from 'axios';
import { ErrorResponse } from 'type/response/errorResponse';
import { isFirebaseAuthError } from './firebaseAuth';

export const isErrorResponse = (
  err_responce: any
): err_responce is AxiosResponse<ErrorResponse> => {
  return typeof err_responce !== undefined && err_responce.data;
};

export const isStripeApiError = (err: any): err is ErrorResponse => {
  return err && err.code && err.code.startsWith('stripe/');
};

export const isVoucherifyApiError = (err: any): err is ErrorResponse => {
  return err && err.code && err.code.startsWith('voucherify/');
};

export const isPantriiApiError = (err: any): err is ErrorResponse => {
  if (isFirebaseAuthError(err)) return false;
  if (isStripeApiError(err)) return false;
  if (isVoucherifyApiError(err)) return false;

  return true;
};
