import { z } from 'zod';

export const categoryWithChildsSchema = z.object({
  id: z.number(),
  name: z.string(),
  child_tags: z.union([
    z.null(),
    z.array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    ),
  ]),
});

export type CategoryWithChilds = z.infer<typeof categoryWithChildsSchema>;
