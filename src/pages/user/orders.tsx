import router from 'next/router';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';
import { OrdersTemplate } from 'components/templates/Orders';
import { useDeliveriesPage } from '../../hooks/pages/useDeliveriesPage';

const Orders = () => {
  const { layoutState, deliveriesState } = useDeliveriesPage();

  return (
    <LayoutWithBack
      handleBack={() => router.back()}
      cartItemCount={layoutState.cartItemCount}
    >
      <OrdersTemplate {...deliveriesState} />
    </LayoutWithBack>
  );
};

export default Orders;
