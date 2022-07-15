import { z } from 'zod';

export const getItemSearchHistoriesSchema = z.object({
  sort: z.union([
    z.enum(['-created_at', 'created_at', '-hits']),
    z.undefined(),
  ]),
  limit: z.union([z.number(), z.undefined()]),
});

export type GetItemSearchHistoriesReqest = z.infer<
  typeof getItemSearchHistoriesSchema
>;
