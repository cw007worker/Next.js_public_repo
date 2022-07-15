import {
  DefaultUnit,
  UniqueUnitWithAll,
  UniqueUnitWithSizes,
  UniqueUnitWithVarieties,
} from './common/unit';
import { Size } from './common/size';
import { Variety } from './common/variety';
import { TagInfo } from './common/tagInfo';
import { BrandTag } from './common/brandTag';
import { CategoryTag } from './common/categoryTag';

export type ProductDetailWithDefaultUnit = {
  tag: 'default';
  id: number;
  name: string;
  description: string | undefined;
  images:
    | {
        alt: string;
        url: string;
      }[]
    | undefined;
  units: Map<string, DefaultUnit>;
  brands: BrandTag[];
  categories: CategoryTag[];
};

interface ProductDetailWithUniqueUnitBase {
  id: number;
  name: string;
  description: string | undefined;
  images:
    | {
        alt: string;
        url: string;
      }[]
    | undefined;
  brands: BrandTag[];
  categories: CategoryTag[];
}

interface WithSizes extends ProductDetailWithUniqueUnitBase {
  tag: 'sizes';
  hasVariety: false;
  hasSize: true;
  units: Map<string, UniqueUnitWithSizes>;
  sizes: Map<string, Size>;
}
interface WithVarieties extends ProductDetailWithUniqueUnitBase {
  tag: 'varieties';
  hasVariety: true;
  hasSize: false;
  units: Map<string, UniqueUnitWithVarieties>;
  varieties: Map<string, Variety>;
}
interface WithAll extends ProductDetailWithUniqueUnitBase {
  tag: 'all';
  hasVariety: true;
  hasSize: true;
  units: Map<string, UniqueUnitWithAll>;
  sizes: Map<string, Size>;
  varieties: Map<string, Variety>;
}

export type ProductDetailWithUniqueUnit = WithSizes | WithVarieties | WithAll;
