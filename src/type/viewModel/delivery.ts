import { Order } from './common/order';
import { OrderItem } from './common/orderItem';

export type DeliveryStatus = 'unconfirmed' | 'unshipped' | 'shipped';

export type Delivery = {
  id: number;
  deliveryStatus: DeliveryStatus;
  shippingNumber?: number;
  shipmentDate?: string;
  isReturnable: boolean;
  cost: number;
  order: Order;
  orderItems: OrderItem[];
};
