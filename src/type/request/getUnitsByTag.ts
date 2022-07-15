import { z } from 'zod';

export const getUnitsByTagSchema = z.object({
  id: z.number(),
  page: z.number(),
  per: z.union([z.number(), z.undefined()]), // 何軒ごとに取得するのか指定（任意）
  sort: z.union([
    z.enum([
      'recommended',
      '-created_at',
      'created_at',
      'price',
      '-price',
      'priority',
    ]),
    z.undefined(),
  ]),
});

export type GetUnitsByTagRequest = z.infer<typeof getUnitsByTagSchema>;
