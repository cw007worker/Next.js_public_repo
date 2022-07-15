import React from 'react';
import { getUserCouponsForCart } from 'repositories/getUserCouponsForCart';
import { GetUserCouponsForCartResponse } from 'type/response/getUserCouponsForCart';
import { useFetch } from './useFetch';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { useToast } from './useToast';
import { CouponForCart } from 'type/viewModel/common/couponForCart';
import { toUserCouponsForCart } from 'repositories/toViewModel/toUserCouponsForCart';
import { useAddUserCoupon } from './useAddUserCoupon';
import {
  useForm,
  UseFormHandleSubmit,
  FieldValues,
  DeepMap,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';

type INIT = undefined;
type LOADING = { type: 'loading' };
type LOADED = { type: 'loaded' };
type ERROR = { type: 'error'; message: string };
type State = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  state: State;
  useableCoupons: CouponForCart[];
  unuseableCoupons: CouponForCart[];
  currentTab: 'useableCoupons' | 'unuseableCoupons';
  showUseableCoupons: () => void;
  showUnuseableCoupons: () => void;
  addRequest: (value: { code: string }) => void;
  isAddLoading: boolean;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  selectCoupon: (coupon: CouponForCart) => void;
  applyCoupon: () => void;
  isSelectedCoupon: (couponId: string) => boolean;
  selectedCoupon: CouponForCart | undefined;
  appliedCoupon: CouponForCart | undefined;
};

export const useSelectCoupon = (): HookState => {
  const [state, setState] = React.useState<State>(undefined);
  const [useableCoupons, setUseableCoupons] = React.useState<CouponForCart[]>(
    []
  );
  const [unuseableCoupons, setUnuseableCoupons] = React.useState<
    CouponForCart[]
  >([]);
  const [currentTab, setCurrentTab] = React.useState<
    'useableCoupons' | 'unuseableCoupons'
  >('useableCoupons');
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [isAddLoading, setIsAddLoading] = React.useState(false);
  const [selectedCoupon, setSeledtedCoupon] = React.useState<
    CouponForCart | undefined
  >(undefined);
  const [appliedCoupon, setAppliedCoupon] = React.useState<
    CouponForCart | undefined
  >(undefined);

  const setToast = useToast();
  const { state: addUserCouponState, request: addRequest } = useAddUserCoupon();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showUseableCoupons = () => {
    setCurrentTab('useableCoupons');
  };
  const showUnuseableCoupons = () => {
    setCurrentTab('unuseableCoupons');
  };
  const isSelectedCoupon = (couponId: string) => {
    return couponId === selectedCoupon?.id;
  };
  // 選択されたクーポン
  const selectCoupon = (coupon: CouponForCart) => {
    if (isSelectedCoupon(coupon.id)) {
      setSeledtedCoupon(undefined);
    } else {
      setSeledtedCoupon(coupon);
    }
  };
  // クーポンを適用する
  const applyCoupon = () => {
    setAppliedCoupon(selectedCoupon);
  };

  const fetcher = React.useCallback(() => {
    return getUserCouponsForCart();
  }, []);

  const { data } = useFetch<GetUserCouponsForCartResponse>(
    fetcher,
    shouldFetch
  );

  React.useEffect(() => {
    if (isInitState(data)) {
      return setState(undefined);
    }
    if (isLoadingState(data)) {
      return setState({
        type: 'loading',
      });
    }
    if (isFailState(data)) {
      return setState({
        type: 'error',
        message: data.error,
      });
    }
    if (isSuccessState(data)) {
      const formattedData = toUserCouponsForCart(data.data);
      setUseableCoupons(formattedData.useableCoupons);
      setUnuseableCoupons(formattedData.unuseableCoupons);
      setShouldFetch(false);
      return setState({
        type: 'loaded',
      });
    }
    setState({
      type: 'error',
      message: '予期しないデータを取得しました',
    });
  }, [data]);

  React.useEffect(() => {
    if (state !== undefined && state.type === 'error') {
      setToast({ status: 'error', title: state.message });
    }
  }, [state, setToast]);

  React.useEffect(() => {
    if (isLoadingState(addUserCouponState)) {
      return setIsAddLoading(true);
    }
    if (isSuccessState(addUserCouponState)) {
      setToast({
        status: 'success',
        title: 'クーポンが追加されました',
      });
      setShouldFetch(true);
      return setIsAddLoading(false);
    }
    setIsAddLoading(false);
  }, [addUserCouponState, setToast]);

  return {
    state,
    useableCoupons,
    unuseableCoupons,
    currentTab,
    showUseableCoupons,
    showUnuseableCoupons,
    addRequest,
    isAddLoading,
    register,
    handleSubmit,
    errors,
    selectCoupon,
    applyCoupon,
    isSelectedCoupon,
    selectedCoupon,
    appliedCoupon,
  };
};
