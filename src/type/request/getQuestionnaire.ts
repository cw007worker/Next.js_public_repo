import { z } from 'zod';

export const getQuestionnaireSchema = z.object({
  id: z.number(),
});

export type GetQuestionnaireRequest = z.infer<typeof getQuestionnaireSchema>;
