import { validateGetOrderInfo } from './validator/validateGetOrderInfo';
import { errorHandler } from 'utils/errorHandler';
import HttpClient from 'inflastructure/HttpClient';
import data from 'repositories/fixture/getOrderInfo.json';
import { GetOrderInfoResponse } from 'type/response/getOrderInfo';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getOrderInfo = async (): Promise<GetOrderInfoResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetOrderInfoResponse>({
        url: 'orders/new',
      })
      .then((res) => {
        data = res.data;
      });
    // res = await JSON.parse(JSON.stringify(data));
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetOrderInfoResponse;
  try {
    parsed = validateGetOrderInfo(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    throw new Error('invalid data');
  }

  return parsed;
};
