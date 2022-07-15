// TODO: products単位ではなく Unit 単位で商品を取得しているので、productという名前を使うのをやめる
import { productWithUnitSchema } from './partial/product/withUnit';
import { pagenationSchema } from './partial/pagenation';
import { z } from 'zod';

export const getProductsSchema = z.object({
  products: z.array(productWithUnitSchema),
  pagenation: pagenationSchema,
});

export type GetProductsResponse = z.infer<typeof getProductsSchema>;
