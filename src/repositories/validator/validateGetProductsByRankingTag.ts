import {
  GetProductsByRankingTagResponse,
  getProductsByRankingTagSchema,
} from 'type/response/getProductsByRankingTag';

export const validateGetProductsByRankingTag = (
  data: unknown
): GetProductsByRankingTagResponse => {
  const parsed = getProductsByRankingTagSchema.parse(data);
  return parsed;
};
