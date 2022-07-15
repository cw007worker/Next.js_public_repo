import { z } from 'zod';

export const generateSignInLinkRequestSchema = z.object({
  email: z.string(),
});

export type GenerateSignInLinkRequest = z.infer<
  typeof generateSignInLinkRequestSchema
>;
