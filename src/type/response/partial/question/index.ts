import { z } from 'zod';
import { choiceSchema } from '../choice';

export const questionSchema = z.object({
  id: z.number(),
  body: z.string(),
  allow_multiple_choice: z.boolean(),
  required: z.boolean(),
  has_other: z.boolean(),
  is_free_answer: z.boolean(),
  order_index: z.number(),
  choices: z.array(choiceSchema),
});

export type Question = z.infer<typeof questionSchema>;
