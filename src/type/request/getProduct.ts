import { z } from 'zod';

export const getProductSchema = z.object({
  id: z.string(),
  unit_id: z.union([z.string(), z.undefined()]),
});

export type GetProductRequest = z.infer<typeof getProductSchema>;
