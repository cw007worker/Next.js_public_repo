import {
  useSelectCoupon,
  HookState as SelectCouponHookState,
} from './../useSelectCoupon';
import { useFetch } from 'hooks/useFetch';
import { useToast } from 'hooks/useToast';
import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { getOrderInfo } from 'repositories/getOrderInfo';
import { toOrderInfo } from 'repositories/toViewModel/toOrderInfo';
import { GetOrderInfoResponse } from 'type/response/getOrderInfo';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { OrderInfo } from 'type/viewModel/orderInfo';
import { PaymentWay } from 'type/viewModel/common/paymentWay';
import { State, useOrder } from 'hooks/useOrder';
import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import { useUpdateDefaultPaymentWay } from 'hooks/useUpdateDefaultPaymentWay';
import { useAddNewCard } from 'hooks/useAddNewCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { sentryLog } from 'libs/setnry';

type INIT = undefined;
type LOADING = { type: 'loading' };
type LOADED = { type: 'loaded' };
type ERROR = { type: 'error'; message: string };
type PageState = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  pageState: PageState;
  orderInfo: OrderInfo | undefined;
  paymentWays: PaymentWay[] | undefined;
  handleSubmit: (
    event: React.FormEvent,
    paymentWayId: string,
    shippingAddressId: number,
    couponCode: string | undefined
  ) => Promise<void>;
  orderState: State;
  isShippingAddressOpen: boolean;
  isPaymentWayEditer: boolean;
  isAddNewCard: boolean;
  isCouponOpen: boolean;
  handleUpdateDefaultPaymentWay: () => void;
  handleAddNewCard: () => Promise<void>;
  isAddNewCardLoading: boolean;
  isUpdateDefaultPaymentWayLoading: boolean;
  togglePaymentWayEditer: () => void;
  toggleShippingAddresOpen: () => void;
  toggleAddNewCard: () => void;
  toggleCouponOpen: () => void;
  defautPaymentWay: PaymentWay | undefined;
  cardId: string;
  defaultCardId: string;
  handleChangeCardId: (nextValue: string) => void;
  reload: () => void;
  layoutState: LayoutState;
  selectCouponHookState: SelectCouponHookState;
  handleApplyCoupon: () => void;
};
export const useOrderConfirmPage = (): HookState => {
  const [pageState, setPageState] = React.useState<PageState>(undefined);
  const [orderInfo, setOrderInfo] = React.useState<OrderInfo | undefined>(
    undefined
  );
  const [paymentWays, setPaymentWays] = React.useState<
    PaymentWay[] | undefined
  >(undefined);
  const [isShippingAddressOpen, setIsShippingAddressOpen] =
    React.useState(false);
  const [isPaymentWayEditer, setIsPaymentWayEditer] = React.useState(false);
  const [isAddNewCard, setIsAddNewCard] = React.useState(false);
  const [isCouponOpen, setIsCouponOpen] = React.useState(false);
  const setToast = useToast();
  const layoutState = useLayout();
  const { handleSubmit, state: orderState } = useOrder();
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const {
    state: updateDefaultPaymentWayState,
    request: updateDefaultPaymentWay,
  } = useUpdateDefaultPaymentWay();
  const { state: addNewCardState, request: addNewCard } = useAddNewCard();
  const [cardId, setCardId] = React.useState<string>('');
  const selectCouponHookState = useSelectCoupon();

  const fetcher = React.useCallback(() => {
    return getOrderInfo();
  }, []);

  const { data } = useFetch<GetOrderInfoResponse>(fetcher, shouldFetch);

  React.useEffect(() => {
    if (isInitState(data)) {
      return setPageState(undefined);
    }
    if (isLoadingState(data)) {
      return setPageState({
        type: 'loading',
      });
    }
    if (isFailState(data)) {
      return setPageState({
        type: 'error',
        message: data.error,
      });
    }
    if (isSuccessState(data)) {
      const orderInfo = toOrderInfo(data.data);
      const paymentWays = orderInfo.paymentWays;
      setOrderInfo(orderInfo);
      setPaymentWays(paymentWays);
      setShouldFetch(false);
      return setPageState({
        type: 'loaded',
      });
    }
    setPageState({
      type: 'error',
      message: '予期しないデータを取得しました',
    });
  }, [data]);

  React.useEffect(() => {
    if (pageState !== undefined && pageState.type === 'error') {
      setToast({ status: 'error', title: pageState.message });
    }
  }, [pageState, setToast]);

  const getCreateToken = useCallback(async () => {
    if (!stripe || !elements) {
      throw new Error('stripeまたはelementがセットされていません。');
    }
    const cardElement = elements.getElement(CardElement);
    if (cardElement === null) {
      throw new Error('elementが取得できませんでした。');
    }
    const { error, token } = await stripe.createToken(cardElement);
    if (error !== undefined) {
      throw new Error(error.message);
    } else if (token === undefined) {
      throw new Error('tokenが取得できませんでした。');
    } else {
      return token.id;
    }
  }, [elements, stripe]);

  const defautPaymentWay = useMemo(() => {
    return paymentWays !== undefined && paymentWays.length >= 0
      ? paymentWays.find((p) => p.isDefaultPaymentWay)
      : undefined;
  }, [paymentWays]);

  const handleUpdateDefaultPaymentWay = useCallback(async () => {
    try {
      await updateDefaultPaymentWay(cardId, 'Order');
      // reloadする
      setShouldFetch(true);
      setIsPaymentWayEditer(false);
    } catch (e) {
      console.error(e);
      sentryLog(e);
      setToast({ status: 'error', title: '予期せぬエラーが発生しました。' });
    }
  }, [cardId, setToast, updateDefaultPaymentWay]);

  const handleAddNewCard = useCallback(async () => {
    try {
      const token = await getCreateToken();
      await addNewCard(token);
      // reloadする
      setShouldFetch(true);
      setIsAddNewCard(false);
    } catch (e) {
      console.error(e);
      sentryLog(e);
      setToast({ status: 'error', title: '予期せぬエラーが発生しました。' });
    }
  }, [addNewCard, getCreateToken, setToast]);

  const isAddNewCardLoading = useMemo(() => {
    return isLoadingState(addNewCardState);
  }, [addNewCardState]);

  const isUpdateDefaultPaymentWayLoading = useMemo(() => {
    return isLoadingState(updateDefaultPaymentWayState);
  }, [updateDefaultPaymentWayState]);

  const handleChangeCardId = (nextValue: string) => {
    setCardId(nextValue);
  };

  const handleApplyCoupon = () => {
    selectCouponHookState.applyCoupon();
    if (selectCouponHookState.selectedCoupon) {
      setToast({
        status: 'success',
        title: 'クーポンを適用しました',
      });
    }
    setIsCouponOpen(false);
  };

  return {
    pageState,
    orderInfo,
    paymentWays,
    defautPaymentWay,
    handleSubmit,
    orderState,
    isShippingAddressOpen,
    isPaymentWayEditer,
    isAddNewCard,
    isCouponOpen,
    handleUpdateDefaultPaymentWay,
    handleAddNewCard,
    isAddNewCardLoading,
    isUpdateDefaultPaymentWayLoading,
    cardId,
    defaultCardId: defautPaymentWay?.stripeCardId ?? '',
    handleChangeCardId,
    toggleShippingAddresOpen: () => setIsShippingAddressOpen((prev) => !prev),
    togglePaymentWayEditer: () => setIsPaymentWayEditer((prev) => !prev),
    toggleAddNewCard: () => setIsAddNewCard((prev) => !prev),
    toggleCouponOpen: () => setIsCouponOpen((prev) => !prev),
    reload: () => setShouldFetch(true),
    layoutState,
    selectCouponHookState,
    handleApplyCoupon,
  };
};
