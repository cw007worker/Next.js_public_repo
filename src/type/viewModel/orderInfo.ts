import { CartItem } from './common/cartItem';
import { PaymentWay } from './common/paymentWay';
import { ShippingAddress } from './common/shippingAddress';
import { DeliveryInfo } from './common/deliveryInfo';

export type OrderInfo = {
  totalPrice: number; // 合計金額
  subtotalPrice: number; // 商品の小計（通常価格を合計したもの）
  deliveryFee: number;
  usagePoints: number; // 通常価格から会員価格を引いた額（商品割引額をPantrii負担に見せるため、ポイントという見せ方をしてる）
  deliveryInfo: DeliveryInfo;
  cartItems: CartItem[];
  paymentWays: PaymentWay[];
  shippingAddress: ShippingAddress | undefined;
};
