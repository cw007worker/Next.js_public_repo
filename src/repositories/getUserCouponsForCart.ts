import demoData from 'repositories/fixture/getUserCouponsForCart.json';
import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { sentryLog } from 'libs/setnry';
import { GetUserCouponsForCartResponse } from 'type/response/getUserCouponsForCart';
import { validateGetUserCouponsForCart } from './validator/validateGetUserCouponsForCart';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getUserCouponsForCart =
  async (): Promise<GetUserCouponsForCartResponse> => {
    let data: unknown;
    try {
      await httpClient
        .request<GetUserCouponsForCartResponse>({
          url: 'user_coupons/usable_for_cart',
        })
        .then((res) => {
          data = res.data;
        });
      // data = demoData;
    } catch (err) {
      sentryLog(err);
      errorHandler(err);
    }

    let parsed: GetUserCouponsForCartResponse;
    try {
      parsed = validateGetUserCouponsForCart(data);
    } catch (error) {
      console.error(error);
      sentryLog(error);
      //TODO: errorオブジェクトをまとめたい
      throw new Error('invalid data');
    }

    return parsed;
  };
