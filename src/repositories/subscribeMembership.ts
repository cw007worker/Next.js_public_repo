import HttpClient from 'inflastructure/HttpClient';
import { sentryLog } from 'libs/setnry';
import { SubscribeMembershipRequest } from 'type/request/subscribeMembership';
import { errorHandler } from 'utils/errorHandler';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const subscribeMembership = async (
  req: SubscribeMembershipRequest
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
        url: `membership_plans/${req.membership_plan_id}/memberships`,
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
