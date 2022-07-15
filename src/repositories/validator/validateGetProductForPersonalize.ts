import {
  GetProductsForPersonalizeResponse,
  getProductsForPersonalizeSchema,
} from 'type/response/getProductsForPersonalize';

export const validateGetProductForPersonalize = (
  data: unknown
): GetProductsForPersonalizeResponse => {
  const parsed = getProductsForPersonalizeSchema.parse(data);
  return parsed;
};
