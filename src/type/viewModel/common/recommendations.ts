export type Recommendation = {
  unitId: number; //unitId
  productId: number;
  unitName: string | undefined;
  productName: string;
  brandName: string;
  price: number;
  originalPrice: number;
  purchaseRoute: string;
  images: //この画像はunitの画像を使う
  | {
        alt: string;
        url: string;
      }[]
    | undefined;
};
