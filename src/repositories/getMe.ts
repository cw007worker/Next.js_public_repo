import { validateGetMe } from './validator/validateGetMe';
import { errorHandler } from 'utils/errorHandler';
import HttpClient from 'inflastructure/HttpClient';
import { GetMeResponse } from 'type/response/getMe';
import json from 'repositories/fixture/getMe.json';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getMe = async (): Promise<GetMeResponse> => {
  let data: unknown;
  try {
    data = await httpClient
      .request<GetMeResponse>({
        url: 'me',
      })
      .then((res) => (data = res.data));
    // data = await JSON.parse(JSON.stringify(json));
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetMeResponse;
  try {
    parsed = validateGetMe(data);
  } catch (error) {
    sentryLog(error);
    throw new Error('invalid data');
  }

  return parsed;
};
