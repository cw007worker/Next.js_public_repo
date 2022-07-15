import HttpClient from 'inflastructure/HttpClient';
import { sentryLog } from 'libs/setnry';
import { DeleteWishlist } from 'type/request/deleteWishlist';
import { errorHandler } from 'utils/errorHandler';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const deleteWishlist = async (
  req: DeleteWishlist
): Promise<{
  message: null;
}> => {
  let data: any;
  try {
    await httpClient
      .request<{
        message: null;
      }>({
        method: 'delete',
        url: `wishlists/${req.wishlist_id}`,
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
