import { useRouter } from 'next/router';
import { cancelMembership } from '../../../repositories/cancelMembership';
import React, { useEffect, useMemo, useState } from 'react';
import { useToast } from 'hooks/useToast';
import { getCancelMembershipInfo } from 'repositories/getCancelMembershipInfo';
import { useFetch } from 'hooks/useFetch';
import { GetMembershipInfoResponse } from 'type/response/getMembershipInfo';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import { toCancelMembershipInfo } from 'repositories/toViewModel/toCancelMembershipInfo';
import { CancelMembershipInfo } from 'type/viewModel/cancelMembershipInfo';

type INIT = undefined;

type LOADING = { type: 'loading' };

export type LOADED = {
  type: 'loaded';
  data: CancelMembershipInfo;
};

type ERROR = { type: 'error'; message: string };

export type PageState = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  pageState: PageState;
  layoutState: LayoutState;
  cancelComplete: () => void;
  back: () => void;
};

export const useConfirmPage = () => {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>(undefined);
  const layoutState = useLayout();
  const toast = useToast();

  const membershipId = useMemo(() => {
    return router.query.membershipId as string;
  }, [router, router.query, router.query.membershipId]);

  /**
   * 「解約手続き完了」ボタンを押した時の処理
   */
  const cancelComplete = () => {
    cancelMembership(Number(membershipId))
      .then((_) => {
        router.push('/cancellation/completed');
      })
      .catch((e) => {
        toast({ title: 'キャンセルが失敗しました。' });
      });
  };

  /**
   * 「戻る」ボタンを押した時の処理
   */
  const back = () => {
    router.push('/user/membership/setting');
  };

  const fetcher = React.useCallback(() => {
    return getCancelMembershipInfo(Number(membershipId));
  }, [membershipId]);

  const { data } = useFetch<GetMembershipInfoResponse>(fetcher);

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
        data: toCancelMembershipInfo(data.data),
      });
    }
    setPageState({
      type: 'error',
      message: '予期しないデータを取得しました',
    });
  }, [data]);

  return {
    pageState,
    layoutState,
    cancelComplete,
    back,
  };
};
