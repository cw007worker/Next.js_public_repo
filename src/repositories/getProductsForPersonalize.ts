import HttpClient from 'inflastructure/HttpClient';
import { sentryLog } from 'libs/setnry';
import { GetProductsForPersonalizeResponse } from 'type/response/getProductsForPersonalize';
import { errorHandler } from 'utils/errorHandler';
import { validateGetProductForPersonalize } from './validator/validateGetProductForPersonalize';
import json from 'repositories/fixture/getProductsForPersonalize.json';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getProductsForPersonalize =
  async (): Promise<GetProductsForPersonalizeResponse> => {
    let data: unknown;
    try {
      // data = await JSON.parse(JSON.stringify(json));
      await httpClient
        .request<GetProductsForPersonalizeResponse>({
          url: `personalize/new`,
        })
        .then((res) => {
          data = res.data;
        });
    } catch (err) {
      sentryLog(err);
      errorHandler(err);
    }

    let parsed: GetProductsForPersonalizeResponse;
    try {
      parsed = validateGetProductForPersonalize(data);
    } catch (error) {
      sentryLog(error);
      throw new Error('invalid data');
    }

    return parsed;
  };
