import { Campaign } from './campaign';

export type TagInfo = {
  id?: number;
  name: string;
  description: string | undefined;
  campaign: Campaign | undefined;
  image:
    | {
        src: string;
        alt: string;
      }
    | undefined;
};
