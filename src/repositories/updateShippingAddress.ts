import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import { UpdateShippingAddress } from 'type/request/updateShippingAddress';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const updateShippingAddress = async (
  req: UpdateShippingAddress
): Promise<{
  status: number;
  message: null;
}> => {
  let data: any;
  const { id, ...rest } = req;
  try {
    await httpClient
      .request<{
        status: number;
        message: null;
      }>({
        url: `shipping_addresses/${id}`,
        method: 'patch',
        data: rest,
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    errorHandler(err);
  }

  return data;
};
