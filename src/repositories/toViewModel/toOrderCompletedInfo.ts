import { GetOrderCompletedInfoResponse } from 'type/response/getOrderCompletedInfo';
import { Order } from 'type/viewModel/common/order';
import { OrderItem } from 'type/viewModel/common/orderItem';
import { PaymentWay } from 'type/viewModel/common/paymentWay';
import { OrderCompletedInfo } from 'type/viewModel/orderCompletedInfo';
import { dateFormatToAll, dateFormatToDate } from 'utils/dateFormat';

export const toOrderCompletedInfo = (res: GetOrderCompletedInfoResponse): OrderCompletedInfo => {
  const order: Order = {
    id: res.order.id,
    orderIdForCustomer: res.order.order_id_for_customer,
    paymentStatus: res.order.payment_status,
    paymentAmount: res.order.payment_amount,
    totalDiscountAmount: res.order.total_discount_amount,
    totalUnitPrice: res.order.total_unit_price,
    totalUnitOriginalPrice: res.order.total_unit_original_price,
    totalUsagedPoints: res.order.total_usaged_points,
    firstName: res.order.first_name,
    lastName: res.order.last_name,
    firstNameKana: res.order.first_name,
    lastNameKana: res.order.last_name_kana,
    zipcode: res.order.zipcode,
    prefecture: res.order.prefecture,
    address: res.order.address,
    buildingName: res.order.building_name ?? undefined,
    receptionDate: dateFormatToAll(new Date(res.order.reception_date)),
  };

  const orderItems: OrderItem[] = res.order.order_items.map((order_item) => ({
    id: order_item.id,
    productId: order_item.product_id,
    unitId: order_item.unit_id,
    name: order_item.name,
    unitPrice: order_item.unit_price,
    unitOriginalPrice: order_item.unit_original_price,
    quantity: order_item.quantity,
    image: {
      alt: `${order_item.name}の画像`,
      url:
        order_item.unit_image_url ||
        order_item.product_image_url ||
        undefined,
    },
  }));

  const totalDeliveryCost = res.order.total_delivery_cost;

  return { order, orderItems, totalDeliveryCost };
}