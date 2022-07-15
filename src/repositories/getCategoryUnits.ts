import { GetCategoryUnitsResponse } from 'type/response/getCategoryUnits';
import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { validateGetCategoryProducts } from './validator/validateGetCategoryUnits';
import { GetCategoryUnitsByIdRequest } from 'type/request/getCategoryUnitsById';
import { sentryLog } from 'libs/setnry';
import json from 'repositories/fixture/getCategoryUnits.json';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getCategoryUnits = async (
  req: GetCategoryUnitsByIdRequest
): Promise<GetCategoryUnitsResponse> => {
  let data: unknown;
  try {
    // data = JSON.parse(JSON.stringify(json));
    await httpClient
      .request<GetCategoryUnitsResponse>({
        url: `categories/${req.id}/units`,
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

  let parsed: GetCategoryUnitsResponse;
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
