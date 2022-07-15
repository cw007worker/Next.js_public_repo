import { unitWithProductSchema } from './partial/unit/withProduct';
import { pagenationSchema } from './partial/pagenation';
import { z } from 'zod';

export const getUnitListSchema = z.object({
  units: z.array(unitWithProductSchema),
  pagenation: pagenationSchema,
});

export type GetUnitListResponse = z.infer<typeof getUnitListSchema>;
