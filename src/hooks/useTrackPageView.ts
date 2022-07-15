import { VFC, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { pushDataLayer } from 'libs/gtm/analytics';
import { useUserContext } from 'context/userContext';
import {
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import { State as UserState } from 'hooks/useGetMe';
import { Me } from 'type/viewModel/me';

type Props = {
  userState: UserState;
};

export const useTrackPageView = (props: Props) => {
  const { userState } = props;
  const once = useRef(false);
  const { asPath, basePath, events } = useRouter();

  const pushPageView = useCallback((url) => {
    if (isInitState(userState)) return false;
    if (isLoadingState(userState)) return false;

    const user = userState.data
    if (user !== undefined) {
      pushDataLayer({
        event: 'page_view',
        page_location: url,
        user_id: user.id,
        is_membership: user.isMembership,
        canceled_membership: user.canceledMembership,
        will_cancel_membership: user.willCancelMembership,
      });
    } else {
      pushDataLayer({
        event: 'page_view',
        page_location: url,
      });
    }
  }, [userState]);

  /**
   * ユーザー情報の取得が完了するまでpageViewの送信を待つ
   */
    const prepared = useMemo(() => {
      if (isInitState(userState)) return false;
      if (isLoadingState(userState)) return false;
      
      return true;
    }, [userState])

  /**
   * 初回ロード（アクセス）時の処理
   */
  useEffect(() => {
    if (!prepared) return;

    const url = `${basePath}${asPath}`.replace(/\/$|\/\?/, (matched) =>
      matched === '/?' ? '?' : ''
    );

    !once.current && pushPageView(url);
    once.current = true;
  }, [pushPageView, basePath, asPath, prepared]);


  /**
   * ページ遷移時（urlに変更があった時）の処理
   */
  useEffect(() => {
    if (!prepared) return;

    events.on('routeChangeComplete', pushPageView);

    return () => {
      events.off('routeChangeComplete', pushPageView);
    };
  }, [events, pushPageView, prepared]);

  return null;
};
