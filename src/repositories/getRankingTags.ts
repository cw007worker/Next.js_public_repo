import { GetRankingTagsResponse } from './../type/response/getRankingTags';
import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { sentryLog } from 'libs/setnry';
import { validateGetRankingTags } from './validator/validateGetRankingTags';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getRankingTags = async (): Promise<GetRankingTagsResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetRankingTagsResponse>({
        url: `ranking_tags`,
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetRankingTagsResponse;
  try {
    parsed = validateGetRankingTags(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
