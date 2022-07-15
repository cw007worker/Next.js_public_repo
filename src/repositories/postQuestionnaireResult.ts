import { errorHandler } from 'utils/errorHandler';
import HttpClient from 'inflastructure/HttpClient';
import { PostQuestionnaireResult } from 'type/request/postQuestionnaireResult';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const postQuestionnaireResult = async (
  req: PostQuestionnaireResult
): Promise<{
  status: number;
  message: null;
}> => {
  let data: any;
  try {
    await httpClient
      .request<PostQuestionnaireResult>({
        url: `questionnaires/${req.id}/create_answer`,
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
