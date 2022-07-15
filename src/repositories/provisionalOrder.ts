import { validateProvisionalOrder } from './validator/validateProvisionalOrder';
import { errorHandler } from 'utils/errorHandler';
import HttpClient from 'inflastructure/HttpClient';
import { ProvisionalOrder } from 'type/request/provisionalOrder';
import { ProvisionalOrderResponse } from 'type/response/provisionalOrder';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

/**
 * 注文(仮)確定の処理。
 * @param payment_way_id - stripe_card_idを入れる
 * @param shipping_address_id - shipping_address.idを入れる
 * @param coupon_code - coupon.codeを入れる
 * @returns client_secret - これを使って注文確定API叩く
 */
export const provisionalOrder = async (
  req: ProvisionalOrder
): Promise<ProvisionalOrderResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<ProvisionalOrderResponse>({
        url: 'orders',
        method: 'post',
        data: req,
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: ProvisionalOrderResponse;
  try {
    parsed = validateProvisionalOrder(data);
  } catch (error) {
    sentryLog(error);
    throw new Error('invalid data');
  }

  return parsed;
};
