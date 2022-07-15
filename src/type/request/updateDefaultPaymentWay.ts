import { z } from 'zod';

const updateDefaultSubscriptionPaymentWaySchema = z.object({
  stripe_card_id: z.string(),
  default_subscription: z.boolean(), // subscriptionのデフォルト支払手段
});

export const updateDefaultPaymentWaySchema = z
  .object({
    stripe_card_id: z.string(),
    default: z.boolean(), // 注文時のデフォルト支払手段
  })
  .or(updateDefaultSubscriptionPaymentWaySchema);

export type UpdateDefaultPaymentWay = z.infer<
  typeof updateDefaultPaymentWaySchema
>;
