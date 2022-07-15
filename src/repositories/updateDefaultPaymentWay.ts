import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { UpdateDefaultPaymentWay } from 'type/request/updateDefaultPaymentWay';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const updateDefaultPaymentWay = async (
  req: UpdateDefaultPaymentWay
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
        url: `payment_ways/${req.stripe_card_id}/update_default`,
        method: 'patch',
        data: req,
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    errorHandler(err);
  }

  return data;
};
