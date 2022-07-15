import { z } from 'zod';

export const getMeSchema = z.object({
  id: z.number(),
  first_name: z.union([z.string(), z.null()]),
  last_name: z.union([z.string(), z.null()]),
  email: z.string(),
  has_password: z.boolean(),
  phone_number: z.union([z.string(), z.null()]),
  membership_grade: z.union([z.enum(['year', 'month']), z.null()]),
  is_membership: z.boolean(),
  cart_item_count: z.number(),
  canceled_membership: z.boolean(),
  will_cancel_membership: z.boolean(),
});

export type GetMeResponse = z.infer<typeof getMeSchema>;
