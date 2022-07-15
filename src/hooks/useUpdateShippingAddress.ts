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
import React from 'react';
import { EnterShippingAddress } from 'type/common/enterShippingAddress';
import { updateShippingAddressSchema } from 'type/request/updateShippingAddress';
import { updateShippingAddress } from 'repositories/updateShippingAddress';

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
  request?: (values: EnterShippingAddress) => Promise<void>;
  state: State;
};

type Props = {
  shippingAddressId: number;
};
/**
 * お届け先情報追加のカスタムフック
 * @param shippingAddressId お届け先情報ID
 * @returns request - valuesを引数にしてAPIぶっ叩くリクエスト処理
 * @returns state - リクエスト処理の状態
 */
export const useUpdateShippingAddress = (
  shippingAddressId: number | undefined
): HookState => {
  const [data, setData] = React.useState<
    DataState<{
      status: number;
      message: null;
    }>
  >(undefined);
  const [state, setState] = React.useState<State>(undefined);

  /**
   * お届け先情報の変更するAPIぶっ叩く
   */
  const request = React.useCallback(
    async (values: EnterShippingAddress) => {
      setData(createLoadingState());
      let parsed: any;
      try {
        parsed = updateShippingAddressSchema.parse({
          id: shippingAddressId,
          first_name: values.firstName,
          last_name: values.lastName,
          first_name_kana: values.firstNameKana,
          last_name_kana: values.lastNameKana,
          zipcode: values.zipcode,
          prefecture: values.prefecture,
          address: values.address,
          building_name: values.buildingName,
        });
      } catch (err) {
        return setData(createFailState('パラメータが不正です。'));
      }

      try {
        const res = await updateShippingAddress(parsed);
        setData(createSuccessState(res));
      } catch (err) {
        setData(createFailState('データの取得に失敗しました。'));
      }
    },
    [shippingAddressId]
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

  if (!shippingAddressId) {
    return { state };
  }

  return { request, state };
};
