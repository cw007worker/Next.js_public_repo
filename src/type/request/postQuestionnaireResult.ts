import { z } from 'zod';

export const postQuestionnaireResultSchema = z.object({
  id: z.number(),
  answers: z.array(
    z.object({
      question_id: z.number(),
      contents: z.array(z.string()),
    })
  ),
});

export type PostQuestionnaireResult = z.infer<
  typeof postQuestionnaireResultSchema
>;
