import { z } from 'zod';

export const provisionalOrderSchema = z.object({
  client_secret: z.string(),
});

export type ProvisionalOrderResponse = z.infer<typeof provisionalOrderSchema>;
