import HttpClient from 'inflastructure/HttpClient';
import { SendResetPasswordLinkToEmail } from 'type/request/sendResetPasswordLinkToEmail';
import { errorHandler } from 'utils/errorHandler';

// Next API Routesにリクエストを行う
const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_ROOT_URL,
});

// TODO: auth/email-not-foundが返却されることが多いので、そのエラーメッセージを表示できるようにハンドリングしたい
export const sendResetPasswordLinkToEmail = async (
  req: SendResetPasswordLinkToEmail
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
        method: 'post',
        url: `/api/sendResetPasswordLinkToEmail`,
        data: req,
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    errorHandler(err);
  }

  return data;
};
