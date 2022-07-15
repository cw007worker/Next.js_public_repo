import { MembershipGrade } from 'type/viewModel/me';

export type MembershipBenefitType = 'enable' | 'disable' | 'comingsoon';

export type MembershipBenefit = {
  title: string;
  imagePath: string;
  type: MembershipBenefitType;
};

export const membershipBenefits = (
  membershipGrade: MembershipGrade
): MembershipBenefit[] => {
  switch (membershipGrade) {
    case 'month':
      return MONTH_PRICE_MEMBERSHIP_BENEFITS;
    case 'year':
      return YEAR_PRICE_MEMBERSHIP_BENEFITS;
    default:
      return MONTH_PRICE_MEMBERSHIP_BENEFITS;
  }
};

export const BENEFIT_TYPE: { [key: string]: MembershipBenefitType } = {
  enable: 'enable',
  disable: 'disable',
  comingsoon: 'comingsoon',
};

const YEAR_PRICE_MEMBERSHIP_BENEFITS: MembershipBenefit[] = [
  {
    title: '使ったものでも\n返品返金OK',
    imagePath: '/Icon/Benefit/RefundIcon.svg',
    type: BENEFIT_TYPE.enable,
  },
  {
    title: 'ギフト包装\n無料',
    imagePath: '/Icon/Benefit/GiftIcon.svg',
    type: BENEFIT_TYPE.enable,
  },
  {
    title: '優先カスタマー\nサポート',
    imagePath: '/Icon/Benefit/CsIcon.svg',
    type: BENEFIT_TYPE.enable,
  },
  {
    title: '年間会員\n限定クーポン',
    imagePath: '/Icon/Benefit/CouponIcon.svg',
    type: BENEFIT_TYPE.enable,
  },
  {
    title: 'いつでも\n送料無料',
    imagePath: '/Icon/Benefit/DeliveryFreeIcon.svg',
    type: BENEFIT_TYPE.enable,
  },
  {
    title: '限定商品\n優先アクセス',
    imagePath: '/Icon/Benefit/UnlimitProductIcon.svg',
    type: BENEFIT_TYPE.enable,
  },
  {
    title: '追加予定！\ncomingsoon',
    imagePath: '/Icon/Benefit/ComingsoonIcon.svg',
    type: BENEFIT_TYPE.comingsoon,
  },
  {
    title: '追加予定！\ncomingsoon',
    imagePath: '/Icon/Benefit/ComingsoonIcon.svg',
    type: BENEFIT_TYPE.comingsoon,
  },
  {
    title: '追加予定！\ncomingsoon',
    imagePath: '/Icon/Benefit/ComingsoonIcon.svg',
    type: BENEFIT_TYPE.comingsoon,
  },
  // {
  //   title: '家電等永久保証',
  //   imagePath: '/Icon/Benefit/ElectronicGuarantee.svg',
  //   isLock: false,
  // },
];

const MONTH_PRICE_MEMBERSHIP_BENEFITS: MembershipBenefit[] = [
  {
    title: '使ったものでも\n返品返金OK',
    imagePath: '/Icon/Benefit/RefundIcon.svg',
    type: BENEFIT_TYPE.enable,
  },
  {
    title: 'ギフト包装\n無料',
    imagePath: '/Icon/Benefit/GiftIcon.svg',
    type: BENEFIT_TYPE.enable,
  },
  {
    title: '優先カスタマー\nサポート',
    imagePath: '/Icon/Benefit/CsIcon.svg',
    type: BENEFIT_TYPE.enable,
  },
  {
    title: '年間会員\n限定クーポン',
    imagePath: '/Icon/Benefit/ComingsoonIcon.svg',
    type: BENEFIT_TYPE.disable,
  },
  {
    title: 'いつでも\n送料無料',
    imagePath: '/Icon/Benefit/ComingsoonIcon.svg',
    type: BENEFIT_TYPE.disable,
  },
  {
    title: '限定商品\n優先アクセス',
    imagePath: '/Icon/Benefit/ComingsoonIcon.svg',
    type: BENEFIT_TYPE.disable,
  },
  {
    title: '追加予定！\ncomingsoon',
    imagePath: '/Icon/Benefit/ComingsoonIcon.svg',
    type: BENEFIT_TYPE.comingsoon,
  },
  {
    title: '追加予定！\ncomingsoon',
    imagePath: '/Icon/Benefit/ComingsoonIcon.svg',
    type: BENEFIT_TYPE.comingsoon,
  },
  {
    title: '追加予定！\ncomingsoon',
    imagePath: '/Icon/Benefit/ComingsoonIcon.svg',
    type: BENEFIT_TYPE.comingsoon,
  },
  // {
  //   title: '家電等永久保証',
  //   imagePath: '/Icon/Benefit/ElectronicGuarantee.svg',
  //   isLock: true,
  // },
];
