import { z } from 'zod';

export const getUnitsBySearchSchema = z.object({
  keyword: z.string(),
  page: z.number(),
  per: z.union([z.number(), z.undefined()]),
  sort: z.union([
    z.enum(['recommended', '-created_at', 'created_at', 'price', '-price']),
    z.undefined(),
  ]),
});

export type GetUnitsBySearchRequest = z.infer<typeof getUnitsBySearchSchema>;
