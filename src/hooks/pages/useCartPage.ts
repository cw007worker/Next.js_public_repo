import { useDeleteCartItem } from 'hooks/useDeleteCartItem';
import { useFetch } from 'hooks/useFetch';
import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import { useUpdateCartItemQuantity } from 'hooks/useUpdateCartItemQuantity';
import router from 'next/router';
import React from 'react';
import { getCart } from 'repositories/getCart';
import { toCart } from 'repositories/toViewModel/toCart';
import { GetCartResponse } from 'type/response/getCart';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { CartItem } from 'type/viewModel/common/cartItem';

type INIT = undefined;
type LOADING = { type: 'loading' };
type LOADED = { type: 'loaded' };
type ERROR = { type: 'error'; message: string };
type PageState = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  pageState: PageState;
  cartItems: CartItem[] | undefined;
  handleDelete: (unitId: number) => void;
  increment: (unitId: number) => void;
  decrement: (unitId: number) => void;
  handleNext: () => void;
  isDisabled: boolean;
  layoutState: LayoutState;
};

export const useCartPage = (): HookState => {
  const [pageState, setPageState] = React.useState<PageState>(undefined);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const {
    state: updateState,
    increment,
    decrement,
  } = useUpdateCartItemQuantity();
  const { state: deleteState, request: handleDelete } = useDeleteCartItem();
  const layoutState = useLayout();

  const handleNext = () => {
    router.push('orderConfirm');
  };

  const fetcher = React.useCallback(() => {
    return getCart();
  }, []);

  const { data } = useFetch<GetCartResponse>(fetcher, shouldFetch);

  React.useEffect(() => {
    if (updateState?.type === 'loading' || deleteState?.type === 'loading') {
      setShouldFetch(false);
    } else {
      setShouldFetch(true);
    }
  }, [updateState, deleteState]);

  React.useEffect(() => {
    if (isInitState(data)) {
      return setPageState(undefined);
    }
    if (isLoadingState(data)) {
      return setPageState({
        type: 'loading',
      });
    }
    if (isFailState(data)) {
      return setPageState({
        type: 'error',
        message: data.error,
      });
    }
    if (isSuccessState(data)) {
      const fetchedData = toCart(data.data);
      if (fetchedData === null) {
        setCartItems([]);
      } else {
        setCartItems(fetchedData.cartItems);
      }
      return setPageState({
        type: 'loaded',
      });
    }
    setPageState({
      type: 'error',
      message: '予期しないデータを取得しました',
    });
  }, [data]);

  React.useEffect(() => {
    const hasOverStock = cartItems.some((cartItem) => cartItem.isOverstock);
    setIsDisabled(hasOverStock);
  }, [cartItems]);

  return {
    pageState,
    cartItems,
    handleDelete,
    increment,
    decrement,
    handleNext,
    isDisabled,
    layoutState,
  };
};
