import HttpClient from 'inflastructure/HttpClient';
import { GetPartialUnitsRequest } from 'type/request/getPartialUnits';
import { GetPartialUnitsResponse } from 'type/response/getPartialUnits';
import demoData from 'repositories/fixture/getPartialUnits.json';
import { errorHandler } from 'utils/errorHandler';
import { validateGetPartialUnits } from './validator/validateGetPartialUnits';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getPartialUnits = async (
  req: GetPartialUnitsRequest
): Promise<GetPartialUnitsResponse> => {
  let data: unknown;
  const { tag_id, unit_ids } = req;
  try {
    await httpClient
      .request<GetPartialUnitsResponse>({
        url: `tags/${tag_id}/partial_units`,
        params: { unit_ids },
      })
      .then((res) => {
        data = res.data;
      });
    // data = demoData;
  } catch (err) {
    errorHandler(err);
  }

  let parsed: GetPartialUnitsResponse;
  try {
    parsed = validateGetPartialUnits(data);
  } catch (err) {
    console.log(err);
    //TODO: errorオブジェクトをまとめたい
    throw new Error('invalid data');
  }

  return parsed;
};
