import { getTagsSchema, GetTagsResponse } from 'type/response/getTags';

export const validateGetTags = (data: unknown): GetTagsResponse => {
  const parsed = getTagsSchema.parse(data);
  return parsed;
};
