import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import {
  useGetWishlist,
  HookState as GetWishlistState,
} from 'hooks/useGetWishlist';

export type HookState = {
  layoutState: LayoutState;
  wishlistState: GetWishlistState;
};

export const useWishlistPage = (): HookState => {
  const wishlistState = useGetWishlist();
  const layoutState = useLayout();

  return {
    layoutState,
    wishlistState,
  };
};
