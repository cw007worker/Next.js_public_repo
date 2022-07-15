import { pagenationSchema } from './partial/pagenation';
import { unitWithProductSchema } from './partial/unit/withProduct';
import { brandSchema } from './partial/brand';
import { z } from 'zod';

export const getBrandUnitsSchema = z.object({
  brand: brandSchema,
  units: z.array(unitWithProductSchema),
  pagenation: pagenationSchema,
});

export type GetBrandUnitsResponse = z.infer<typeof getBrandUnitsSchema>;
