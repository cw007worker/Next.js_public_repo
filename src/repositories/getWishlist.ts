import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { sentryLog } from 'libs/setnry';
import { GetWishlistResponse } from 'type/response/getWishlist';
import { validateGetWishlist } from './validator/validateGetWishlist';
import { GetProductByWishlistsRequest } from 'type/request/getProductsByWishlist';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getWishlist = async (
  req: GetProductByWishlistsRequest
): Promise<GetWishlistResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetWishlistResponse>({
        url: `wishlists`,
        params: {
          page: req.page,
          per: req.per,
        },
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetWishlistResponse;
  try {
    parsed = validateGetWishlist(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
