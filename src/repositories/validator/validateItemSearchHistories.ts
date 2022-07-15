import {
  GetItemSearchHistoriesResponse,
  getItemSearchHistoriesSchema,
} from 'type/response/getItemSearchHistories';

export const validateGetItemSearchItemHistories = (
  data: unknown
): GetItemSearchHistoriesResponse => {
  const parsed = getItemSearchHistoriesSchema.parse(data);
  return parsed;
};
