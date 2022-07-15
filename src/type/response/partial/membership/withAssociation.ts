import { z } from 'zod';
import { membershipSchema } from './index';
import { stripeSubscriptionSchema } from '../stripeSubscription';
import { userSchema } from '../user';
import { subscriptionSchema } from '../subscribedMembershipPlan';

export const membershipWithAssociationSchema = membershipSchema.and(
  z.object({
    stripe_subscription: stripeSubscriptionSchema,
    user: userSchema,
    subscription: subscriptionSchema,
  })
);

export type MembershipWithAssociation = z.infer<
  typeof membershipWithAssociationSchema
>;
