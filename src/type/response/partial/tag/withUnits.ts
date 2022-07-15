import { z } from 'zod';
import { tagSchema } from '.';
import { unitWithProductSchema } from '../unit/withProduct';

export const tagWithUnitsSchema = tagSchema.and(
  z.object({ units: z.array(unitWithProductSchema) })
);

export type TagWithUnits = z.infer<typeof tagWithUnitsSchema>;
