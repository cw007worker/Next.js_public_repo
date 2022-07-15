import { z } from 'zod';

export const discountForPercentSchema = z.object({
  type: z.enum(['PERCENT']),
  percent_off: z.number(),
  effect: z.enum(['APPLY_TO_ORDER', 'APPLY_TO_ITEMS']),
});

export const discountForAmountSchema = z.object({
  type: z.enum(['AMOUNT']),
  amount_off: z.number(),
  effect: z.enum(['APPLY_TO_ORDER', 'APPLY_TO_ITEMS']),
});

export const discountSchema = z.union([
  discountForPercentSchema,
  discountForAmountSchema,
]);

export type Discount = z.infer<typeof discountSchema>;
