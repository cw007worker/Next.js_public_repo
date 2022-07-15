// TODO: products単位ではなく Unit 単位で商品を取得しているので、productという名前を使うのをやめる
import { unitWithProductSchema } from './partial/unit/withProduct';
import { pagenationSchema } from './partial/pagenation';
import { z } from 'zod';

export const getUnitsSchema = z.object({
  units: z.array(unitWithProductSchema),
  pagenation: pagenationSchema,
});

export type GetUnitsResponse = z.infer<typeof getUnitsSchema>;
