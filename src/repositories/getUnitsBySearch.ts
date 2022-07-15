import { GetUnitsBySearchRequest } from './../type/request/getUnitsBySearch';
import { GetUnitListResponse } from '../type/response/getUnitList';
import HttpClient from 'inflastructure/HttpClient';
import demoData from 'repositories/fixture/getUnitList.json';
import { errorHandler } from 'utils/errorHandler';
import { validateGetUnitList } from './validator/validateGetUnitList';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getUnitsBySearch = async (
  req: GetUnitsBySearchRequest
): Promise<GetUnitListResponse> => {
  let data: unknown;
  const { keyword, page, per, sort } = req;
  try {
    await httpClient
      .request<GetUnitListResponse>({
        url: `units/search`,
        params: { keyword, page, per, sort },
      })
      .then((res) => {
        data = res.data;
      });
    // data = demoData;
  } catch (err) {
    errorHandler(err);
  }

  let parsed: GetUnitListResponse;
  try {
    parsed = validateGetUnitList(data);
  } catch (err) {
    console.log(err);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
