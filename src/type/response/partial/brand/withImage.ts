import { z } from 'zod';

export const brandWithImageSchema = z.object({
  id: z.number(),
  name: z.string(),
  thumbnail_image_url: z.union([z.string(), z.null()]),
  is_highlighted: z.boolean(),
});

export type BrandWithImage = z.infer<typeof brandWithImageSchema>;
