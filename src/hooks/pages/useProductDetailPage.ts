import { useFetch } from 'hooks/useFetch';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { getProduct } from 'repositories/getProduct';
import { toProductDetail } from 'repositories/toViewModel/toProductDetail';
import {
  ProductDetailWithDefaultUnit,
  ProductDetailWithUniqueUnit,
} from 'type/viewModel/productDetail';
import { GetProductResponse } from 'type/response/getProduct';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { getProductSchema } from 'type/request/getProduct';
import Swiper from 'swiper';
import { useSwiper } from 'hooks/useSwiper';
import { useRouter } from 'next/router';
import { sentryLog } from 'libs/setnry';
import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import { MembershipGrade } from 'type/viewModel/me';

type INIT = undefined;

type LOADING = { type: 'loading' };

export type LOADED = {
  type: 'loaded';
  data: ProductDetailWithDefaultUnit | ProductDetailWithUniqueUnit;
};

type ERROR = { type: 'error'; message: string };

export type PageState = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  pageState: PageState;
  swiper: {
    setSwiperInstance: (swiper: Swiper) => void;
    nextSlide: () => void;
    prevSlide: () => void;
    toSlide: (index: number) => void;
    currentSlide: number;
    setCurrentSlide: (index: number) => void;
    slideLength: number;
    setSlideLength: (lenght: number) => void;
  };
  layoutState: LayoutState;
  membershipGrade: MembershipGrade;
};

export const useProductDetailPage = (): HookState => {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>(undefined);
  const swiper = useSwiper();
  const layoutState = useLayout();

  const fetcher = useCallback(() => {
    let parsed;
    try {
      parsed = getProductSchema.parse({ id: router.query.productId });
    } catch (err) {
      console.error(err);
      sentryLog(err);
      throw new Error('パラメーターが不正です。');
    }
    return getProduct({ id: parsed.id });
  }, [router.query.productId]);

  const { data } = useFetch<GetProductResponse>(
    fetcher,
    typeof router.query.productId === 'string'
  );

  const membershipGrade = useMemo(() => {
    return layoutState.membershipGrade;
  }, [layoutState]);

  useEffect(() => {
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
      return setPageState({
        type: 'loaded',
        data: toProductDetail(data.data),
      });
    }
    setPageState({
      type: 'error',
      message: '予期しないデータを取得しました',
    });
  }, [data]);

  return {
    pageState,
    swiper,
    layoutState,
    membershipGrade,
  };
};
