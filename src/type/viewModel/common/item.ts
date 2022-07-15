export type Item = {
  unitId: number; //unitId
  productId: number;
  unitName: string | undefined;
  productName: string;
  brandName: string;
  price: number;
  originalPrice: number;
  discountRate?: number;
  purchaseRoute: string;
  unitsStockCount: number;
  images: //この画像はunitの画像を使う
  | {
        alt: string;
        url: string;
      }[]
    | undefined;
  varietyCount: number | undefined;
};
