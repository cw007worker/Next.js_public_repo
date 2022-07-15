import { AddShippingAddress } from '../type/request/addShippingAddress';
import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const addShippingAddress = async (
  req: AddShippingAddress
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
        url: 'shipping_addresses',
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

  return data;
};
