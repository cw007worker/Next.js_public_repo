interface UniqueUnitBase {
  id: number;
  name: string;
  images:
    | {
        alt: string;
        url: string;
      }[]
    | undefined;
  stock: number;
  price: number;
  originalPrice: number;
  discountRate?: number;
  wishlistId: number | null;
  purchaseRoute: string;
}

export type UniqueUnitWithAll = {
  tag: 'all';
  size: string;
  variety: string;
  varietyKind: string;
  varietyImage: string;
} & UniqueUnitBase;

export type UniqueUnitWithSizes = {
  tag: 'sizes';
  size: string;
} & UniqueUnitBase;

export type UniqueUnitWithVarieties = {
  tag: 'varieties';
  variety: string;
  varietyKind: string;
  varietyImage: string;
} & UniqueUnitBase;

export type UniqueUnit =
  | UniqueUnitWithAll
  | UniqueUnitWithSizes
  | UniqueUnitWithVarieties;

export type DefaultUnit = {
  tag: 'default';
  id: number;
  stock: number;
  price: number;
  originalPrice: number;
  discountRate?: number;
  images:
    | {
        alt: string;
        url: string;
      }[]
    | undefined;
  wishlistId: number | null;
  purchaseRoute: string;
};

export type Unit = UniqueUnit | DefaultUnit;
