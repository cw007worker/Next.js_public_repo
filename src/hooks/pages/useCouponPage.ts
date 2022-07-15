import { State } from 'hooks/useGetUserCoupons';
import React from 'react';
import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import {
  useGetUserCoupons,
  HookState as GetUserCouponsState,
} from 'hooks/useGetUserCoupons';
import { useAddUserCoupon } from 'hooks/useAddUserCoupon';
import { Coupon } from 'type/viewModel/common/coupon';
import { isLoadingState, isSuccessState } from 'type/util/fetchData';
import {
  useForm,
  UseFormHandleSubmit,
  FieldValues,
  DeepMap,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';

export type HookState = {
  layoutState: LayoutState;
  userCouponsState: State;
  activeCoupons: Coupon[];
  inactiveCoupons: Coupon[];
  currentTab: 'activeCoupons' | 'inactiveCoupons';
  showActiveCoupons: () => void;
  showInactiveCoupons: () => void;
  addRequest: (value: { code: string }) => void;
  isAddLoading: boolean;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
};

export const useCouponPage = (): HookState => {
  const { state: userCouponsState, userCoupons } = useGetUserCoupons();
  const { state: addUserCouponState, request: addRequest } = useAddUserCoupon();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const layoutState = useLayout();
  const [activeCoupons, setActiveCoupons] = React.useState<Coupon[]>([]);
  const [inactiveCoupons, setInactiveCoupons] = React.useState<Coupon[]>([]);
  const [isAddLoading, setIsAddLoading] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState<
    'activeCoupons' | 'inactiveCoupons'
  >('activeCoupons');
  const showActiveCoupons = () => {
    setCurrentTab('activeCoupons');
  };
  const showInactiveCoupons = () => {
    setCurrentTab('inactiveCoupons');
  };

  React.useEffect(() => {
    setActiveCoupons(userCoupons?.activeCoupons ?? []);
    setInactiveCoupons(userCoupons?.inactiveCoupons ?? []);
  }, [userCoupons]);

  React.useEffect(() => {
    if (isLoadingState(addUserCouponState)) {
      return setIsAddLoading(true);
    }
    if (isSuccessState(addUserCouponState)) {
      setActiveCoupons((prev) => [...prev, addUserCouponState.data]);
      return setIsAddLoading(false);
    }
    setIsAddLoading(false);
  }, [addUserCouponState]);

  return {
    layoutState,
    userCouponsState,
    activeCoupons,
    inactiveCoupons,
    currentTab,
    showActiveCoupons,
    showInactiveCoupons,
    addRequest,
    isAddLoading,
    register,
    handleSubmit,
    errors,
  };
};
