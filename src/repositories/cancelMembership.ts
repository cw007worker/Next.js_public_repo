import { validateCancelMembership } from './validator/validateCancelMembership';
import { errorHandler } from 'utils/errorHandler';
import HttpClient from 'inflastructure/HttpClient';
import { CancelMembershipResponse } from 'type/response/cancelMembership';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

/**
 * 解約リクエストを送る処理。
 * @param membership_id subscribe_memberhipの主キー
 * @returns バリデーションしたレスポンス
 */
export const cancelMembership = async (
  membership_id: number
): Promise<CancelMembershipResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<CancelMembershipResponse>({
        url: `memberships/${membership_id}/cancellations`,
        method: 'post',
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: CancelMembershipResponse;
  try {
    parsed = validateCancelMembership(data);
  } catch (error) {
    sentryLog(error);
    throw new Error('invalid data');
  }

  return parsed;
};
