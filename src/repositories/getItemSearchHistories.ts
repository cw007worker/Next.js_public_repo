import { GetItemSearchHistoriesReqest } from './../type/request/getItemSearchHistory';
import { GetItemSearchHistoriesResponse } from '../type/response/getItemSearchHistories';
import HttpClient from 'inflastructure/HttpClient';
import demoData from 'repositories/fixture/getItemSearchHistories.json';
import { errorHandler } from 'utils/errorHandler';
import { validateGetItemSearchItemHistories } from './validator/validateItemSearchHistories';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getItemSearchHistories = async (
  req: GetItemSearchHistoriesReqest
): Promise<GetItemSearchHistoriesResponse> => {
  let data: unknown;
  const { sort, limit } = req;
  try {
    await httpClient
      .request<GetItemSearchHistoriesResponse>({
        url: `item_search_histories`,
        params: { sort, limit },
      })
      .then((res) => {
        data = res.data;
      });
    // data = demoData;
  } catch (err) {
    errorHandler(err);
  }

  let parsed: GetItemSearchHistoriesResponse;
  try {
    parsed = validateGetItemSearchItemHistories(data);
  } catch (err) {
    console.log(err);
    throw new Error('invalid data');
  }

  return parsed;
};
