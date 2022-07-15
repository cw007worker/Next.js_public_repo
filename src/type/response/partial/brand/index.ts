import { z } from 'zod';

export const brandSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.union([z.string(), z.null()]),
});

export type Brand = z.infer<typeof brandSchema>;
