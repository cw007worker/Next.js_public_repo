export type Discount = {
  percentOff?: number;
  amountOff?: number;
  effect: 'APPLY_TO_ITEMS' | 'APPLY_TO_ORDER';
};
