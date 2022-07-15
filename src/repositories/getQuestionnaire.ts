import HttpClient from 'inflastructure/HttpClient';
import { GetQuestionnaireRequest } from 'type/request/getQuestionnaire';
import { GetQuestionnaireResponse } from 'type/response/getQuestionnaire';
import { errorHandler } from 'utils/errorHandler';
import { validateGetQuestionnaire } from './validator/validateGetQuestionnaire';
import demoData from 'repositories/fixture/getQuestionnaire.json';
import { sentryLog } from 'libs/setnry';

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const getQuestionnaire = async (
  req: GetQuestionnaireRequest
): Promise<GetQuestionnaireResponse> => {
  let data: unknown;
  try {
    await httpClient
      .request<GetQuestionnaireResponse>({
        url: `questionnaires/${req.id}`,
      })
      .then((res) => {
        data = res.data;
      });
    // data = await JSON.parse(JSON.stringify(demoData));
  } catch (err) {
    sentryLog(err);
    errorHandler(err);
  }

  let parsed: GetQuestionnaireResponse;
  try {
    parsed = validateGetQuestionnaire(data);
  } catch (error) {
    console.error(error);
    sentryLog(error);
    throw new Error('invalid data');
  }

  return parsed;
};
