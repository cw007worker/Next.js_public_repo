import { Order } from "./common/order";
import { OrderItem } from "./common/orderItem";
import { PaymentWay } from "./common/paymentWay";

export type OrderCompletedInfo = {
  order: Order,
  orderItems: OrderItem[],
  totalDeliveryCost: number,
};
