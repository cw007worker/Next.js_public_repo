import { sentryLog } from 'libs/setnry';
import React from 'react';
import { deleteCartItem } from 'repositories/deleteCartItem';
import { deleteCartItemSchema } from 'type/request/deleteCartItem';
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
import { useUpdateUserContext } from 'context/userContext';

type DataState<T> = FetchManageState<T>;
type INIT = undefined;
type LOADING = { type: 'loading' };
type LOADED = { type: 'loaded' };
type ERROR = { type: 'error'; message: string };
type State = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  state: State;
  request: (unitId: number) => void;
};

export const useDeleteCartItem = (): HookState => {
  const [data, setData] = React.useState<
    DataState<{
      status: number;
      message: null;
    }>
  >(undefined);
  const [state, setState] = React.useState<State>(undefined);
  const refetchUser = useUpdateUserContext();

  const request = React.useCallback(
    async (unitId: number) => {
      setData(createLoadingState());
      let parsed;
      try {
        parsed = deleteCartItemSchema.parse({
          unit_id: unitId,
        });
      } catch (err) {
        console.error(err);
        sentryLog(err);
        return setData(createFailState('パラメーターが不正です。'));
      }
      try {
        const res = await deleteCartItem({
          unit_id: parsed.unit_id,
        });
        refetchUser();
        setData(createSuccessState(res));
      } catch (err) {
        sentryLog(err);
        setData(createFailState('削除に失敗しました。'));
      }
    },
    [refetchUser]
  );

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
      });
    }
    setState({
      type: 'error',
      message: '予期しないデータを取得しました',
    });
  }, [data]);

  return {
    state,
    request,
  };
};
