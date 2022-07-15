import demoData from 'repositories/fixture/getUserCoupons.json';
import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { sentryLog } from 'libs/setnry';
import { GetUserCouponsResponse } from 'type/response/getUserCoupons';
import { validateGetUserCoupons } from './validator/validateGetUserCoupons';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getUserCoupons = async (): Promise<GetUserCouponsResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetUserCouponsResponse>({
        url: 'user_coupons',
      })
      .then((res) => {
        data = res.data;
      });
    // data = demoData;
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetUserCouponsResponse;
  try {
    parsed = validateGetUserCoupons(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
