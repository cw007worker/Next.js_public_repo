export type MembershipGrade = 'month' | 'year' | undefined;

export type Me = {
  id: number;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string;
  hasPassword: boolean;
  phoneNumber: string | undefined;
  membershipGrade: MembershipGrade;
  isMembership: boolean;
  cartItemCount: number;
  willCancelMembership: boolean;
  canceledMembership: boolean;
};
