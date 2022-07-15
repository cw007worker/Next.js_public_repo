import { addShippingAddress } from 'repositories/addShippingAddress';
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
import { addShippingAddressSchema } from 'type/request/addShippingAddress';
import { sentryLog } from 'libs/setnry';

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
 * お届け先情報追加のカスタムフック
 * @returns request - valuesを引数にしてAPIぶっ叩くリクエスト処理
 * @returns state - リクエスト処理の状態
 */
export const useAddShippingAddress = () => {
  const [data, setData] = React.useState<
    DataState<{
      status: number;
      message: null;
    }>
  >(undefined);
  const [state, setState] = React.useState<State>(undefined);

  /**
   * お届け先情報の追加するAPIぶっ叩く
   */
  const request = React.useCallback(async (values: EnterShippingAddress) => {
    setData(createLoadingState());
    let parsed: any;
    try {
      parsed = addShippingAddressSchema.parse({
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
      sentryLog(err);
      return setData(createFailState('パラメータが不正です。'));
    }

    try {
      const res = await addShippingAddress(parsed);
      setData(createSuccessState(res));
    } catch (err) {
      sentryLog(err);
      setData(createFailState('データの取得に失敗しました。'));
    }
  }, []);

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

  return { request, state };
};
