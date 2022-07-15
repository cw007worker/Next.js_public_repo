import {
  postProductIdsForPersonalizeSchema,
  PostProductIdsForPersonalize,
} from 'type/request/postProductIdsForPersonalize';

export const validatePostPersonalTagIds = (
  data: unknown
): PostProductIdsForPersonalize => {
  const parsed = postProductIdsForPersonalizeSchema.parse(data);
  return parsed;
};
