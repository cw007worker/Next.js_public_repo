import axios from 'axios';
import {
  PantriiApiError,
  StripeApiError,
  VoucherifyApiError,
} from 'inflastructure/ApiError';
import {
  isErrorResponse,
  isPantriiApiError,
  isStripeApiError,
  isVoucherifyApiError,
} from 'type/util/apiError';

export const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error(
      `api error: status: ${error.response?.status ?? ''}, url: ${
        error.response?.config.url ?? ''
      }`
    );

    if (
      isErrorResponse(error.response) &&
      isStripeApiError(error.response.data)
    ) {
      throw new StripeApiError({
        message: error.message,
        response: error.response.data,
      });
    } else if (
      isErrorResponse(error.response) &&
      isVoucherifyApiError(error.response.data)
    ) {
      throw new VoucherifyApiError({
        message: error.message,
        response: error.response.data,
      });
    } else if (
      isErrorResponse(error.response) &&
      isPantriiApiError(error.response.data)
    ) {
      throw new PantriiApiError({
        message: error.message,
        response: error.response.data,
      });
    } else {
      throw new Error(error.message);
    }
  }

  if (error instanceof Error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.error(error);
  throw new Error('予期しないエラーです');
};
