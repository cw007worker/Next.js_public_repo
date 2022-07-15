import { validateGetMembersipPlans } from './validator/validateGetMembersipPlans';
import { errorHandler } from 'utils/errorHandler';
import HttpClient from 'inflastructure/HttpClient';
import { GetMembershipPlansResponse } from 'type/response/getMembershipPlans';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getMembershipPlans =
  async (): Promise<GetMembershipPlansResponse> => {
    let data: unknown;
    try {
      await httpClient
        .request<GetMembershipPlansResponse>({
          url: `membership_plans`,
        })
        .then((res) => {
          data = res.data;
        });
    } catch (err) {
      sentryLog(err);
      errorHandler(err);
    }

    let parsed: GetMembershipPlansResponse;
    try {
      parsed = validateGetMembersipPlans(data);
    } catch (error) {
      console.error(error);
      sentryLog(error);
      throw new Error('invalid data');
    }

    return parsed;
  };
