import { getQuestionnaire } from 'repositories/getQuestionnaire';
import {
  GetQuestionnaireResponse,
  getQuestionnaireSchema,
} from 'type/response/getQuestionnaire';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { toQuestionnaire } from 'repositories/toViewModel/toQuestionnaire';
import { useFetch } from 'hooks/useFetch';
import { sentryLog } from 'libs/setnry';
import { useMemo, useState, useEffect, useCallback } from 'react';
import {
  usePostQuestionnaireResult,
  HookState as PostQuestionnaireResultHookState,
} from 'hooks/usePostQuestionnaireResult';
import { CancelQuestionnaire } from 'type/viewModel/cancelQuestionnaire';
import { useLayout } from 'hooks/useLayout';
import { useRouter } from 'next/router';

type INIT = undefined;
type LOADING = { type: 'loading' };
type LOADED = {
  type: 'loaded';
  data: CancelQuestionnaire;
};
type ERROR = { type: 'error'; message: string };
type PageState = INIT | LOADED | ERROR | LOADING;

export const useQuestionnairePage = () => {
  const router = useRouter();
  const layoutState = useLayout();
  const [pageState, setPageState] = useState<PageState>(undefined);
  const cancelQuetionnaireId = Number(
    process.env.NEXT_PUBLIC_CANCEL_QUESTIONNAIRE_ID
  );

  const membershipId = useMemo(() => {
    return router.query.membershipId as string;
  }, [router, router.query, router.query.membershipId]);

  const fetcher = useCallback(() => {
    return getQuestionnaire({ id: cancelQuetionnaireId });
  }, [cancelQuetionnaireId]);

  const { data } = useFetch<GetQuestionnaireResponse>(fetcher);

  const questionnaire = useMemo(() => {
    if (pageState?.type == 'loaded') {
      return pageState.data.cancelQuestionnaire;
    }
  }, [pageState]);

  const postQuestionnaireResultState = usePostQuestionnaireResult({
    // @ts-ignore TODO: 直す
    questionnaire: questionnaire,
    membershipId: membershipId,
  });

  const back = () => {
    router.push('/user/membership/setting');
  };

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
        data: toQuestionnaire(data.data),
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
    postQuestionnaireResultState,
    back,
  };
};
