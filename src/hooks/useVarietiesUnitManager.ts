// TODO: reducerに書き直したい
import { useCallback, useEffect, useMemo, useState } from 'react';
import { UniqueUnitWithVarieties } from 'type/viewModel/common/unit';
import { Variety } from 'type/viewModel/common/variety';
import { UniqueUnit } from 'type/viewModel/common/unit';
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
  units: Map<string, UniqueUnitWithVarieties>;
  varieties: Map<string, Variety>;
};

type StockState =
  | {
      units: Map<string, UniqueUnitWithVarieties>;
      varieties: Map<string, Variety>;
    }
  | undefined;

export type VarietyMap = {
  type: string;
  name: string;
  image:
    | {
        alt: string;
        url: string;
      }
    | undefined;
  totalStock: number;
  disabled: boolean;
  selected: boolean;
};

const isInitStock = (stock: any): stock is undefined => {
  return stock === undefined;
};

export const useVarietiesUnitManager = (props: Props) => {
  const router = useRouter();
  const refetchUser = useUpdateUserContext();
  // 商品情報　参照のみ
  const [stock, setStock] = useState<StockState>(undefined);
  // 商品のunitId
  const [unitId, setUnitId] = useState<string>('');
  // 商品の個数
  const [quantity, setQuantity] = useState(1);
  // ユーザーが選択したvariety
  const [varietyChoice, setVarietyChoice] = useState<string>('');
  // ユーザーが選択したvarietyタイプ
  const [varietyType, setVarietyType] = useState<string>('');
  // ユーザーが選択したsize
  const [varieties, setVarieties] = useState<VarietyMap[] | undefined>(
    undefined
  );
  // リセットの用
  const [constVarieties, setConstVarieties] = useState<
    VarietyMap[] | undefined
  >(undefined);

  //unitIDによって選択されたunit情報
  const [selectedUnit, setSelectedUnit] = useState<
    UniqueUnitWithVarieties | undefined
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
        varieties: props.varieties,
      });
    }
  }, [props, stock]);

  // ユーザーが選択したvarietyを最初にセットするのはここ
  useEffect(() => {
    if (isInitStock(stock)) return;
    let array: VarietyMap[] = [];
    stock.varieties.forEach((variety) => {
      let totalStock: number = 0;
      stock.units.forEach((val, key) => {
        if (variety.name === val.variety) {
          totalStock += val.stock;
        }
      });
      const map: VarietyMap = {
        type: variety.varietyKind ?? '',
        name: variety.name,
        totalStock: totalStock,
        image: variety.image ?? undefined,
        disabled: false,
        selected: false,
      };
      array.push(map);
    });
    setVarieties(array);
    setConstVarieties(array);
  }, [stock]);

  // unitIDを格納する
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (typeof router.query.unitId === 'string') {
      if (router.query.unitId == undefined) return;
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
        if (varietyChoice === '') {
          setVarietyChoice(unit.variety);
          setVarietyType(unit.varietyKind);
        }
      }
    } else {
      //no-op
    }
  }, [stock, unitId, varietyChoice]);

  //  ユーザーのverityチョイスによってstockに利用可能か問い合わせ、pickerに渡すデータを更新する
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (varietyChoice !== '') {
      // variety chocieによってボタン表示を切り替える操作
      setVarieties((prev) => {
        if (prev !== undefined) {
          const newVarieties: VarietyMap[] = prev.map((variety) => ({
            ...variety,
            selected: variety.name === varietyChoice,
          }));
          return newVarieties;
        }
      });

      let result: number | undefined = undefined;
      stock.units.forEach((unit) => {
        if (unit.variety === varietyChoice) {
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
  }, [setToast, stock, varietyChoice]);

  /**
   * @param  {string} variety
   * @param  {string} type unitsがvariety typeを持っているので選択した際にvarietyのtypeを取得する
   */
  const handleVarietyChoice = useCallback(
    (variety: string, type: string) => {
      if (varietyChoice === variety) {
        setVarietyChoice('');
        setSelectedUnit(undefined);
        setUnitId('');
        setVarietyType('');
        setVarieties(constVarieties);
        return;
      }
      setVarietyChoice(variety);
      setVarietyType(type);
    },
    [constVarieties, varietyChoice]
  );

  return {
    // ユーザーが選んだunitId
    unitId,
    // ユーザーが選んだ個数
    quantity,
    //ユーザーが選んだ商品の個数をセットする関数
    setQuantity,
    //ユーザーが選んだ商品をセットする関数
    handleVarietyChoice,
    //variety pickerに渡すdata
    varieties,
    //ユーザーがチョイスしたvariety
    varietyChoice,
    //varietyの種類
    varietyType,
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
