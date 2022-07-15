import { useState, useEffect, useCallback, useMemo } from 'react';
import { useFetch } from 'hooks/useFetch';
import { useSubscribeMembership } from 'hooks/useSubscribeMembership';
import { useToast } from 'hooks/useToast';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { useRouter } from 'next/router';
import { sentryLog } from 'libs/setnry';
import { useOnboardingRoutingHandler } from './useOnboardingRoutingHandler';
import { StripeError } from '@stripe/stripe-js';
import { stripeErrorHandler } from 'type/util/errorHandler/stripe';
import {
  useQuery,
  HookState as QueryState,
  defaultDisplayColor,
} from 'hooks/useQuery';
import { useAppState } from 'hooks/useAppState';
import { GetMembershipPlanForSubscribeResponse } from 'type/response/getMembershipPlanForSubscribe';
import { getMembershipPlanForSubscribeSchema } from 'type/request/getMembershipPlanForSubscribe';
import { toMembershipPlanForSubscribe } from 'repositories/toViewModel/toMembershipPlanForSubscribe';
import { getMembershipPlanForSubscribe } from 'repositories/getMembershipPlanForSubscribe';
import { MembershipPlanForSubscribe } from 'type/viewModel/membershipPlanForSubscribe';

/**
 * page stateのtype
 */
type INIT = undefined;

type LOADING = { type: 'loading' };

export type LOADED = {
  type: 'loaded';
  data: MembershipPlanForSubscribe;
};

type ERROR = { type: 'error'; message: string };

type PageState = INIT | LOADED | ERROR | LOADING;

/**
 * Hooksのtype
 */
export type PaymentFormValue = {
  lastName: string;
  firstName: string;
  confirmCheckbox: string;
};

export type HookState = {
  pageState: PageState;
  onSubmit: (values: PaymentFormValue) => Promise<void>;
  isSubmitting: boolean;
};

//暫定的にファンクションを作った
export const usePaymentPage = (): HookState => {
  const queryState = useQuery();
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>(undefined);
  const setToast = useToast();
  const { state, request } = useSubscribeMembership();
  const stripe = useStripe();
  const elements = useElements();
  const { isApp } = useAppState();

  const membershipPlanId = useMemo(() => {
    return router.query.membershipPlanId;
  }, [router.query.membershipPlanId]);

  const getCreateToken = useCallback(async () => {
    if (!stripe || !elements) {
      throw new Error('stripeまたはelementがセットされていません。');
    }
    const cardElement = elements.getElement(CardElement);
    if (cardElement === null) {
      throw new Error('elementが取得できませんでした。');
    }
    const { error, token } = await stripe.createToken(cardElement);
    if (error && typeof (error as StripeError).code !== undefined) {
      const stripeError = error as StripeError;
      throw stripeError;
    } else if (error !== undefined) {
      throw new Error(error.message);
    } else if (token === undefined) {
      throw new Error('tokenが取得できませんでした。');
    } else {
      return token.id;
    }
  }, [elements, stripe]);

  //暫定的にファンクションを作った
  const onSubmit = useCallback(
    async (values: PaymentFormValue) => {
      const { firstName, lastName } = values;
      try {
        const token = await getCreateToken();
        request(Number(membershipPlanId), firstName, lastName, token);
      } catch (error) {
        sentryLog(error);

        if (typeof (error as StripeError).code !== undefined) {
          const stripeError = error as StripeError;
          setToast({
            status: 'error',
            title: stripeErrorHandler(stripeError.code),
          });
        } else {
          setToast({
            status: 'error',
            title: '予期せぬエラーが発生しました。',
          });
        }
      }
    },
    [getCreateToken, setToast, request, membershipPlanId]
  );

  const fetcher = useCallback(() => {
    let parsed;
    try {
      parsed = getMembershipPlanForSubscribeSchema.parse({
        membership_plan_id: Number(membershipPlanId),
      });
    } catch (err) {
      console.error(err);
      sentryLog(err);
      throw new Error('パラメーターが不正です。');
    }
    return getMembershipPlanForSubscribe(parsed);
  }, [membershipPlanId]);

  const { data } = useFetch<GetMembershipPlanForSubscribeResponse>(
    fetcher,
    typeof membershipPlanId === 'string'
  );

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
        data: toMembershipPlanForSubscribe(data.data),
      });
    }
    setPageState({
      type: 'error',
      message: '予期しないデータを取得しました',
    });
  }, [data]);

  // NOTE: personalizeページ改修中のため、payment終了タイミングでtoAppへ飛ばす
  useEffect(() => {
    if (isSuccessState(state)) {
      if (isApp) {
        router.push('/');
      } else {
        // webの場合は、アプリインストールへ誘導
        router.push('/onboarding/toApp');
      }
    }
    if (isFailState(state)) {
      setToast({
        status: 'error',
        title: state.error,
      });
    }
  }, [state, setToast, isApp]);

  const isSubmitting = useMemo(() => {
    return isLoadingState(state);
  }, [state]);

  return { pageState, onSubmit, isSubmitting };
};
