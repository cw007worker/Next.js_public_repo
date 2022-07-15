import { unitSchema } from './';
import { productSchema } from '../product';
import { z } from 'zod';

export const unitWithProductSchema = unitSchema.and(
  z.object({ product: productSchema })
);

export type UnitWithProduct = z.infer<typeof unitWithProductSchema>;
