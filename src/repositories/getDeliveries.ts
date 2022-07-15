import HttpClient from 'inflastructure/HttpClient';
import { errorHandler } from 'utils/errorHandler';
import demoData from './fixture/getDeliveries.json';
import { sentryLog } from 'libs/setnry';
import { GetDeliveriesResponse } from 'type/response/getDeliveries';
import { GetDeliveriesRequest } from 'type/request/getDeliveries';
import { validateGetDeliveries } from './validator/validateGetDeliveries';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getDeliveries = async (
  req: GetDeliveriesRequest
): Promise<GetDeliveriesResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetDeliveriesResponse>({
        url: 'deliveries',
        params: req,
      })
      .then((res) => {
        data = res.data;
      });
    // data = await JSON.parse(JSON.stringify(demoData));
  } catch (err) {
    console.log(err);
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetDeliveriesResponse;
  try {
    parsed = validateGetDeliveries(data);
  } catch (error) {
    console.log(error);
    sentryLog(error);
    throw new Error('invalid data');
  }

  return parsed;
};
