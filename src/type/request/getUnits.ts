import { z } from 'zod';

export const getUnitsSchema = z.object({
  page: z.number(), //何ページ目を取得するのか指定
  per: z.union([z.number(), z.undefined()]), // 何軒ごとに取得するのか指定（任意）
  sort: z.union([
    z.enum(['recommended', '-created_at', 'created_at', 'price', '-price']),
    z.undefined(),
  ]),
});

export type GetUnitsRequest = z.infer<typeof getUnitsSchema>;
