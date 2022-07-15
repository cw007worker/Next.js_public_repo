import {
  GetRankingTagsResponse,
  GetRankingTagsSchema,
} from 'type/response/getRankingTags';

export const validateGetRankingTags = (
  data: unknown
): GetRankingTagsResponse => {
  const parsed = GetRankingTagsSchema.parse(data);
  return parsed;
};
