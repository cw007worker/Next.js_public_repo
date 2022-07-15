import { sentryLog } from 'libs/setnry';
import { useEffect, useState } from 'react';
import {
  createFailState,
  createLoadingState,
  createSuccessState,
  FetchManageState,
} from 'type/util/fetchData';
import { pantriiApiErrorHandler } from 'type/util/errorHandler/pantriiApi';
import {
  PantriiApiError,
  StripeApiError,
  VoucherifyApiError,
} from 'inflastructure/ApiError';
import { stripeApiErrorHandler } from 'type/util/errorHandler/stripeApi';
import { voucherifyApiErrorHandler } from 'type/util/errorHandler/voucherifyApi';

type DataState<T> = FetchManageState<T>;

/**
 * @param {function} promiseを返すfetcher関数を定義
 * @returns fail, success, loadingのいづれかの状態を持ったstate
 */
export const useFetch = <T>(
  fetcher: () => Promise<T>,
  shouldFetch: boolean = true
) => {
  const [data, setData] = useState<DataState<T>>(undefined);

  useEffect(() => {
    const f = async () => {
      setData(createLoadingState());
      try {
        const res = await fetcher();
        setData(createSuccessState(res));
      } catch (error) {
        sentryLog(error);
        if (error instanceof StripeApiError) {
          setData(createFailState(stripeApiErrorHandler(error.response.code)));
        } else if (error instanceof VoucherifyApiError) {
          setData(
            createFailState(voucherifyApiErrorHandler(error.response.code))
          );
        } else if (error instanceof PantriiApiError) {
          setData(createFailState(pantriiApiErrorHandler(error.response.code)));
        } else {
          setData(
            createFailState(
              'データの取得に失敗しました。詳細はPantriiサポートまでお問い合わせください。'
            )
          );
        }
      }
    };
    if (shouldFetch) {
      f();
    }
  }, [fetcher, shouldFetch]);

  return {
    data,
  };
};
