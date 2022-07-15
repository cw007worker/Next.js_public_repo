import { GetBrandUnitsResponse } from 'type/response/getBrandUnits';
import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { validateGetBrandUnits } from './validator/validateGetBrandUnits';
import { GetBrandUnitsByIdRequest } from 'type/request/getBrandUnitsById';
import { sentryLog } from 'libs/setnry';
import fixture from 'repositories/fixture/getBrandUnits.json';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getBrandUnits = async (
  req: GetBrandUnitsByIdRequest
): Promise<GetBrandUnitsResponse> => {
  let data: unknown;
  try {
    // data = await JSON.parse(JSON.stringify(fixture));
    await httpClient
      .request<GetBrandUnitsResponse>({
        url: `brands/${req.id}/units`,
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

  let parsed: GetBrandUnitsResponse;
  try {
    parsed = validateGetBrandUnits(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
