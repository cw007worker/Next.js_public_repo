import { useCallback, useEffect, useState } from 'react';
import { sentryLog } from 'libs/setnry';

import {
  createFailState,
  createLoadingState,
  createSuccessState,
  FetchManageState,
} from 'type/util/fetchData';
import { addWishlistSchema } from 'type/request/addWishlist';
import { addWishlist } from 'repositories/addWishlist';
import { deleteWishlistSchema } from 'type/request/deleteWishlist';
import { deleteWishlist } from 'repositories/deleteWishlist';
import { toAddWishlist } from 'repositories/toViewModel/toAddWishlist';

type DataState<T> = FetchManageState<T>;

export type HookState = {
  state: DataState<{ wishlistId: number | null } | { message: null }>;
  addRequest: (unitId: number) => void;
  deleteRequest: (unitId: number) => void;
  inWishlist: boolean;
  changeWishlistId: (wishlistId: number | null) => void;
};

export const useUpdateWishlist = (): HookState => {
  const [state, setState] =
    useState<DataState<{ wishlistId: number | null } | { message: null }>>(
      undefined
    );
  const [inWishlist, setInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState<number | null>(null);
  const changeWishlistId = useCallback((wishlistId: number | null) => {
    setWishlistId(wishlistId);
  }, []);

  useEffect(() => {
    setInWishlist(!!wishlistId);
  }, [wishlistId]);

  const addRequest = useCallback(async (unitId: number) => {
    setState(createLoadingState());
    let parsed;
    try {
      parsed = addWishlistSchema.parse({
        unit_id: unitId,
      });
    } catch (err) {
      console.error(err);
      sentryLog(err);
      return setState(createFailState('パラメーターが不正です。'));
    }
    try {
      const res = await addWishlist(parsed);
      const formatData = toAddWishlist(res);
      setWishlistId(formatData.wishlistId);
      setState(createSuccessState(formatData));
    } catch (err) {
      sentryLog(err);
      setState(createFailState('お気に入りの追加に失敗しました'));
    }
  }, []);

  const deleteRequest = useCallback(async () => {
    setState(createLoadingState());
    let parsed;
    try {
      parsed = deleteWishlistSchema.parse({
        wishlist_id: wishlistId,
      });
    } catch (err) {
      console.error(err);
      sentryLog(err);
      return setState(createFailState('パラメーターが不正です。'));
    }
    try {
      const res = await deleteWishlist(parsed);
      setState(createSuccessState(res));
      setInWishlist(false);
    } catch (err) {
      sentryLog(err);
      setState(createFailState('お気に入りの削除に失敗しました'));
    }
  }, [wishlistId]);

  return {
    state,
    addRequest,
    deleteRequest,
    inWishlist,
    changeWishlistId,
  };
};
