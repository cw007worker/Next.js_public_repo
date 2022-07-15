import { useCallback } from 'react';
import { updateDefaultPaymentWay } from 'repositories/updateDefaultPaymentWay';
import { updateDefaultPaymentWaySchema } from 'type/request/updateDefaultPaymentWay';
import { FetchManageState } from 'type/util/fetchData';
import { useRequest } from 'hooks/useRequest';
import { sentryLog } from 'libs/setnry';

export type State = FetchManageState<{ status: number; message: null }>;

export type TargetPaymentType = 'Order' | 'Subscription';

export const useUpdateDefaultPaymentWay = () => {
  const fetcher = useCallback(
    (stripe_card_id: string, targetPaymentScene: TargetPaymentType) => {
      let params;
      if (targetPaymentScene == 'Order') {
        params = { default: true };
      } else if (targetPaymentScene == 'Subscription') {
        params = { default_subscription: true };
      } else {
        params = {};
      }
      let parsed;
      console.log({
        stripe_card_id,
        ...params,
      });
      try {
        parsed = updateDefaultPaymentWaySchema.parse({
          stripe_card_id,
          ...params,
        });
      } catch (e) {
        console.error(e);
        sentryLog(e);
        throw new Error('パラメーターが不正です。');
      }
      return updateDefaultPaymentWay(parsed);
    },
    []
  );

  const { data: state, request } = useRequest(fetcher);

  return {
    state,
    request,
  };
};
