import { discountSchema } from '../discount';
import { z } from 'zod';

export const couponSchema = z.object({
  id: z.string(),
  code: z.string(),
  active: z.boolean(),
  campaign_name: z.string(),
  discount_type: z.enum(['PERCENT', 'AMOUNT']),
  discount: discountSchema,
  start_date: z.string(),
  expiration_date: z.string().nullable(),
});
