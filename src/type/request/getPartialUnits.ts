import { z } from 'zod';

export const getPartialUnitsSchema = z.object({
  tag_id: z.number(),
  unit_ids: z.array(z.number()),
});

export type GetPartialUnitsRequest = z.infer<typeof getPartialUnitsSchema>;
