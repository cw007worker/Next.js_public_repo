import { z } from 'zod';
import { membershipWithAssociationSchema } from './partial/membership/withAssociation';

export const cancelMembershipSchema = z.object({
  membership: membershipWithAssociationSchema,
});

export type CancelMembershipResponse = z.infer<typeof cancelMembershipSchema>;
