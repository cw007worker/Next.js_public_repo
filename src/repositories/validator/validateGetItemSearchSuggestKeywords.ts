import {
  GetItemSearchSuggestKeywordsResponse,
  getItemSearchSuggestKeywordsSchema,
} from 'type/response/getItemSearchSuggestKeywords';

export const validateGetItemSearchSuggestKeywords = (
  data: unknown
): GetItemSearchSuggestKeywordsResponse => {
  const parsed = getItemSearchSuggestKeywordsSchema.parse(data);
  return parsed;
};
