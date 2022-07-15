// GET api/v1/subscribe_membership/new
import { validateGetMembersipPlanForSubscribe } from './validator/validateGetMembersipPlanForSubscribe';
import { errorHandler } from 'utils/errorHandler';
import HttpClient from 'inflastructure/HttpClient';
import { GetMembershipPlanForSubscribeResponse } from 'type/response/getMembershipPlanForSubscribe';
import { sentryLog } from 'libs/setnry';
import { GetMembershipPlanForSubscribeRequest } from 'type/request/getMembershipPlanForSubscribe';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getMembershipPlanForSubscribe = async (
  req: GetMembershipPlanForSubscribeRequest
): Promise<GetMembershipPlanForSubscribeResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetMembershipPlanForSubscribeResponse>({
        url: `membership_plans/${req.membership_plan_id}/memberships/new`,
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetMembershipPlanForSubscribeResponse;
  try {
    parsed = validateGetMembersipPlanForSubscribe(data);
  } catch (error) {
    sentryLog(error);
    throw new Error('invalid data');
  }

  return parsed;
};
