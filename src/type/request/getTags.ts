import { z } from 'zod';

export const getTagsSchema = z.object({});

export type GetTagsRequest = z.infer<typeof getTagsSchema>;
