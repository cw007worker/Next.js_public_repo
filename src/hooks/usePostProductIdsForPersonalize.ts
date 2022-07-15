import { useCallback, useState } from 'react';
import { sentryLog } from 'libs/setnry';
import { postProductIdsForPersonalizeSchema } from 'type/request/postProductIdsForPersonalize';

import {
  createFailState,
  createLoadingState,
  createSuccessState,
  FetchManageState,
} from 'type/util/fetchData';
import { postProductIdsForPersonalize } from 'repositories/postProductIdsForPersonalize';

type DataState<T> = FetchManageState<T>;

export const usePostProductIdsForPersonalize = () => {
  const [state, setState] = useState<
    DataState<{
      status: number;
      message: null;
    }>
  >(undefined);
  const request = useCallback(async (productIds: string[]) => {
    setState(createLoadingState());
    let parsed;
    try {
      parsed = postProductIdsForPersonalizeSchema.parse({
        product_ids: productIds,
      });
    } catch (err) {
      sentryLog(err);
      return setState(createFailState('パラメーターが不正です。'));
    }
    try {
      const res = await postProductIdsForPersonalize(parsed);
      setState(createSuccessState(res));
    } catch (err) {
      sentryLog(err);
      setState(createFailState('データの取得に失敗しました。'));
    }
  }, []);

  return {
    request,
    state,
  };
};
