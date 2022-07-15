export type StripeSubscription = {
  contractStartDate: string;
  currentPeriodEndDate: string;
  willCancelAtPeriodEnd: boolean;
  status: string;
};
