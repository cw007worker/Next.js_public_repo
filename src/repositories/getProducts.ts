import { GetProductsRequest } from 'type/request/getProducts';
import { GetProductsResponse } from 'type/response/getProducts';
import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { validateGetProducts } from './validator/validateGetProducts';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getProducts = async (
  req: GetProductsRequest
): Promise<GetProductsResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetProductsResponse>({
        url: `products`,
        params: {
          page: req.page,
          per: req.per,
          sort: req.sort,
        },
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetProductsResponse;
  try {
    parsed = validateGetProducts(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
