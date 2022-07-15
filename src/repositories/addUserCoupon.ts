import HttpClient from 'inflastructure/HttpClient';
import { sentryLog } from 'libs/setnry';
import { AddUserCouponRequest } from 'type/request/addUserCoupon';
import { AddUserCouponResponse } from 'type/response/addUserCoupon';
import { errorHandler } from 'utils/errorHandler';
import { validateAddUserCoupon } from './validator/validateAddUserCoupon';
import demoData from 'repositories/fixture/addUserCoupon.json';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const addUserCoupon = async (
  req: AddUserCouponRequest
): Promise<AddUserCouponResponse> => {
  let data: any;
  try {
    await httpClient
      .request<AddUserCouponResponse>({
        method: 'post',
        url: 'user_coupons',
        params: {
          code: req.code,
        },
      })
      .then((res) => {
        data = res.data;
      });
    // data = demoData;
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: AddUserCouponResponse;
  try {
    parsed = validateAddUserCoupon(data);
  } catch (error) {
    sentryLog(error);
    console.error(error);
    throw new Error('invalid data');
  }

  return parsed;
};
