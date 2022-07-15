import HttpClient from 'inflastructure/HttpClient';
import { sentryLog } from 'libs/setnry';
import { SubscribeMembershipPlanRequest } from 'type/request/subscribeMembershipPlan';
import { errorHandler } from 'utils/errorHandler';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const subscribeMembershipPlan = async (
  req: SubscribeMembershipPlanRequest
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
        url: `/membership_plans/${req.membership_plan_id}/memberships/${req.membership_id}/subscribed_membership_plans`,
        method: 'post',
        data: req,
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
