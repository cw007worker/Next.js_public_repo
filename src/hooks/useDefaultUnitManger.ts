import { useCallback, useEffect, useMemo, useState } from 'react';
import { DefaultUnit } from 'type/viewModel/common/unit';
import { useToast } from 'hooks/useToast';
import { useRouter } from 'next/router';
import { useAddCart } from './useAddCart';
import {
  isLoadingState,
  isFailState,
  isSuccessState,
} from 'type/util/fetchData';
import { useUpdateUserContext } from 'context/userContext';
import { useUpdateWishlist } from './useUpdateWishlist';

type Props = {
  units: Map<string, DefaultUnit>;
};

type StockState =
  | {
      units: Map<string, DefaultUnit>;
    }
  | undefined;

const isInitStock = (stock: any): stock is undefined => {
  return stock === undefined;
};

export const useDefaultUnitManager = (props: Props) => {
  const router = useRouter();
  const refetchUser = useUpdateUserContext();
  // 商品情報　参照のみ
  const [stock, setStock] = useState<StockState>(undefined);
  // 商品のunitId
  const [unitId, setUnitId] = useState<string>('');
  // 商品の個数
  const [quantity, setQuantity] = useState(1);

  //unitIDによって選択されたunit情報
  const [selectedUnit, setSelectedUnit] = useState<DefaultUnit | undefined>(
    undefined
  );
  const setToast = useToast();
  const { state: addCartState, request: addCartRequest } = useAddCart();
  const disableAddCartBtn = useMemo(() => {
    return unitId === '' || quantity <= 0;
  }, [quantity, unitId]);
  const isLoadingAddCartBtn = useMemo(() => {
    return isLoadingState(addCartState);
  }, [addCartState]);

  useEffect(() => {
    if (isFailState(addCartState)) {
      setToast({ status: 'error', title: 'カートに追加できませんでした。' });
    }
    if (isSuccessState(addCartState)) {
      setToast({ status: 'success', title: 'カートに追加しました。' });
    }
  }, [addCartState, setToast]);
  const handleAddCart = useCallback(() => {
    if (unitId !== '' && quantity > 0) {
      addCartRequest(Number(unitId), quantity);
      // カートアイテムを更新するために叩く
      // NOTE: 一時的に詳細ページのUIの挙動のバグ（カート追加時に非会員のUIが見えてしまうやつ）が起きないようにコメントアウト
      // FYI: https://parchie.slack.com/archives/C01S291VAJD/p1654007298910929
      // refetchUser();
    } else {
      setToast({ status: 'error', title: '商品を選択してください。' });
    }
  }, [addCartRequest, quantity, refetchUser, setToast, unitId]);

  // お気に入り機能
  const {
    state: updateWishlistState,
    addRequest: addWishlist,
    deleteRequest: deleteWishlist,
    inWishlist,
    changeWishlistId,
  } = useUpdateWishlist();
  const isLoadingUpdateWishlistBtn = useMemo(() => {
    return isLoadingState(updateWishlistState);
  }, [updateWishlistState]);
  const handleUpdateWishlist = () => {
    if (unitId !== '') {
      if (inWishlist) {
        deleteWishlist(Number(unitId));
      } else {
        addWishlist(Number(unitId));
      }
    } else {
      setToast({ status: 'error', title: '無効な商品です' });
    }
  };
  useEffect(() => {
    if (selectedUnit) {
      changeWishlistId(selectedUnit.wishlistId);
    }
  }, [selectedUnit, changeWishlistId]);
  useEffect(() => {
    if (isFailState(updateWishlistState)) {
      setToast({
        status: 'error',
        title: updateWishlistState.error,
      });
    }
  }, [updateWishlistState, setToast]);

  // 初期化
  useEffect(() => {
    if (props !== undefined && stock === undefined) {
      setStock({
        units: props.units,
      });
    }
  }, [props, stock]);

  // unitIDを格納する
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (typeof router.query.unitId === 'string') {
      if (!stock.units.has(router.query.unitId)) {
        // TODO: レコメンド一覧から遷移してきたタイミングで、遷移前の"stock.units"が参照されてしまうので直す
        // それまではToastの処理は一旦コメントアウトする
        // setToast({
        //   status: 'error',
        //   title: 'お探しの商品は現在ご利用できません',
        // });
        return;
      }
      setUnitId(router.query.unitId);
    }
  }, [router.query.unitId, setToast, stock]);

  // unitIDから必要な情報をviewに渡す
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (unitId !== '') {
      const unit = stock.units.get(String(unitId));
      if (unit !== undefined) {
        setSelectedUnit(unit);
      }
    }
  }, [setToast, stock, unitId]);

  return {
    // ユーザーが選んだunitId
    unitId,
    // ユーザーが選んだ個数
    quantity,
    //ユーザーがチョイスしたunitIdによってunitの情報を表示する
    selectedUnit,
    //カート追加ボタン
    disableAddCartBtn,
    isLoadingAddCartBtn,
    handleAddCart,
    // お気に入り機能
    isLoadingUpdateWishlistBtn,
    handleUpdateWishlist,
    inWishlist,
  };
};
