import { z } from 'zod';
import { membershipWithAssociationSchema } from './partial/membership/withAssociation';

export const getMembershipInfoSchema = z.object({
  membership: membershipWithAssociationSchema,
});

export type GetMembershipInfoResponse = z.infer<typeof getMembershipInfoSchema>;
