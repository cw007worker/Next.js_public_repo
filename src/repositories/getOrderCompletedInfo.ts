import { errorHandler } from 'utils/errorHandler';
import HttpClient from 'inflastructure/HttpClient';
import { GetOrderCompletedInfoResponse } from 'type/response/getOrderCompletedInfo';
import { sentryLog } from 'libs/setnry';
import { validateGetOrderCompletedInfo } from './validator/validateGetOrderCompletedInfo';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getOrderCompletedInfo = async (): Promise<GetOrderCompletedInfoResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetOrderCompletedInfoResponse>({
        url: 'orders/latest',
      })
      .then((res) => {
        data = res.data;
      });
    // res = await JSON.parse(JSON.stringify(data));
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetOrderCompletedInfoResponse;
  try {
    parsed = validateGetOrderCompletedInfo(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    throw new Error('invalid data');
  }

  return parsed;
};
