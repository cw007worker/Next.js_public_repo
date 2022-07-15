import { z } from 'zod';
import { questionnaireSchema } from './partial/questionnaire';

export const getQuestionnaireSchema = z.object({
  questionnaire: questionnaireSchema,
});

export type GetQuestionnaireResponse = z.infer<typeof getQuestionnaireSchema>;
