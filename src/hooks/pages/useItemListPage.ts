import {
  useGetItemList,
  HookState as GetProductListState,
} from 'hooks/useGetItemList';
import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import {
  useQuery,
  HookState as QueryState,
  defaultDisplayColor,
} from 'hooks/useQuery';

export type HookState = {
  layoutState: LayoutState;
  getItemsState: GetProductListState;
  queryState: QueryState;
  handleToggleDisplayColor: () => void;
};

// 最新商品一覧と、タグに紐づく商品一覧は、そもそもpageレベルで分けることにした。
export const useItemListPage = (): HookState => {
  const queryState = useQuery();
  const getItemsState = useGetItemList({
    sort: '-created_at', // 新着順
    displayColor: queryState.query.displayColor,
  });
  const layoutState = useLayout();

  const handleToggleDisplayColor = () => {
    queryState.handlePushQuery({
      displayColor:
        queryState.query.displayColor === 'true'
          ? 'false'
          : queryState.query.displayColor === 'false'
          ? 'true'
          : defaultDisplayColor === 'false'
          ? 'true'
          : 'false',
    });
  };

  return {
    layoutState,
    getItemsState,
    queryState,
    handleToggleDisplayColor,
  };
};
