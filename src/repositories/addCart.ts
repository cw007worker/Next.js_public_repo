import HttpClient from 'inflastructure/HttpClient';
import { sentryLog } from 'libs/setnry';
import { AddCart } from 'type/request/addCart';
import { errorHandler } from 'utils/errorHandler';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const addCart = async (
  req: AddCart
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
        method: 'post',
        url: `cart_items?unit_id=${req.unit_id}&quantity=${req.quantity}`,
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  return data;
};
