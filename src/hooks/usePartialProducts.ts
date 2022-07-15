import { useFetch } from 'hooks/useFetch';
import { sentryLog } from 'libs/setnry';
import router from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { getPartialUnits } from 'repositories/getPartialUnits';
import { getProductsByTag } from 'repositories/getProductsByTag';
import { toPartialProducts } from 'repositories/toViewModel/toPartialProducts';
import { getPartialUnitsSchema } from 'type/request/getPartialUnits';
import { getProductsByTagSchema } from 'type/request/getProductsByTag';
import { GetPartialUnitsResponse } from 'type/response/getPartialUnits';
import { GetProductsByTagResponse } from 'type/response/getProductsByTag';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { PartialUnits } from 'type/viewModel/partialUnits';

type INIT = undefined;
type LOADING = { type: 'loading' };
type LOADED = { type: 'loaded' };
type ERROR = { type: 'error'; message: string };
type State = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  state: State;
  tagId: number;
  partialUnits: PartialUnits | undefined;
  name: string | undefined;
  handleMore: () => void;
  isNew: boolean;
};

const pageNumber = 1;
const perNumber = 6;

export const usePartialProducts = (props: {
  tagId: number;
  name?: string;
  sort?: 'priority' | '-created_at';
  labelType?: 'new';
  moreHref?: {
    pathname: 'newItemList';
  };
}): HookState => {
  const { tagId, name, sort, labelType, moreHref } = props;
  const [state, setState] = React.useState<State>(undefined);
  const [partialUnits, setPartialUnits] = React.useState<
    PartialUnits | undefined
  >(undefined);

  const fetcher = React.useCallback(() => {
    let parsed;
    try {
      parsed = getProductsByTagSchema.parse({
        id: Number(tagId),
        sort: sort,
        page: pageNumber,
        per: perNumber,
      });
    } catch (err) {
      console.error(err);
      sentryLog(err);
      throw new Error('パラメーターが不正です。');
    }
    return getProductsByTag(parsed);
  }, [tagId, sort]);

  const { data } = useFetch<GetProductsByTagResponse>(fetcher);

  const isNew = useMemo(() => {
    return labelType == 'new';
  }, [labelType]);

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
      const fetchedData = toPartialProducts(data.data);
      setPartialUnits(fetchedData);
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

  const handleMore = useCallback(() => {
    if (moreHref !== undefined) {
      return router.push(moreHref);
    }

    const pathname =
      partialUnits?.type === 'Brand'
        ? '/brands'
        : partialUnits?.type === 'Category'
        ? '/categories'
        : undefined;

    const query =
      partialUnits?.type === 'Brand'
        ? { brandId: tagId }
        : partialUnits?.type === 'Category'
        ? { categoryId: tagId, displayColor: true } // category一覧はunit単位だと見にくいらしいので、デフォでproduct単位の表示にする
        : undefined;
    router.push({
      pathname,
      query,
    });
  }, [partialUnits, moreHref]);

  return {
    state,
    tagId,
    partialUnits,
    name,
    handleMore,
    isNew,
  };
};
