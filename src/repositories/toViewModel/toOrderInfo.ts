import { GetOrderInfoResponse } from 'type/response/getOrderInfo';
import { CartItem } from 'type/viewModel/common/cartItem';
import { PaymentWay } from 'type/viewModel/common/paymentWay';
import { DeliveryInfo } from 'type/viewModel/common/deliveryInfo';
import { ShippingAddress } from 'type/viewModel/common/shippingAddress';
import { OrderInfo } from 'type/viewModel/orderInfo';

export const toOrderInfo = (res: GetOrderInfoResponse): OrderInfo => {
  const cartItems: CartItem[] = res.cart_items.map((c) => ({
    id: c.id,
    unitId: c.unit_id,
    unitName: c.unit_name || undefined,
    quantity: c.unit_quantity,
    price: c.unit_price,
    image: c.unit_image_url
      ? {
          alt: `${c.product?.name}の画像`,
          url: c.unit_image_url,
        }
      : c.product.image_url
      ? {
          alt: `${c.product?.name}の画像`,
          url: c.product.image_url,
        }
      : undefined,
    product: {
      id: c.product.id,
      name: c.product.name,
      description: c.product.description ? c.product.description : undefined,
    },
  }));

  const paymentWays: PaymentWay[] = res.payment_ways.map((p) => ({
    stripeCardId: p.payment_method_id,
    brand: p.brand,
    last4: p.last4,
    expMonth: p.exp_month,
    expYear: p.exp_year,
    isDefaultPaymentWay: p.is_default,
    isDefaultPaymentWayForSubscription: p.is_default_for_subscription,
  }));

  const shippingAddress: ShippingAddress | undefined = res.shipping_address
    ? {
        id: res.shipping_address.id,
        firstName: res.shipping_address.first_name,
        firstNameKana: res.shipping_address.first_name_kana,
        lastName: res.shipping_address.last_name,
        lastNameKana: res.shipping_address.last_name_kana,
        zipcode: res.shipping_address.zipcode,
        prefecture: res.shipping_address.prefecture,
        address: res.shipping_address.address,
        buildingName: res.shipping_address.building_name,
      }
    : undefined;

  /**
   * NOTE: 今は配送情報が単純なので、一旦フロントで無理やりやる
   */
  const today = new Date();
  const oneWeekLater = today.setDate(today.getDate() + 7);
  const twoWeekLater = today.setDate(today.getDate() + 14);
  const deliveryInfo: DeliveryInfo = {
    shortestDate: new Date(oneWeekLater),
    lateDate: new Date(twoWeekLater),
  };

  return {
    subtotalPrice: res.subtotal_price,
    deliveryFee: res.total_delivery_fee,
    usagePoints: res.usage_points,
    deliveryInfo: deliveryInfo,
    totalPrice: res.total_price,
    cartItems,
    paymentWays,
    shippingAddress,
  };
};
