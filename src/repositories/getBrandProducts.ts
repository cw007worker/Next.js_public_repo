import { GetBrandProductsResponse } from 'type/response/getBrandProducts';
import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { validateGetBrandProducts } from './validator/validateGetBrandProducts';
import { GetBrandProductsRequest } from 'type/request/getBrandProductsById';
import { sentryLog } from 'libs/setnry';
import fixture from 'repositories/fixture/getBrandProducts.json';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getBrandProducts = async (
  req: GetBrandProductsRequest
): Promise<GetBrandProductsResponse> => {
  let data: unknown;
  try {
    // data = await JSON.parse(JSON.stringify(fixture));
    await httpClient
      .request<GetBrandProductsResponse>({
        url: `brands/${req.id}/products`,
        params: {
          page: req.page,
          per: req.per,
          sort: req.sort,
          category_ids: req.category_ids ? [req.category_ids] : undefined,
        },
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetBrandProductsResponse;
  try {
    parsed = validateGetBrandProducts(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
