import HttpClient from 'inflastructure/HttpClient';
import { GenerateSignInLinkRequest } from 'type/request/generateSignInLink';
import { GenerateSignInLinkResponse } from 'type/response/generateSignInLink';
import { errorHandler } from 'utils/errorHandler';
import { validateGenarateSignInLink } from 'repositories/validator/validateGenerateSignInLink';

// Next API Routesにリクエストを行う
const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_ROOT_URL,
});

export const generateSignInLink = async (
  req: GenerateSignInLinkRequest
): Promise<GenerateSignInLinkResponse> => {
  let data: any;
  try {
    await httpClient
      .request<GenerateSignInLinkResponse>({
        method: 'post',
        url: `/api/generateSignInLink`,
        data: req,
      })
      .then((res) => {
        data = res.data;
      });
  } catch (err) {
    errorHandler(err);
  }

  let parsed: GenerateSignInLinkResponse;
  try {
    parsed = validateGenarateSignInLink(data);
  } catch (error) {
    console.error(error);
    throw new Error('invalid data');
  }

  return parsed;
};
