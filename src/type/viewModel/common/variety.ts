import { UniqueUnit } from './unit';

export type Variety = {
  name: string;
  image:
    | {
        alt: string;
        url: string;
      }
    | undefined;
  stock: number;
  varietyKind: string | undefined;
  units: {
    sizes: Map<string, UniqueUnit> | undefined; // varietyに紐づくsizeをもったunit
  };
};
