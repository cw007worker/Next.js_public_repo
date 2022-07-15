import { z } from 'zod';

export const addNewCardSchema = z.object({
  card_token: z.string(),
});

export type AddNewCard = z.infer<typeof addNewCardSchema>;
