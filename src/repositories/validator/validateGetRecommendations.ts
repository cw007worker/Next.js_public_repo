import {
  GetRecommendationsResponse,
  getRecommendationsSchema,
} from 'type/response/getRecommendations';

export const validateGetRecommendations = (
  data: unknown
): GetRecommendationsResponse => {
  const parsed = getRecommendationsSchema.parse(data);
  return parsed;
};
