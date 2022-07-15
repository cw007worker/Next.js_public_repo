import { validateGetBrandCategories } from './validator/validateGetBrandCategories';
import HttpClient from 'inflastructure/HttpClient';
import { GetBrandCategoriesResponse } from 'type/response/getBrandCategories';
import { GetBrandCategoriesRequest } from 'type/request/getBrandCategories';
import { errorHandler } from 'utils/errorHandler';
import { sentryLog } from 'libs/setnry';
import { getBuildEnv } from 'utils/getBuildEnv';
import forDev from 'repositories/fixture/getBrandCategories.development.json';
import forProd from 'repositories/fixture/getBrandCategories.production.json';
import forPreview from 'repositories/fixture/getBrandCategories.preview.json';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

// const buildEnv = getBuildEnv();

export const getBrandCategories = async (
  req: GetBrandCategoriesRequest
): Promise<GetBrandCategoriesResponse> => {
  let data: unknown;
  try {
    // if (buildEnv === 'development') {
    //   data = await JSON.parse(JSON.stringify(forDev));
    // } else if (buildEnv === 'preview') {
    //   data = await JSON.parse(JSON.stringify(forPreview));
    // } else if (buildEnv === 'production') {
    //   data = await JSON.parse(JSON.stringify(forProd));
    // } else {
    //   throw new Error('環境変数が不正です。');
    // }
    await httpClient
      .request<GetBrandCategoriesResponse>({
        url: `brands/${req.id}/categories`,
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetBrandCategoriesResponse;
  try {
    parsed = validateGetBrandCategories(data);
  } catch (error) {
    sentryLog(error);
    console.error(error);
    throw new Error('invalid data');
  }

  return parsed;
};
