import { useCallback, useEffect, useState } from 'react';
import { addCart } from 'repositories/addCart';
import { addCartSchema } from 'type/request/addCart';
import { sentryLog } from 'libs/setnry';

import {
  createFailState,
  createLoadingState,
  createSuccessState,
  FetchManageState,
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';

type DataState<T> = FetchManageState<T>;

type INIT = undefined;

type LOADING = { type: 'loading' };

type LOADED = {
  type: 'loaded';
  data: { status: 'success' };
};

type ERROR = { type: 'error'; message: string };

export type State = INIT | LOADED | ERROR | LOADING;

export const useAddCart = () => {
  const [state, setState] = useState<
    DataState<{
      status: number;
      message: null;
    }>
  >(undefined);
  // const [state, setState] = useState<State>(undefined);

  const request = useCallback(async (unitId: number, quantity: number) => {
    setState(createLoadingState());
    let parsed;
    try {
      parsed = addCartSchema.parse({
        unit_id: unitId,
        quantity: quantity,
      });
    } catch (err) {
      console.error(err);
      sentryLog(err);
      return setState(createFailState('パラメーターが不正です。'));
    }
    try {
      const res = await addCart({
        unit_id: parsed.unit_id,
        quantity: parsed.quantity,
      });
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
