// TODO: reducerに書き直したい
import { useCallback, useEffect, useMemo, useState } from 'react';
import { UniqueUnitWithSizes } from 'type/viewModel/common/unit';
import { useToast } from 'hooks/useToast';
import { useRouter } from 'next/router';
import { Size } from 'type/viewModel/common/size';
import { useAddCart } from './useAddCart';
import {
  isLoadingState,
  isFailState,
  isSuccessState,
} from 'type/util/fetchData';
import { useUpdateUserContext } from 'context/userContext';
import { useUpdateWishlist } from './useUpdateWishlist';

type Props = {
  units: Map<string, UniqueUnitWithSizes>;
  sizes: Map<string, Size>;
};

type StockState =
  | {
      units: Map<string, UniqueUnitWithSizes>;
      sizes: Map<string, Size>;
    }
  | undefined;

export type SizeMap = {
  name: string;
  disabled: boolean;
  selected: boolean;
  totalStock: number;
};

const isInitStock = (stock: any): stock is undefined => {
  return stock === undefined;
};

export const useSizesUnitManager = (props: Props) => {
  const router = useRouter();
  const refetchUser = useUpdateUserContext();
  // 商品情報　参照のみ
  const [stock, setStock] = useState<StockState>(undefined);
  // 商品のunitId
  const [unitId, setUnitId] = useState<string>('');
  // 商品の個数
  const [quantity, setQuantity] = useState(1);
  // ユーザーが選択したsize
  const [sizeChoice, setSizeChoice] = useState<string>('');
  // サイズのpikcerに渡すデータ
  const [sizes, setSizes] = useState<SizeMap[] | undefined>(undefined);
  // リセットの用
  const [constSizes, setConstSizes] = useState<SizeMap[] | undefined>(
    undefined
  );
  //unitIDによって選択されたunit情報
  const [selectedUnit, setSelectedUnit] = useState<
    UniqueUnitWithSizes | undefined
  >(undefined);
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
      // カートアイテムを更新するために叩いている
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

  // 初期化 (unique unit)
  useEffect(() => {
    if (props !== undefined && stock === undefined) {
      setStock({
        units: props.units,
        sizes: props.sizes,
      });
    }
  }, [props, stock]);

  useEffect(() => {
    if (isInitStock(stock)) return;
    let array: SizeMap[] = [];
    stock.sizes.forEach((size) => {
      let totalStock: number = 0;
      stock.units.forEach((val, key) => {
        if (size.name === val.size) {
          totalStock += val.stock;
        }
      });
      const map: SizeMap = {
        name: size.name,
        totalStock: totalStock,
        disabled: false,
        selected: false,
      };
      array.push(map);
    });
    setSizes(array);
    setConstSizes(array);
  }, [stock]);

  // unitIDを格納する
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (typeof router.query.unitId === 'string') {
      if (!stock.units.has(router.query.unitId)) {
        setToast({
          status: 'error',
          title: 'お探しの商品は現在ご利用できません',
        });
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
        if (sizeChoice === '') {
          setSizeChoice(unit.size);
        }
      }
    } else {
      //no-op
    }
  }, [sizeChoice, stock, unitId]);

  // ユーザーのsizeチョイスによってstockに利用可能か問い合わせ、pickerに渡すデータを更新する
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (sizeChoice !== '') {
      // sizeChoiceによってボタン表示を切り替える操作
      setSizes((prev) => {
        if (prev !== undefined) {
          const newSizes: SizeMap[] = prev.map((size) => ({
            ...size,
            disabled: !(size.name === sizeChoice),
            selected: size.name === sizeChoice,
          }));
          return newSizes;
        }
      });

      let result: number | undefined = undefined;
      stock.units.forEach((unit) => {
        if (unit.size === sizeChoice) {
          result = unit.id;
        }
        //no-op
      });
      if (result !== undefined) {
        setUnitId(result);
      } else {
        setToast({
          status: 'error',
          title: 'お探しのアイテムは現在利用できません。',
        });
      }
    }
  }, [setToast, sizeChoice, stock]);

  const handleSizeChoice = useCallback(
    (size: string) => {
      if (sizeChoice === size) {
        setSizeChoice('');
        setSelectedUnit(undefined);
        setUnitId('');
        setSizes(constSizes);
        return;
      }
      setSizeChoice(size);
    },
    [constSizes, sizeChoice]
  );

  return {
    // ユーザーが選んだunitId
    unitId,
    // ユーザーが選んだ個数
    quantity,
    //ユーザーが選んだ商品の個数をセットする関数
    setQuantity,
    //ユーザーが選んだサイズをセットする関数
    handleSizeChoice,
    //size pickerに渡すdata
    sizes,
    //ユーザーがチョイスしたsize
    sizeChoice,
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
