import { UniqueUnit } from './unit';

export type Size = {
  name: string;
  images:
    | {
        alt: string;
        url: string;
      }[]
    | undefined;
  stock: number;
  units: {
    varieties: Map<string, UniqueUnit> | undefined;
  };
};
