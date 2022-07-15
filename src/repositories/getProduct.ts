import HttpClient from 'inflastructure/HttpClient';
import { GetProductRequest } from 'type/request/getProduct';
import { GetProductResponse } from 'type/response/getProduct';
import { errorHandler } from 'utils/errorHandler';
import { validateGetProduct } from './validator/validateGetProduct';
import demoData from 'repositories/fixture/getProductWtihDefault.json';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getProduct = async (
  req: GetProductRequest
): Promise<GetProductResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetProductResponse>({
        url: `products/${req.id}`,
      })
      .then((res) => {
        data = res.data;
      });
    // data = await JSON.parse(JSON.stringify(demoData));
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetProductResponse;
  try {
    parsed = validateGetProduct(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
