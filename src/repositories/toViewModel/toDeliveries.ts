import { GetDeliveriesResponse } from 'type/response/getDeliveries';
import { Order } from 'type/viewModel/common/order';
import { OrderItem } from 'type/viewModel/common/orderItem';
import { Pagenation } from 'type/viewModel/common/pagenation';
import { Delivery } from 'type/viewModel/delivery';
import { dateFormatToAll, dateFormatToDate } from 'utils/dateFormat';
import { isReturnable } from 'utils/returnable';

export const toDeliveries = (
  res: GetDeliveriesResponse
): {
  deliveries: Delivery[];
  pagenation: Pagenation;
} => {
  const deliveries: Delivery[] = res.deliveries.map((delivery) => {
    const order: Order = {
      id: delivery.order.id,
      orderIdForCustomer: delivery.order.order_id_for_customer,
      paymentStatus: delivery.order.payment_status,
      paymentAmount: delivery.order.payment_amount,
      totalDiscountAmount: delivery.order.total_discount_amount,
      totalUnitPrice: delivery.order.total_unit_price,
      totalUnitOriginalPrice: delivery.order.total_unit_original_price,
      totalUsagedPoints: delivery.order.total_usaged_points,
      firstName: delivery.order.first_name,
      lastName: delivery.order.last_name,
      firstNameKana: delivery.order.first_name,
      lastNameKana: delivery.order.last_name_kana,
      zipcode: delivery.order.zipcode,
      prefecture: delivery.order.prefecture,
      address: delivery.order.address,
      buildingName: delivery.order.building_name ?? undefined,
      receptionDate: dateFormatToAll(new Date(delivery.order.reception_date)),
    };

    const orderItems: OrderItem[] = delivery.order_items.map((order_item) => ({
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

    return {
      id: delivery.id,
      deliveryStatus: delivery.delivery_status,
      shippingNumber: delivery.shipping_number
        ? Number(delivery.shipping_number)
        : undefined,
      shipmentDate: delivery.shipment_date
        ? dateFormatToDate(new Date(delivery.shipment_date))
        : undefined,
      isReturnable: delivery.shipment_date
        ? isReturnable(new Date(delivery.shipment_date))
        : false,
      cost: delivery.cost,
      order: order,
      orderItems: orderItems,
    };
  });

  const pagenation: Pagenation = {
    totalCount: res.pagenation.total_count,
    limitValue: res.pagenation.limit_value,
    totalPages: res.pagenation.total_pages,
    currentPage: res.pagenation.current_page,
    previousPage: res.pagenation.previous_page ?? undefined,
    nextPage: res.pagenation.next_page ?? undefined,
  };

  return { deliveries, pagenation };
};
