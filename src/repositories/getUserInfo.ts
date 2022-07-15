import { errorHandler } from 'utils/errorHandler';
import HttpClient from 'inflastructure/HttpClient';
import demoData from 'repositories/fixture/getAccount.json';
import { sentryLog } from 'libs/setnry';
import { GetUserInfoResponse } from 'type/response/getUserInfo';
import { validateGetUserInfo } from './validator/validateGetUserInfo';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getUserInfo = async (): Promise<GetUserInfoResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetUserInfoResponse>({
        url: 'users/info',
      })
      .then((res) => {
        data = res.data;
      });
    // data = await JSON.parse(JSON.stringify(demoData));
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetUserInfoResponse;
  try {
    parsed = validateGetUserInfo(data);
  } catch (error) {
    sentryLog(error);
    console.error(error);
    throw new Error('invalid data');
  }

  return parsed;
};
