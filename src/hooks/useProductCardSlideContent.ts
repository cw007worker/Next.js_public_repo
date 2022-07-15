import { sentryLog } from 'libs/setnry';
import React from 'react';
import { Unit } from 'type/viewModel/common/unitForProductList';
import { getUnitsSchema } from 'type/request/getUnits';
import { getUnits } from 'repositories/getUnits';
import { useFetch } from './useFetch';
import { GetUnitsResponse } from 'type/response/getUnits';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { toUnits } from 'repositories/toViewModel/toUnits';

type INIT = undefined;
type LOADING = { type: 'loading' };
type LOADED = { type: 'loaded' };
type ERROR = { type: 'error'; message: string };
type State = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  state: State;
  title: string;
  contents: Unit[];
};
export const useProductCardSlideContent = (units: {
  title: string;
  unitIds: number[];
}): HookState => {
  const { title, unitIds } = units;

  const [state, setState] = React.useState<State>(undefined);
  const [contents, setContents] = React.useState<Unit[]>([]);

  const fetcher = React.useCallback(() => {
    let parsed;
    try {
      parsed = getUnitsSchema.parse({
        unit_ids: unitIds || [],
      });
    } catch (err) {
      console.error(err);
      sentryLog(err);
      throw new Error('パラメーターが不正です。');
    }
    return getUnits(parsed);
  }, [unitIds]);

  const { data } = useFetch<GetUnitsResponse>(fetcher);

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
      const fetchedData = toUnits(data.data);
      setContents(fetchedData);
      setState({
        type: 'loaded',
      });
      return;
    }
    setState({
      type: 'error',
      message: '予期しないデータを取得しました',
    });
  }, [data]);

  return {
    state,
    title,
    contents,
  };
};
