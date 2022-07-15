import { PaymentWay } from 'type/viewModel/common/paymentWay';
import { PaymentWays } from 'type/viewModel/paymentWays';
import { dateFormat } from 'utils/dateFormat';
import { GetPaymentWaysResponse } from 'type/response/getPaymentWays';

export const toPaymentWays = (res: GetPaymentWaysResponse): PaymentWays => {
  const paymentWays: PaymentWay[] = res.payment_ways.map((p) => ({
    stripeCardId: p.payment_method_id,
    brand: p.brand,
    last4: p.last4,
    expMonth: p.exp_month,
    expYear: p.exp_year,
    isDefaultPaymentWay: p.is_default,
    isDefaultPaymentWayForSubscription: p.is_default_for_subscription,
  }));

  return {
    paymentWays,
  };
};
