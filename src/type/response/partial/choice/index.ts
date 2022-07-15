import { z } from 'zod';

export const choiceSchema = z.object({
  id: z.number(),
  content: z.string(),
  is_other: z.boolean(),
});

export type Choice = z.infer<typeof choiceSchema>;
