import {
  useGetProductsForPersonalize,
  State as getProductsState,
} from 'hooks/useGetProductsForPersonalize';
import { usePostProductIdsForPersonalize } from 'hooks/usePostProductIdsForPersonalize';
import { useToast } from 'hooks/useToast';
import router from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import {
  isFailState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { useUserContext } from 'context/userContext';
import { useAppState } from 'hooks/useAppState';

export type HookState = {
  getProductsState: getProductsState;
  onSubmit: () => void;
  isSubmitting: boolean;
  canSubmit: boolean;
  canPersonalizing: boolean;
  processStatus: ProcessStatus;
  handleProductId: (id: string) => void;
  firstName: string | undefined;
  productIds: string[] | [];
};

const SELECT_QUANTITY = 3;

const PROCESS_TIME = 4000;

type ProcessStatus = 'processing' | 'finished' | 'none';

export const usePersonalizePage = (): HookState => {
  const user = useUserContext();
  const getProductsState = useGetProductsForPersonalize();
  const [productIds, setProductIds] = useState<string[] | []>([]);
  const { state: postProducsIdsState, request } =
    usePostProductIdsForPersonalize();
  const setToast = useToast();
  const [processStatus, setProcessStatus] = useState<ProcessStatus>('none');
  const { isApp } = useAppState();

  const firstName = useMemo(
    () =>
      isSuccessState(user)
        ? user.data.firstName !== '' && user.data.firstName !== undefined
          ? user.data.firstName
          : undefined
        : undefined,
    [user]
  );

  const isSubmitting = useMemo(() => {
    return isLoadingState(postProducsIdsState);
  }, [postProducsIdsState]);

  const canSubmit = useMemo(() => {
    return productIds.length === SELECT_QUANTITY;
  }, [productIds]);

  const onSubmit = () => {
    if (productIds.length < SELECT_QUANTITY) return;
    request(productIds);
  };

  const handleProductId = (id: string) => {
    // 三つ選ばれている　かつ　選んだidがproductIdsにないときはリターン
    if (
      productIds.length >= SELECT_QUANTITY &&
      !(productIds as string[]).includes(id)
    )
      return;
    if (productIds.length !== 0 && (productIds as string[]).includes(id)) {
      return setProductIds((prev) => {
        const newArray = prev.filter((value) => value !== id);
        return newArray;
      });
    }
    setProductIds([...productIds, id]);
  };

  // postが完了したらprocessingモードに移行するためのフラグ
  const canPersonalizing = useMemo(() => {
    return isSuccessState(postProducsIdsState);
  }, [postProducsIdsState]);

  useEffect(() => {
    if (isFailState(postProducsIdsState)) {
      setToast({
        status: 'error',
        title: '送信に失敗しました。',
      });
    }
  }, [postProducsIdsState, setToast]);

  useEffect(() => {
    if (!canPersonalizing) return;
    setProcessStatus('processing');
    const timer = setTimeout(() => {
      setProcessStatus('finished');
    }, PROCESS_TIME);
    return () => {
      clearTimeout(timer);
    };
  }, [canPersonalizing]);

  // パーソナライズが終わったらrootへ飛ばす
  useEffect(() => {
    if (processStatus === 'finished') {
      if (isApp) {
        router.push('/');
      } else {
        // webの場合は、アプリインストールへ誘導
        router.push('/onboarding/toApp');
      }
    }
  }, [processStatus, isApp]);

  return {
    getProductsState,
    onSubmit,
    isSubmitting,
    handleProductId,
    firstName,
    productIds,
    canSubmit,
    canPersonalizing,
    processStatus,
  };
};
