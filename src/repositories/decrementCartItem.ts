import HttpClient from 'inflastructure/HttpClient';
import { sentryLog } from 'libs/setnry';
import { UpdateCartItem } from 'type/request/updateCartItem';
import { errorHandler } from 'utils/errorHandler';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const decrementCartItem = async (
  req: UpdateCartItem
): Promise<{
  status: number;
  message: null;
}> => {
  let data: any;
  try {
    await httpClient
      .request<{
        status: number;
        message: null;
      }>({
        url: `cart_items?unit_id=${req.unit_id}&quantity=${req.quantity || 1}`,
        method: 'delete',
      })
      .then((res) => {
        data = res.data;
      });
    // res = {
    //   status: 201,
    //   message: null,
    // };
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  return data;
};
