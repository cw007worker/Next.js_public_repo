import HttpClient from 'inflastructure/HttpClient';
import { sentryLog } from 'libs/setnry';
import { AddNewCard } from 'type/request/addNewCard';
import { errorHandler } from 'utils/errorHandler';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const addNewCard = async (
  req: AddNewCard
): Promise<{
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
        method: 'POST',
        url: `/payment_ways`,
        params: {
          card_token: req.card_token,
        },
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
