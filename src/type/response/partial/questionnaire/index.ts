import { z } from 'zod';
import { questionSchema } from '../question';

export const questionnaireSchema = z.object({
  id: z.number(),
  name: z.string(),
  questions: z.array(questionSchema),
});

export type Questionnaire = z.infer<typeof questionnaireSchema>;
