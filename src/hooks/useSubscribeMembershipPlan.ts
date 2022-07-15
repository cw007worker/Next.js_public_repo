import { useCallback, useState, useEffect, useMemo } from 'react';
import {
  FetchManageState,
  createLoadingState,
  createFailState,
  createSuccessState,
  isLoadingState,
} from 'type/util/fetchData';
import { sentryLog } from 'libs/setnry';
import { pantriiApiErrorHandler } from 'type/util/errorHandler/pantriiApi';
import { PantriiApiError, StripeApiError } from 'inflastructure/ApiError';
import { stripeApiErrorHandler } from 'type/util/errorHandler/stripeApi';
import { subscribeMembershipPlanSchema } from 'type/request/subscribeMembershipPlan';
import { subscribeMembershipPlan } from 'repositories/subscribeMembershipPlan';
import { useToast } from '@chakra-ui/react';
import router from 'next/router';
import { useRefetchUser } from './useRefetchUser';
import { useUpdateUserContext } from 'context/userContext';

type DataState<T> = FetchManageState<T>;

type INIT = undefined;

type LOADING = { type: 'loading' };

type LOADED = {
  type: 'loaded';
  data: { status: 'success' };
};

type ERROR = {
  type: 'error';
  message: string;
};

export type State = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  state: DataState<{ status: number; message: null }> | undefined;
  request: (membershipPlanId: number, membershipId: number) => void;
  isSubmitting: boolean;
};

export const useSubscribeMembershipPlan = () => {
  const refetchUser = useUpdateUserContext();
  const setToast = useToast();
  const [state, setState] = useState<
    DataState<{
      status: number;
      message: null;
    }>
  >(undefined);

  const isSubmitting = useMemo(() => {
    return isLoadingState(state);
  }, [state]);

  const request = useCallback(
    async (membershipPlanId: number, membershipId: number) => {
      setState(createLoadingState());

      let parsed: any;
      try {
        parsed = subscribeMembershipPlanSchema.parse({
          membership_plan_id: membershipPlanId,
          membership_id: membershipId,
        });
      } catch (err) {
        sentryLog(err);
        return setState(createFailState('パラメータが不正です。'));
      }

      try {
        const res = await subscribeMembershipPlan({
          membership_plan_id: parsed.membership_plan_id,
          membership_id: parsed.membership_id,
        });
        setState(createSuccessState(res));
        refetchUser();
        router.push('/user');
        setToast({
          status: 'success',
          title: '会員プランの更新に成功しました🎉',
        });
      } catch (err) {
        sentryLog(err);
        let msg;
        if (err instanceof StripeApiError) {
          msg = stripeApiErrorHandler(err.response.code);
        } else if (err instanceof PantriiApiError) {
          msg = pantriiApiErrorHandler(err.response.code);
        } else {
          msg =
            '予期せぬエラーが発生しました。詳細はPantriiサポートまでお問い合わせください。';
        }
        setState(createFailState(msg));
        setToast({ status: 'error', title: msg });
      }
    },
    [setToast]
  );
  return { request, state, isSubmitting };
};
