import {
  useGetProductListByRankingTag,
  HookState as GetProductListByRankingState,
} from 'hooks/useGetProductListByRankingTag';
import { useLayout, HookState as LayoutState } from 'hooks/useLayout';

export type HookState = {
  layoutState: LayoutState;
  productListState: GetProductListByRankingState;
};

export const useRankingPage = (): HookState => {
  const layoutState = useLayout();
  const productListState = useGetProductListByRankingTag();

  return {
    layoutState,
    productListState,
  };
};
