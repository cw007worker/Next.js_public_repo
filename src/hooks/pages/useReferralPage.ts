import React from 'react';
import { useToast } from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import { ReferralInfo } from 'type/viewModel/referralInfo';
import { getReferralInfo } from 'repositories/getReferralInfo';
import { GetReferralInfoResponse } from 'type/response/getReferralInfo';
import { toReferralInfo } from 'repositories/toViewModel/toReferralInfo';
import { createShareMessageForReferral } from 'utils/share';

type INIT = undefined;
type LOADING = { type: 'loading' };
export type LOADED = {
  type: 'loaded';
  data: ReferralInfo;
};
type ERROR = { type: 'error'; message: string };
export type PageState = INIT | LOADED | ERROR | LOADING;

export type HookState = {
  layoutState: LayoutState;
  pageState: PageState;
  twitterShareLink: string;
  lineShareLink: string;
  handleCopy: () => void;
};
export const useReferralPage = () => {
  const [pageState, setPageState] = React.useState<PageState>(undefined);
  const layoutState = useLayout();
  const setToast = useToast();
  const [shareMessage, setShareMessage] = React.useState('');
  const twitterShareLink = `https://twitter.com/intent/tweet?url=${shareMessage}`;
  const lineShareLink = `https://line.me/R/msg/text/?${shareMessage}`;

  const handleCopy = () => {
    const text: any = document.getElementById('code');
    text.select();
    document.execCommand('Copy');
    if (window.getSelection) {
      //@ts-ignore TODO: 修正しよう
      window.getSelection().removeAllRanges();
    }
    setToast({ status: 'success', title: 'コピーしました。' });
  };

  const fetcher = React.useCallback(() => {
    return getReferralInfo();
  }, []);

  const { data } = useFetch<GetReferralInfoResponse>(fetcher);

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
      const formattedData = toReferralInfo(data.data);
      setShareMessage(
        createShareMessageForReferral(formattedData.referralCode)
      );
      return setPageState({
        type: 'loaded',
        data: formattedData,
      });
    }
    setPageState({
      type: 'error',
      message: '予期しないデータを取得しました',
    });
  }, [data]);

  React.useEffect(() => {
    if (pageState !== undefined && pageState.type === 'error') {
      setToast({ status: 'error', title: pageState.message });
    }
  }, [pageState, setToast]);

  return {
    layoutState,
    pageState,
    twitterShareLink,
    lineShareLink,
    handleCopy,
  };
};
