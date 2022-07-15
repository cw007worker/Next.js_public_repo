import { CartItem } from './common/cartItem';

export type Cart = {
  cartId: number;
  deliveryFee: number;
  cartItems: CartItem[];
} | null;
