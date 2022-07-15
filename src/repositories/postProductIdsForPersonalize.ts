import HttpClient from 'inflastructure/HttpClient';
import { sentryLog } from 'libs/setnry';
import { PostProductIdsForPersonalize } from 'type/request/postProductIdsForPersonalize';
import { errorHandler } from 'utils/errorHandler';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const postProductIdsForPersonalize = async (
  req: PostProductIdsForPersonalize
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
        url: `personalize`,
        method: 'post',
        data: {
          product_ids: req.product_ids,
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
