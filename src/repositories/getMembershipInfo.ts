import { errorHandler } from 'utils/errorHandler';
import HttpClient from 'inflastructure/HttpClient';
import { sentryLog } from 'libs/setnry';
import { validateGetMembershipInfo } from './validator/validateGetMembershipInfo';
import { GetMembershipInfoResponse } from 'type/response/getMembershipInfo';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getMembershipInfo =
  async (): Promise<GetMembershipInfoResponse> => {
    let data: unknown;
    try {
      await httpClient
        .request<GetMembershipInfoResponse>({
          url: 'memberships/latest',
        })
        .then((res) => {
          data = res.data;
        });
    } catch (err) {
      sentryLog(err);
      errorHandler(err);
    }

    let parsed: GetMembershipInfoResponse;
    try {
      parsed = validateGetMembershipInfo(data);
    } catch (error) {
      sentryLog(error);
      console.error(error);
      throw new Error('invalid data');
    }

    return parsed;
  };
