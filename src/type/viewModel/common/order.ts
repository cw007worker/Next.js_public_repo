export type Order = {
  id: number;
  orderIdForCustomer: number;
  paymentStatus: 'pending' | 'completion' | 'failed';
  paymentAmount: number;
  totalDiscountAmount: number;
  totalUnitPrice: number;
  totalUnitOriginalPrice: number;
  totalUsagedPoints: number;
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  zipcode: number;
  prefecture: string;
  address: string;
  buildingName?: string;
  receptionDate: string;
};
