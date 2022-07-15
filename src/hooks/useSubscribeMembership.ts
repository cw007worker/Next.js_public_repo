import { useCallback, useState, useEffect } from 'react';
import {
  FetchManageState,
  createLoadingState,
  createFailState,
  createSuccessState,
  isInitState,
  isLoadingState,
  isFailState,
  isSuccessState,
} from 'type/util/fetchData';
import { subscribeMembership } from 'repositories/subscribeMembership';
import { subscribeMembershipSchema } from 'type/request/subscribeMembership';
import { sentryLog } from 'libs/setnry';
import { pantriiApiErrorHandler } from 'type/util/errorHandler/pantriiApi';
import {
  PantriiApiError,
  StripeApiError,
  VoucherifyApiError,
} from 'inflastructure/ApiError';
import { stripeApiErrorHandler } from 'type/util/errorHandler/stripeApi';
import { voucherifyApiErrorHandler } from 'type/util/errorHandler/voucherifyApi';

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

/**
 * メンバーシップ購読リクエスト処理のカスタムフック
 * @returns request - Formからカード情報のtokenを生成して、メンバーシップ購読APIを叩く
 * @returns state   - リクエスト処理の状態
 */
export const useSubscribeMembership = () => {
  const [state, setState] = useState<
    DataState<{
      status: number;
      message: null;
    }>
  >(undefined);

  const request = useCallback(
    async (
      membershipPlanId: number,
      firstName: string,
      lastName: string,
      cardToken: string
    ) => {
      setState(createLoadingState());

      let parsed: any;
      console.log(membershipPlanId);
      try {
        parsed = subscribeMembershipSchema.parse({
          membership_plan_id: membershipPlanId,
          last_name: lastName,
          first_name: firstName,
          card_token: cardToken,
        });
      } catch (err) {
        sentryLog(err);
        return setState(createFailState('パラメータが不正です。'));
      }

      try {
        const res = await subscribeMembership({
          membership_plan_id: parsed.membership_plan_id,
          last_name: parsed.last_name,
          first_name: parsed.first_name,
          card_token: parsed.card_token,
        });
        setState(createSuccessState(res));
      } catch (err) {
        sentryLog(err);
        if (err instanceof StripeApiError) {
          setState(createFailState(stripeApiErrorHandler(err.response.code)));
        } else if (err instanceof VoucherifyApiError) {
          setState(
            createFailState(voucherifyApiErrorHandler(err.response.code))
          );
        } else if (err instanceof PantriiApiError) {
          setState(createFailState(pantriiApiErrorHandler(err.response.code)));
        } else {
          setState(
            createFailState(
              '予期せぬエラーが発生しました。詳細はPantriiサポートまでお問い合わせください。'
            )
          );
        }
      }
    },
    []
  );
  return { request, state };
};
