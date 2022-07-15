import { validateGetCart } from './validator/validateGetCart';
import HttpClient from 'inflastructure/HttpClient';
import { GetCartResponse } from 'type/response/getCart';
import { errorHandler } from 'utils/errorHandler';
import demoData from './fixture/getCart.json';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getCart = async (): Promise<GetCartResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetCartResponse>({
        url: 'current_cart',
      })
      .then((res) => {
        data = res.data;
      });
    // data = await JSON.parse(JSON.stringify(demoData));
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetCartResponse;
  try {
    parsed = validateGetCart(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    throw new Error('invalid data');
  }

  return parsed;
};
