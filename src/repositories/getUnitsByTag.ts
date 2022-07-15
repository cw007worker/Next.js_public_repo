import { GetUnitsByTagResponse } from 'type/response/getUnitsByTag';
import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { validateGetUnitsByTag } from './validator/validateGetUnitsByTag';
import { GetUnitsByTagRequest } from 'type/request/getUnitsByTag';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getUnitsByTag = async (
  req: GetUnitsByTagRequest
): Promise<GetUnitsByTagResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetUnitsByTagResponse>({
        url: `tags/${req.id}/units`,
        params: {
          page: req.page,
          per: req.per,
          sort: req.sort,
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

  let parsed: GetUnitsByTagResponse;
  try {
    parsed = validateGetUnitsByTag(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
