import { validateGetCategoryBrands } from './validator/validateGetCategoryBrands';
import HttpClient from 'inflastructure/HttpClient';
import { GetCategoryBrandsResponse } from 'type/response/getCategoryBrands';
import { GetCategoryBrandsRequest } from 'type/request/getCategoryBrands';
import { errorHandler } from 'utils/errorHandler';
import { sentryLog } from 'libs/setnry';
import { getBuildEnv } from 'utils/getBuildEnv';
import forDev from 'repositories/fixture/getCategoryBrands.development.json';
import forProd from 'repositories/fixture/getCategoryBrands.production.json';
import forPreview from 'repositories/fixture/getCategoryBrands.preview.json';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

// const buildEnv = getBuildEnv();

export const getCategoryBrands = async (
  req: GetCategoryBrandsRequest
): Promise<GetCategoryBrandsResponse> => {
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
      .request<GetCategoryBrandsResponse>({
        url: `categories/${req.id}/brands`,
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetCategoryBrandsResponse;
  try {
    parsed = validateGetCategoryBrands(data);
  } catch (error) {
    sentryLog(error);
    throw new Error('invalid data');
  }

  return parsed;
};
