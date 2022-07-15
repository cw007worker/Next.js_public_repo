import { GetItemSearchSuggestKeywordsReqest } from './../type/request/getItemSearchSuggestKeywords';
import { GetItemSearchSuggestKeywordsResponse } from '../type/response/getItemSearchSuggestKeywords';
import HttpClient from 'inflastructure/HttpClient';
import demoData from 'repositories/fixture/getUnitList.json';
import { errorHandler } from 'utils/errorHandler';
import { validateGetItemSearchSuggestKeywords } from './validator/validateGetItemSearchSuggestKeywords';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getItemSearchSuggestKeywords = async (
  req: GetItemSearchSuggestKeywordsReqest
): Promise<GetItemSearchSuggestKeywordsResponse> => {
  let data: unknown;
  const { keyword, limit } = req;
  try {
    await httpClient
      .request<GetItemSearchSuggestKeywordsResponse>({
        url: `item_search_suggest_keywords`,
        params: { keyword, limit },
      })
      .then((res) => {
        data = res.data;
      });
    // data = demoData;
  } catch (err) {
    errorHandler(err);
  }

  let parsed: GetItemSearchSuggestKeywordsResponse;
  try {
    parsed = validateGetItemSearchSuggestKeywords(data);
  } catch (err) {
    console.log(err);
    throw new Error('invalid data');
  }

  return parsed;
};
