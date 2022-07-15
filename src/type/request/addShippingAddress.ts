import { z } from 'zod';

export const addShippingAddressSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  first_name_kana: z.string(),
  last_name_kana: z.string(),
  zipcode: z.string(),
  prefecture: z.string(),
  address: z.string(),
  building_name: z.string().optional(),
});

export type AddShippingAddress = z.infer<typeof addShippingAddressSchema>;
