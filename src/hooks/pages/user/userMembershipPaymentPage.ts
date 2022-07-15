import { useCallback, useEffect, useState, useMemo } from 'react';
import { useToast } from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { getPaymentWays } from 'repositories/getPaymentWays';
import { GetPaymentWaysResponse } from 'type/response/getPaymentWays';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { sentryLog } from 'libs/setnry';
import { toPaymentWays } from 'repositories/toViewModel/toPaymentWays';
import { PaymentWays } from 'type/viewModel/paymentWays';

import { useUpdateDefaultPaymentWay } from 'hooks/useUpdateDefaultPaymentWay';
import { useAddNewCard } from 'hooks/useAddNewCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

type INIT = undefined;

type LOADING = { type: 'loading' };

export type LOADED = {
  type: 'loaded';
  data: PaymentWays;
};

type ERROR = { type: 'error'; message: string };

type PageState = INIT | LOADED | ERROR | LOADING;
import { useLayout } from 'hooks/useLayout';

export const useMembershipPaymentPage = () => {
  const [pageState, setPageState] = useState<PageState>(undefined);
  const layoutState = useLayout();
  const setToast = useToast();

  const {
    state: updateDefaultPaymentWayState,
    request: updateDefaultPaymentWay,
  } = useUpdateDefaultPaymentWay();
  const { state: addNewCardState, request: addNewCard } = useAddNewCard();
  const [cardId, setCardId] = useState<string>('');
  const [isAddNewCard, setIsAddNewCard] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [shouldFetch, setShouldFetch] = useState(true);

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

  const fetcher = useCallback(() => {
    return getPaymentWays();
  }, []);
  const { data } = useFetch<GetPaymentWaysResponse>(fetcher);

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

  const handleUpdateDefaultPaymentWay = useCallback(async () => {
    try {
      await updateDefaultPaymentWay(cardId, 'Subscription');
      setToast({ status: 'success', title: '更新に成功しました。' });
      setShouldFetch(true); // ← 不要かも
    } catch (e) {
      console.error(e);
      sentryLog(e);
      setToast({ status: 'error', title: '予期せぬエラーが発生しました。' });
    }
  }, [cardId, setToast, updateDefaultPaymentWay]);

  const handleChangeCardId = (nextValue: string) => {
    setCardId(nextValue);
  };

  const defautPaymentWay = useMemo(() => {
    return pageState?.type == 'loaded' && pageState.data.paymentWays.length >= 0
      ? pageState.data.paymentWays.find(
          (p) => p.isDefaultPaymentWayForSubscription
        )
      : undefined;
  }, [pageState]);

  const isAddNewCardLoading = useMemo(() => {
    return isLoadingState(addNewCardState);
  }, [addNewCardState]);

  const isUpdateDefaultPaymentWayLoading = useMemo(() => {
    return isLoadingState(updateDefaultPaymentWayState);
  }, [updateDefaultPaymentWayState]);

  useEffect(() => {
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
      return setPageState({
        type: 'loaded',
        data: toPaymentWays(data.data),
      });
    }
    setPageState({
      type: 'error',
      message: '予期しないデータを取得しました',
    });
  }, [data]);

  return {
    pageState,
    layoutState,
    isAddNewCard,
    reload: () => setShouldFetch(true),
    toggleAddNewCard: () => setIsAddNewCard((prev) => !prev),
    handleUpdateDefaultPaymentWay,
    handleAddNewCard,
    handleChangeCardId,
    cardId,
    defaultCardId: defautPaymentWay?.stripeCardId ?? '',
    isAddNewCardLoading,
    isUpdateDefaultPaymentWayLoading,
  };
};
