import HttpClient from 'inflastructure/HttpClient';
import { sentryLog } from 'libs/setnry';
import { errorHandler } from 'utils/errorHandler';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const addUser = async (): Promise<{
  status: number;
  message: null;
}> => {
  let data: any;
  try {
    await httpClient
      .request<{
        status: number;
        message: null;
      }>({
        url: 'users',
        method: 'post',
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  return data;
};
