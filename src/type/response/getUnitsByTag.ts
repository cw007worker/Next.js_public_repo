import { unitWithProductSchema } from './partial/unit/withProduct';
import { tagSchema } from './partial/tag';
import { pagenationSchema } from './partial/pagenation';
import { z } from 'zod';

export const getUnitsByTagSchema = z.object({
  tag: tagSchema,
  units: z.array(unitWithProductSchema),
  pagenation: pagenationSchema,
});

export type GetUnitsByTagResponse = z.infer<typeof getUnitsByTagSchema>;
