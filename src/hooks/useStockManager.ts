// TODO: reducerに書き直したい
import { useCallback, useEffect, useState } from 'react';
import { Size } from 'type/viewModel/common/size';
import {
  DefaultUnit,
  UniqueUnit,
  UniqueUnitWithAll,
  UniqueUnitWithSizes,
  UniqueUnitWithVarieties,
} from 'type/viewModel/common/unit';
import { Variety } from 'type/viewModel/common/variety';
import { useToast } from 'hooks/useToast';
import { PageState } from './pages/useProductDetailPage';
import { useRouter } from 'next/router';

interface StockStateWithVarieties {
  tag: 'varieties';
  units: Map<string, UniqueUnitWithVarieties>;
  varieties: Map<string, Variety>;
}
interface StockStateWithSizes {
  tag: 'sizes';
  units: Map<string, UniqueUnitWithSizes>;
  sizes: Map<string, Size>;
}

interface StockStateWithAll {
  tag: 'all';
  units: Map<string, UniqueUnitWithAll>;
  sizes: Map<string, Size>;
  varieties: Map<string, Variety>;
}

interface StockStateWithDefault {
  tag: 'default';
  units: Map<string, DefaultUnit>;
}

type StockState =
  | StockStateWithVarieties
  | StockStateWithSizes
  | StockStateWithAll
  | StockStateWithDefault
  | undefined;

export type SizeMap = {
  name: string;
  disabled: boolean;
  selected: boolean;
  totalStock: number;
};

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

export const useStockManager = (props: PageState) => {
  const router = useRouter();
  // 商品情報　参照のみ
  const [stock, setStock] = useState<StockState>(undefined);
  // 商品のunitId
  const [unitId, setUnitId] = useState<number | undefined>(undefined);
  // 商品の個数
  const [quantity, setQuantity] = useState(1);
  // ユーザーが選択したvariety
  const [varietyChoice, setVarietyChoice] = useState<string>('');
  // ユーザーが選択したvarietyタイプ
  const [varietyType, setVarietyType] = useState<string>('');
  // ユーザーが選択したsize
  const [sizeChoice, setSizeChoice] = useState<string>('');
  // サイズ以外のpickerに渡すデータ
  const [varieties, setVarieties] = useState<VarietyMap[] | undefined>(
    undefined
  );
  // サイズのpikcerに渡すデータ
  const [sizes, setSizes] = useState<SizeMap[] | undefined>(undefined);
  // リセットの用
  const [constVarieties, setConstVarieties] = useState<
    VarietyMap[] | undefined
  >(undefined);

  // リセットの用
  const [constSizes, setConstSizes] = useState<SizeMap[] | undefined>(
    undefined
  );
  //unitIDによって選択されたunit情報
  const [selectedUnit, setSelectedUnit] = useState<
    UniqueUnit | DefaultUnit | undefined
  >(undefined);
  const setToast = useToast();

  /**
   * 共通処理
   */
  // 初期化 (unique unit)
  useEffect(() => {
    if (props !== undefined && props.type === 'loaded') {
      if (props.data.tag === 'all') {
        setStock({
          tag: 'all',
          units: props.data.units,
          sizes: props.data.sizes,
          varieties: props.data.varieties,
        });
      } else if (props.data.tag === 'sizes') {
        setStock({
          tag: 'sizes',
          units: props.data.units,
          sizes: props.data.sizes,
        });
      } else if (props.data.tag === 'varieties') {
        setStock({
          tag: 'varieties',
          units: props.data.units,
          varieties: props.data.varieties,
        });
      } else if (props.data.tag === 'default') {
        setStock({
          tag: 'default',
          units: props.data.units,
        });
      } else {
        throw new Error('予期せぬデータを取得しました。');
      }
    }
  }, [props]);

  // unitIDが格納された時点でunit情報を問い合わせて、viewに渡す。
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (unitId !== undefined) {
      const unit = stock.units.get(String(unitId));
      if (unit !== undefined) {
        setSelectedUnit(unit);
        return;
      }
    }
    setSelectedUnit(undefined);
  }, [setToast, stock, unitId]);

  //  variteyで選択されたものにselected:trueを付与して、それ以外のvarietyにdesabled:trueを付与する
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (varietyChoice === '') return;
    if (stock.tag === ('all' || 'varieties')) {
      setVarieties((prev) => {
        if (prev !== undefined) {
          const newVarieties: VarietyMap[] = prev.map((variety) => ({
            ...variety,
            disabled: variety.name !== varietyChoice,
            selected: variety.name === varietyChoice,
          }));
          return newVarieties;
        }
      });
    }
  }, [stock, varietyChoice]);

  // sizeで選択されたものにselected:trueを付与して、それ以外のvarietyにdesabled:trueを付与する
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (sizeChoice === '') return;
    if (stock.tag === ('all' || 'sizes')) {
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
    }
  }, [sizeChoice, stock]);

  // チョイスを両方外したら、初期値に戻す
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (sizeChoice === '' && varietyChoice === '') {
      setVarieties(constVarieties);
      setSizes(constSizes);
    }
  }, [constSizes, constVarieties, sizeChoice, stock, varietyChoice]);

  // routerからunitIdを渡された時の処理
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (typeof router.query.unitId === 'string') {
      // stockにunitIdを含むunitがあるか確認
      if (!stock.units.has(router.query.unitId)) {
        //next.jsは同じpageの回遊はコンポーネントをunmountしない。なのでリセットしない限り前回の結果が画面に表示されたままである。
        //この処理を直感的でないため書きたくないが、stockがunitIdのunitを持っていないことはエッジケースなのでよしとしよう。
        setVarietyChoice('');
        setSizeChoice('');
        setUnitId(undefined);
        setSelectedUnit(undefined);
        return;
      }
      if (stock.tag === 'default') {
        setUnitId(Number(router.query.unitId));
      } else if (stock.tag === 'all') {
        const unit = stock.units.get(router.query.unitId);
        const varietyChoice = unit?.variety;
        const varietyKind = unit?.varietyKind;
        const sizeChoice = unit?.size;
        // selectedUnitをsetしなくてもchoiceさえsetしてしまえば、useEffectでselectedUnitをセットしてくれる
        setVarietyChoice(varietyChoice ?? '');
        setVarietyType(varietyKind ?? '');
        setSizeChoice(sizeChoice ?? '');
        setUnitId(Number(router.query.unitId));
      } else if (stock.tag === 'sizes') {
        const unit = stock.units.get(router.query.unitId);
        const sizeChoice = unit?.size;
        setSizeChoice(sizeChoice ?? '');
        setUnitId(Number(router.query.unitId));
      } else if (stock.tag === 'varieties') {
        const unit = stock.units.get(router.query.unitId);
        const varietyChoice = unit?.variety;
        setVarietyChoice(varietyChoice ?? '');
        setUnitId(Number(router.query.unitId));
      }
    }
  }, [router.query.unitId, stock]);

  /**
   *  その他の処理
   */
  // unitがsize又はallの時の処理
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (stock.tag === ('all' || 'sizes')) {
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
    }
  }, [stock]);

  // unitがveriety又はallの時の処理
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (stock.tag === ('all' || 'varieties')) {
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
    }
  }, [stock]);

  //  ユーザーのverityチョイスによってstockに利用可能か問い合わせ、pickerに渡すデータを更新する
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (stock.tag === 'all' && varietyChoice !== '' && sizeChoice === '') {
      //varietyのどのサイズがあるかstockに問い合わせる
      const varietiesFromStock = stock.varieties.get(varietyChoice);
      let availableSizeKeys: string[] = [];
      if (
        varietiesFromStock !== undefined &&
        varietiesFromStock.units.sizes !== undefined
      ) {
        varietiesFromStock.units.sizes.forEach((val, key) => {
          availableSizeKeys.push(key);
        });
      }

      //利用可能なsize以外disableにする
      if (availableSizeKeys.length > 0) {
        setSizes((prev) => {
          if (prev !== undefined) {
            const newSizes: SizeMap[] = prev.map((size) => ({
              ...size,
              // resetした時のために、selectedはfalseにする
              selected: false,
              disabled: !availableSizeKeys.includes(size.name),
            }));
            return newSizes;
          }
        });
      } else {
        setToast({
          status: 'error',
          title: 'お探しのアイテムは現在利用できません。',
        });
      }
    }
  }, [setToast, sizeChoice, stock, varietyChoice]);

  // ユーザーのsizeチョイスによってstockに利用可能か問い合わせ、pickerに渡すデータを更新する
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (stock.tag === 'all' && sizeChoice !== '' && varietyChoice === '') {
      //sizeのどのvarietyがあるかstockに問い合わせる
      const sizesFromStock = stock.sizes.get(sizeChoice);
      let availableVarietyKeys: string[] = [];
      if (
        sizesFromStock !== undefined &&
        sizesFromStock.units.varieties !== undefined
      ) {
        sizesFromStock.units.varieties.forEach((val, key) => {
          availableVarietyKeys.push(key);
        });
      }

      //利用可能なvariety以外disableにする
      if (availableVarietyKeys.length > 0) {
        setVarieties((prev) => {
          if (prev !== undefined) {
            const newVarieties: VarietyMap[] = prev.map((variety) => ({
              ...variety,
              selected: false,
              disabled: !availableVarietyKeys.includes(variety.name),
            }));
            return newVarieties;
          }
        });
      } else {
        setToast({
          status: 'error',
          title: 'お探しのアイテムは現在利用できません。',
        });
      }
    }
  }, [setToast, sizeChoice, stock, varietyChoice]);

  //  両方のチョイスが選択された時の処理verietyとsizeに渡すデータを再計算す
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (stock.tag === 'all' && varietyChoice !== '' && sizeChoice !== '') {
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
      setVarieties((prev) => {
        if (prev !== undefined) {
          const newVarieties: VarietyMap[] = prev.map((variety) => ({
            ...variety,
            disabled: !(variety.name === varietyChoice),
            selected: variety.name === varietyChoice,
          }));
          return newVarieties;
        }
      });
    }
  }, [sizeChoice, stock, varietyChoice]);

  // size verietyの選択からunitIdを検索する
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (stock.tag === 'all' && varietyChoice !== '' && sizeChoice !== '') {
      let result: number | undefined = undefined;
      stock.units.forEach((unit) => {
        if (unit.variety === varietyChoice && unit.size === sizeChoice) {
          result = unit.id;
        }
        //no-op
      });
      if (result === undefined) {
        setToast({
          status: 'error',
          title: 'お探しのアイテムは現在利用できません。',
        });
      } else {
        setUnitId(result);
      }
    }
  }, [setToast, sizeChoice, stock, varietyChoice]);

  // verietyのみの場合はvariety choiceが選択された時点でunitIdを検索する
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (stock.tag === 'varieties' && varietyChoice !== '') {
      let result: number | undefined = undefined;
      stock.units.forEach((unit) => {
        if (unit.variety === varietyChoice) {
          result = unit.id;
        }
        //no-op
      });
      if (result === undefined) {
        setToast({
          status: 'error',
          title: 'お探しのアイテムは現在利用できません。',
        });
      } else {
        setUnitId(result);
      }
    }
  }, [setToast, stock, varietyChoice]);

  //  sizesのみの場合はsize choiceが選択された時点でunitIdを検索する
  useEffect(() => {
    if (isInitStock(stock)) return;
    if (stock.tag === 'sizes' && sizeChoice !== '') {
      let result: number | undefined = undefined;

      stock.units.forEach((unit) => {
        if (unit.size === sizeChoice) {
          result = unit.id;
        }
        //no-op
      });

      if (result === undefined) {
        setToast({
          status: 'error',
          title: 'お探しのアイテムは現在利用できません。',
        });
      } else {
        setUnitId(result);
      }
    }
  }, [setToast, stock, sizeChoice]);

  /**
   * @param  {string} variety
   * @param  {string} type unitsがvariety typeを持っているので選択した際にvarietyのtypeを取得する
   */
  const handleVarietyChoice = useCallback(
    (variety: string, type: string) => {
      if (varietyChoice === variety) {
        // resetの処理
        setVarietyChoice('');
        setSelectedUnit(undefined);
        setUnitId(undefined);
      } else {
        setVarietyChoice(variety);
        setVarietyType(type);
      }
    },
    [varietyChoice]
  );

  const handleSizeChoice = useCallback(
    (size: string) => {
      if (sizeChoice === size) {
        // resetの処理
        setSizeChoice('');
        setSelectedUnit(undefined);
        setUnitId(undefined);
      } else {
        setSizeChoice(size);
      }
    },
    [sizeChoice]
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
    //ユーザーが選んだサイズをセットする関数
    handleSizeChoice,
    //size pickerに渡すdata
    sizes,
    //variety pickerに渡すdata
    varieties,
    //ユーザーがチョイスしたvariety
    varietyChoice,
    //varietyの種類
    varietyType,
    //ユーザーがチョイスしたsize
    sizeChoice,
    //ユーザーがチョイスしたunitIdによってunitの情報を表示する
    selectedUnit,
  };
};
