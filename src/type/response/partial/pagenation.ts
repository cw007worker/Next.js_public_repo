import { z } from 'zod';

export const pagenationSchema = z.object({
  total_count: z.number(),
  limit_value: z.number(),
  total_pages: z.number(),
  current_page: z.number(),
  previous_page: z.union([z.number(), z.null()]),
  next_page: z.union([z.number(), z.null()]),
});

export type Pagenation = z.infer<typeof pagenationSchema>;
