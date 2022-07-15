import { GetProductsByTagResponse } from 'type/response/getProductsByTag';
import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { validateGetProductsByTag } from './validator/validateGetProductsByTag';
import data from 'repositories/fixture/getProductsByTag.json';
import data2 from 'repositories/fixture/getProductsByTag2.json';
import data3 from 'repositories/fixture/getProductsByTag3.json';
import data4 from 'repositories/fixture/getProductsByTag4.json';
import { GetProductsByTagRequest } from 'type/request/getProductsByTag';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getProductsByTag = async (
  req: GetProductsByTagRequest
): Promise<GetProductsByTagResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetProductsByTagResponse>({
        url: `tags/${req.id}/products`,
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

  let parsed: GetProductsByTagResponse;
  try {
    parsed = validateGetProductsByTag(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
