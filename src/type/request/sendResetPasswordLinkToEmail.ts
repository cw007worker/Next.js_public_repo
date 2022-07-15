import { z } from 'zod';

export const sendResetPasswordLinkToEmailSchema = z.object({
  email: z.string(),
});

export type SendResetPasswordLinkToEmail = z.infer<
  typeof sendResetPasswordLinkToEmailSchema
>;
