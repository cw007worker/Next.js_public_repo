import { sentryLog } from 'libs/setnry';
import React from 'react';
import { decrementCartItem } from 'repositories/decrementCartItem';
import { deleteCartItem } from 'repositories/deleteCartItem';
import { incrementCartItem } from 'repositories/incrementCartItem';
import { deleteCartItemSchema } from 'type/request/deleteCartItem';
import { updateCartItemSchema } from 'type/request/updateCartItem';
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
  increment: (unitId: number) => void;
  decrement: (unitId: number) => void;
};

export const useUpdateCartItemQuantity = (): HookState => {
  const [data, setData] = React.useState<
    DataState<{
      status: number;
      message: null;
    }>
  >(undefined);
  const [state, setState] = React.useState<State>(undefined);
  const refetchUser = useUpdateUserContext();

  const increment = React.useCallback(
    async (unitId: number) => {
      setData(createLoadingState());
      let parsed;
      try {
        parsed = updateCartItemSchema.parse({
          unit_id: unitId,
        });
      } catch (err) {
        console.error(err);
        sentryLog(err);
        return setData(createFailState('パラメーターが不正です。'));
      }
      try {
        const res = await incrementCartItem({
          unit_id: parsed.unit_id,
        });
        refetchUser();
        setData(createSuccessState(res));
      } catch (err) {
        sentryLog(err);
        setData(createFailState('アイテム数を増やせませんでした。'));
      }
    },
    [refetchUser]
  );

  const decrement = React.useCallback(
    async (unitId: number) => {
      setData(createLoadingState());
      let parsed;
      try {
        parsed = updateCartItemSchema.parse({
          unit_id: unitId,
        });
      } catch (err) {
        console.error(err);
        sentryLog(err);
        return setData(createFailState('パラメーターが不正です。'));
      }
      try {
        const res = await decrementCartItem({
          unit_id: parsed.unit_id,
        });
        refetchUser();
        setData(createSuccessState(res));
      } catch (err) {
        sentryLog(err);
        setData(createFailState('アイテム数を減らせませんでした。'));
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
    increment,
    decrement,
  };
};
