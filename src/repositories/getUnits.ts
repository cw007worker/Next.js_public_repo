import { GetUnitsRequest } from 'type/request/getUnits';
import { GetUnitsResponse } from 'type/response/getUnits';
import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { validateGetUnits } from './validator/validateGetUnits';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getUnits = async (
  req: GetUnitsRequest
): Promise<GetUnitsResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetUnitsResponse>({
        url: `units`,
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

  let parsed: GetUnitsResponse;
  try {
    parsed = validateGetUnits(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
