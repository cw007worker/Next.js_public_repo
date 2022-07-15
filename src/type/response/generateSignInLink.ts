import { z } from 'zod';

export const generateSignInLinkResponseSchema = z.object({
  email: z.string(),
  emailLink: z.string(),
});

export type GenerateSignInLinkResponse = z.infer<
  typeof generateSignInLinkResponseSchema
>;
