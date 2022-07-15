import {
  GetQuestionnaireResponse,
  getQuestionnaireSchema,
} from 'type/response/getQuestionnaire';

export const validateGetQuestionnaire = (
  data: unknown
): GetQuestionnaireResponse => {
  const parsed = getQuestionnaireSchema.parse(data);
  return parsed;
};
