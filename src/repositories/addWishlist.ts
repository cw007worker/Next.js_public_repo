import HttpClient from 'inflastructure/HttpClient';
import { sentryLog } from 'libs/setnry';
import { AddWishlist } from 'type/request/addWishlist';
import { AddWishlistResponse } from 'type/response/addWishlist';
import { errorHandler } from 'utils/errorHandler';
import { validateAddWishlist } from './validator/validateAddWishlist';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const addWishlist = async (
  req: AddWishlist
): Promise<AddWishlistResponse> => {
  let data: any;
  try {
    await httpClient
      .request<{
        message: null;
      }>({
        method: 'post',
        url: 'wishlists',
        data: req,
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: AddWishlistResponse;
  try {
    parsed = validateAddWishlist(data);
  } catch (error) {
    sentryLog(error);
    console.error(error);
    throw new Error('invalid data');
  }

  return parsed;
};
