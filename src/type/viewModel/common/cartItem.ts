import { CartProduct } from './cartProduct';

export type CartItem = {
  id: number;
  unitId: number;
  unitName: string | undefined;
  stock?: number;
  price?: number;
  originalPrice?: number;
  quantity: number;
  image:
    | {
        alt: string;
        url: string;
      }
    | undefined;
  product: CartProduct;
  isOverstock?: boolean;
};
