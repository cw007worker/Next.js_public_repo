import { GetCategoryProductsResponse } from 'type/response/getCategoryProducts';
import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { validateGetCategoryProducts } from './validator/validateGetCategoryProducts';
import { GetCategoryProductsByIdRequest } from 'type/request/getCategoryProductsById';
import json from 'repositories/fixture/getCategoryProducts.json';

import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getCategoryProducts = async (
  req: GetCategoryProductsByIdRequest
): Promise<GetCategoryProductsResponse> => {
  let data: unknown;
  try {
    // data = JSON.parse(JSON.stringify(json));
    await httpClient
      .request<GetCategoryProductsResponse>({
        url: `categories/${req.id}/products`,
        params: {
          page: req.page,
          per: req.per,
          sort: req.sort,
          brand_ids: req.brand_ids ? [req.brand_ids] : undefined,
        },
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetCategoryProductsResponse;
  try {
    parsed = validateGetCategoryProducts(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
