import { z } from 'zod';

export const addCartSchema = z.object({
  quantity: z.number(),
  unit_id: z.number(),
});

export type AddCart = z.infer<typeof addCartSchema>;
