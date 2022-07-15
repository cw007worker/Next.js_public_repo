import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.union([z.string(), z.null()]),
});

export type Category = z.infer<typeof categorySchema>;
