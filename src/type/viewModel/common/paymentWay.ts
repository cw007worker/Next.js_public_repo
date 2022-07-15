export type PaymentWay = {
  stripeCardId: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefaultPaymentWay: boolean;
  isDefaultPaymentWayForSubscription: boolean;
};
