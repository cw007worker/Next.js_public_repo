import { z } from 'zod';

export const orderSchema = z.object({
  id: z.number(),
  order_id_for_customer: z.number(),
  payment_status: z.enum(['pending', 'completion', 'failed']),
  payment_amount: z.number(),
  total_discount_amount: z.number(),
  total_unit_price: z.number(),
  total_unit_original_price: z.number(),
  total_usaged_points: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  first_name_kana: z.string(),
  last_name_kana: z.string(),
  zipcode: z.number(),
  prefecture: z.string(),
  address: z.string(),
  building_name: z.string().nullable(),
  reception_date: z.string(),
});

export type Order = z.infer<typeof orderSchema>;
