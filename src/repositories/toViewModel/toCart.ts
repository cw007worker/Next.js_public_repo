import { GetCartResponse } from 'type/response/getCart';
import { Cart } from 'type/viewModel/cart';
import { CartItem } from 'type/viewModel/common/cartItem';

export const toCart = (res: GetCartResponse): Cart => {
  if (res.current_cart.cart_items.length === 0) {
    return null;
  }
  const cartItems: CartItem[] = res.current_cart.cart_items.map((c) => ({
    id: c.id,
    unitId: c.unit_id,
    unitName: c.unit_name ?? undefined,
    stock: c.unit_stock,
    quantity: c.unit_quantity,
    price: c.unit_price,
    originalPrice: c.unit_original_price,
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
    isOverstock: c.unit_stock < c.unit_quantity,
  }));

  return {
    cartId: res.current_cart.id,
    deliveryFee: res.current_cart.total_delivery_fee,
    cartItems,
  };
};
