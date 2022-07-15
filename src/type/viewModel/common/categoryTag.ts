import { Campaign } from './campaign';

export type CategoryTag = {
  id?: number;
  name: string;
  description: string | undefined;
  campaign: Campaign | undefined;
};
