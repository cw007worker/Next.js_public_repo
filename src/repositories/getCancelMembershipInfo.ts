import { validateCancelMembership } from './validator/validateCancelMembership';
import { errorHandler } from 'utils/errorHandler';
import HttpClient from 'inflastructure/HttpClient';
import { GetMembershipInfoResponse } from 'type/response/getMembershipInfo';
import { sentryLog } from 'libs/setnry';
import { validateGetMembershipInfo } from './validator/validateGetMembershipInfo';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getCancelMembershipInfo = async (
  membership_id: number
): Promise<GetMembershipInfoResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetMembershipInfoResponse>({
        url: `memberships/${membership_id}/cancellations/new`,
      })
      .then((res) => {
        data = res.data;
      });
    // res = await JSON.parse(JSON.stringify(data));
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetMembershipInfoResponse;
  try {
    parsed = validateGetMembershipInfo(data);
  } catch (error) {
    sentryLog(error);
    throw new Error('invalid data');
  }

  return parsed;
};
