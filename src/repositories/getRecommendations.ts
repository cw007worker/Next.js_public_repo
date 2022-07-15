import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { validateGetRecommendations } from './validator/validateGetRecommendations';
import data from 'repositories/fixture/getRecommendations.json';
import { GetRecommendationRequest } from 'type/request/getRecommendations';
import { GetRecommendationsResponse } from 'type/response/getRecommendations';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getRecommendations = async (
  req: GetRecommendationRequest
): Promise<GetRecommendationsResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetRecommendationsResponse>({
        url: `recommends`,
        params: {
          page: req.page,
          per: req.per,
          product_id: req.product_id,
        },
      })
      .then((res) => {
        data = res.data;
      });
    // res = await JSON.parse(JSON.stringify(data));
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetRecommendationsResponse;
  try {
    parsed = validateGetRecommendations(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
