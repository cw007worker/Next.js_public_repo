import { validateGetTags } from './validator/validateGetTags';
import HttpClient from 'inflastructure/HttpClient';
import { GetTagsRequest } from 'type/request/getTags';
import { errorHandler } from 'utils/errorHandler';
import { sentryLog } from 'libs/setnry';
import { GetTagsResponse } from 'type/response/getTags';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getTags = async (
  req: GetTagsRequest
): Promise<GetTagsResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetTagsResponse>({
        url: `tags`,
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetTagsResponse;
  try {
    parsed = validateGetTags(data);
  } catch (error) {
    sentryLog(error);
    throw new Error('invalid data');
  }

  return parsed;
};
