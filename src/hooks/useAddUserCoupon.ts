import { useToast } from '@chakra-ui/react';
import { sentryLog } from 'libs/setnry';
import React from 'react';
import { addUserCoupon } from 'repositories/addUserCoupon';
import { toAddUserCoupon } from 'repositories/toViewModel/toAddUserCoupon';
import { addUserCouponSchema } from 'type/request/addUserCoupon';
import {
  createFailState,
  createLoadingState,
  createSuccessState,
  FetchManageState,
} from 'type/util/fetchData';
import { Coupon } from 'type/viewModel/common/coupon';
import { pantriiApiErrorHandler } from 'type/util/errorHandler/pantriiApi';
import {
  PantriiApiError,
  StripeApiError,
  VoucherifyApiError,
} from 'inflastructure/ApiError';
import { stripeApiErrorHandler } from 'type/util/errorHandler/stripeApi';
import { voucherifyApiErrorHandler } from 'type/util/errorHandler/voucherifyApi';

type DataState<T> = FetchManageState<T>;

export type HookState = {
  state: DataState<Coupon>;
  request: (value: { code: string }) => void;
};
export const useAddUserCoupon = (): HookState => {
  const [state, setState] = React.useState<DataState<Coupon>>(undefined);
  const setToast = useToast();

  const request = React.useCallback(
    async (value: { code: string }) => {
      setState(createLoadingState());
      let parsed;
      try {
        parsed = addUserCouponSchema.parse({
          code: value.code,
        });
      } catch (err) {
        console.error(err);
        sentryLog(err);
        return setState(createFailState('パラメーターが不正です。'));
      }

      try {
        const res = await addUserCoupon(parsed);
        const formatData = toAddUserCoupon(res);
        setState(createSuccessState(formatData));
      } catch (err) {
        sentryLog(err);
        let msg;
        if (err instanceof StripeApiError) {
          msg = stripeApiErrorHandler(err.response.code);
        } else if (err instanceof VoucherifyApiError) {
          msg = voucherifyApiErrorHandler(err.response.code);
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

  return {
    state,
    request,
  };
};
