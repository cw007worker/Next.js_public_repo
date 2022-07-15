import { GetProductsByRankingTagResponse } from 'type/response/getProductsByRankingTag';
import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { GetProductsByTagRequest } from 'type/request/getProductsByTag';
import { sentryLog } from 'libs/setnry';
import { validateGetProductsByRankingTag } from './validator/validateGetProductsByRankingTag';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getProductsByRankingTag = async (
  req: GetProductsByTagRequest
): Promise<GetProductsByRankingTagResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetProductsByRankingTagResponse>({
        url: `ranking_tags/${req.id}/products`,
        params: {
          page: req.page,
          per: req.per,
        },
      })
      .then((res) => {
        data = res.data;
      });
    // if (req.id === 3) {
    //   data = await JSON.parse(JSON.stringify(data));
    // } else if (req.id === 4) {
    //   data = await JSON.parse(JSON.stringify(data2));
    // } else if (req.id === 5) {
    //   data = await JSON.parse(JSON.stringify(data4));
    // } else {
    //   data = await JSON.parse(JSON.stringify(data3));
    // }
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetProductsByRankingTagResponse;
  try {
    parsed = validateGetProductsByRankingTag(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
