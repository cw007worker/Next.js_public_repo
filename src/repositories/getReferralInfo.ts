import { errorHandler } from 'utils/errorHandler';
import HttpClient from 'inflastructure/HttpClient';
import demoData from 'repositories/fixture/getReferralInfo.json';
import { sentryLog } from 'libs/setnry';
import { GetReferralInfoResponse } from 'type/response/getReferralInfo';
import { validateGetReferralInfo } from './validator/validateGetReferralInfo';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getReferralInfo = async (): Promise<GetReferralInfoResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetReferralInfoResponse>({
        url: 'users/referral_info',
      })
      .then((res) => {
        data = res.data;
      });
    // data = demoData;
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetReferralInfoResponse;
  try {
    parsed = validateGetReferralInfo(data);
  } catch (error) {
    sentryLog(error);
    throw new Error('invalid data');
  }

  return parsed;
};
