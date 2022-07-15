import HttpClient from 'inflastructure/HttpClient';
import { sentryLog } from 'libs/setnry';
import { DeleteCartItem } from 'type/request/deleteCartItem';
import { errorHandler } from 'utils/errorHandler';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const deleteCartItem = async (
  req: DeleteCartItem
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
        url: `cart_items?unit_id=${req.unit_id}`,
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
