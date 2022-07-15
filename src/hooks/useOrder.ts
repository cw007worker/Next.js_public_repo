import {
  FetchManageState,
  createFailState,
  createLoadingState,
  isInitState,
  isLoadingState,
  isFailState,
  isSuccessState,
} from '../type/util/fetchData';
import { provisionalOrderSchema } from '../type/request/provisionalOrder';
import { useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { provisionalOrder } from 'repositories/provisionalOrder';
import router from 'next/router';
import { useToast } from './useToast';
import { sentryLog } from 'libs/setnry';
import { pantriiApiErrorHandler } from 'type/util/errorHandler/pantriiApi';
import {
  PantriiApiError,
  StripeApiError,
  VoucherifyApiError,
} from 'inflastructure/ApiError';
import { stripeApiErrorHandler } from 'type/util/errorHandler/stripeApi';
import { voucherifyApiErrorHandler } from 'type/util/errorHandler/voucherifyApi';
import { StripeError } from '@stripe/stripe-js';
import { stripeErrorHandler } from 'type/util/errorHandler/stripe';

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
 * 注文確定処理のフック
 * @returns handleSubmit 注文確定ボタンの処理
 * @returns state 処理の状態
 */
export const useOrder = () => {
  const [data, setData] = React.useState<DataState<any>>(undefined);
  const [state, setState] = React.useState<State>(undefined);
  const setToast = useToast();
  const stripe = useStripe();

  /**
   * 注文確定ボタンの処理
   * @param event ボタンのイベント(preventDefault用)
   * @param paymentWayId stripeCardIdを入れる
   * @param shippingAddressId shippingAddress.idを入れる
   * @param coupon_code - coupon.codeを入れる
   * @returns
   */
  const handleSubmit = async (
    event: React.FormEvent,
    paymentWayId: string,
    shippingAddressId: number,
    couponCode: string | undefined
  ) => {
    event.preventDefault();
    setData(createLoadingState());
    if (!stripe) {
      let error =
        '予期せぬエラーが発生しました。詳細はPantriiサポートまでお問い合わせください。';
      sentryLog(error);
      return setData(createFailState(error));
    }

    // 注文(仮)確定処理
    let parsed: any;
    try {
      parsed = provisionalOrderSchema.parse({
        payment_way_id: paymentWayId,
        shipping_address_id: shippingAddressId,
        coupon_code: couponCode,
      });
    } catch (err) {
      sentryLog(err);
      return setData(createFailState('パラメータが不正です。'));
    }

    let res;
    try {
      res = await provisionalOrder(parsed);
    } catch (error) {
      sentryLog(error);
      if (error instanceof StripeApiError) {
        return setData(
          createFailState(stripeApiErrorHandler(error.response.code))
        );
      } else if (error instanceof VoucherifyApiError) {
        return setData(
          createFailState(voucherifyApiErrorHandler(error.response.code))
        );
      } else if (error instanceof PantriiApiError) {
        return setData(
          createFailState(pantriiApiErrorHandler(error.response.code))
        );
      } else {
        return setData(
          createFailState(
            '予期せぬエラーが発生しました。詳細はPantriiサポートまでお問い合わせください。'
          )
        );
      }
    }

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        res.client_secret
      );
      if (error && typeof (error as StripeError).code !== undefined) {
        const stripeError = error as StripeError;
        return setData(createFailState(stripeErrorHandler(stripeError.code)));
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        router.push('orderCompleted');
      } else {
        return setData(
          createFailState(
            '予期せぬエラーが発生しました。お手数ですがPantriiサポートまでお問い合わせください。'
          )
        );
      }
    } catch (error) {
      sentryLog(error);
      if (typeof (error as StripeError).code !== undefined) {
        const stripeError = error as StripeError;
        return setData(createFailState(stripeErrorHandler(stripeError.code)));
      }
      return setData(createFailState('決済の途中でエラーが発生しました'));
    }
  };

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
      return setState({
        type: 'loaded',
        data: {
          status: 'success',
        },
      });
    }
    setState({
      type: 'error',
      message: '予期しないデータを取得しました。',
    });
  }, [data]);

  React.useEffect(() => {
    if (state !== undefined && state.type === 'error') {
      setToast({ status: 'error', title: state.message });
    }
  }, [state, setToast]);

  return { handleSubmit, state };
};
