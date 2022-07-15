import { errorHandler } from 'utils/errorHandler';
import HttpClient from 'inflastructure/HttpClient';
import demoData from 'repositories/fixture/getPaymentWays.json';
import { sentryLog } from 'libs/setnry';
import { validateGetPaymentWays } from './validator/validateGetPaymentWays';
import { GetPaymentWaysResponse } from 'type/response/getPaymentWays';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getPaymentWays = async (): Promise<GetPaymentWaysResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetPaymentWaysResponse>({
        url: 'payment_ways',
      })
      .then((res) => {
        data = res.data;
      });
    // data = await JSON.parse(JSON.stringify(demoData));
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetPaymentWaysResponse;
  try {
    // data = demoData
    parsed = validateGetPaymentWays(data);
  } catch (error) {
    sentryLog(error);
    console.error(error);
    throw new Error('invalid data');
  }

  return parsed;
};
