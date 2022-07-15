import React, { useMemo } from 'react';
import { useToast } from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import { getUserInfo } from 'repositories/getUserInfo';
import { GetUserInfoResponse } from 'type/response/getUserInfo';
import { toUserInfo } from 'repositories/toViewModel/toUserInfo';
import { UserInfo } from 'type/viewModel/userInfo';
import { bannerTopContentsForGrid } from './../../utils/bannerManager';
import { BannerContents } from 'type/common/bannerContent';
import {
  useMembershipBenefit,
  HookState as MembershipBenefitState,
} from 'hooks/useMembershipBenefit';
import { MembershipBenefit } from 'constants/membershipBenefits';
import { MembershipGrade } from 'type/viewModel/me';

type INIT = undefined;

type LOADING = { type: 'loading' };

export type LOADED = {
  type: 'loaded';
  data: UserInfo;
};

type ERROR = { type: 'error'; message: string };

type PageState = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  pageState: PageState;
  layoutState: LayoutState;
  membershipGrade: MembershipGrade;
  bannerContentsForGrid: BannerContents;
  membershipBenefitList: MembershipBenefit[] | undefined;
};

export const useUserPage = () => {
  const [pageState, setPageState] = React.useState<PageState>(undefined);
  const layoutState = useLayout();
  const setToast = useToast();
  const bannerContentsForGrid = bannerTopContentsForGrid;
  const membershipBenefitList = useMembershipBenefit();

  const membershipGrade = useMemo(() => {
    return layoutState.membershipGrade;
  }, [layoutState]);

  const fetcher = React.useCallback(() => {
    return getUserInfo();
  }, []);

  const { data } = useFetch<GetUserInfoResponse>(fetcher);

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
      return setPageState({
        type: 'loaded',
        data: toUserInfo(data.data),
      });
    }
    setPageState({
      type: 'error',
      message: '予期しないデータを取得しました',
    });
  }, [data]);

  // NOTE: エラーメッセージ（特に認証切れエラー）が鬱陶しいので一旦コメントアウト
  // React.useEffect(() => {
  //   if (pageState !== undefined && pageState.type === 'error') {
  //     setToast({ status: 'error', title: pageState.message });
  //   }
  // }, [pageState, setToast]);

  return {
    pageState,
    layoutState,
    membershipGrade,
    bannerContentsForGrid,
    membershipBenefitList,
  };
};
