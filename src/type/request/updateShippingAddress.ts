import { z } from 'zod';

export const updateShippingAddressSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  first_name_kana: z.string(),
  last_name_kana: z.string(),
  zipcode: z.string(),
  prefecture: z.string(),
  address: z.string(),
  building_name: z.string().optional(),
});

export type UpdateShippingAddress = z.infer<typeof updateShippingAddressSchema>;
