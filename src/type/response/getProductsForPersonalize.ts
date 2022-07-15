import { z } from 'zod';
import { productsForPersonalize } from './partial/product/forPersonalize';

export const getProductsForPersonalizeSchema = z.object({
  products: z.array(productsForPersonalize),
});
//productsを１５件返す
export type GetProductsForPersonalizeResponse = z.infer<
  typeof getProductsForPersonalizeSchema
>;
