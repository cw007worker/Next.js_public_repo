import React, { useEffect } from 'react';
import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.config';
import { AppProps } from 'next/app';
import { useExcludeSsrCss } from 'hooks/useExcludeSsrCss';
import { Box, Button, ChakraProvider, Slide } from '@chakra-ui/react';
import theme from 'utils/theme';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from 'libs/stripe';
import { UserContextProvider } from 'context/userContext';
import { UIContextProvider } from 'context/uiContext';
import { init as SentryInit } from 'libs/setnry';
import { useGetMe } from 'hooks/useGetMe';
import { useChannelTalk } from 'hooks/useChannelTalk';
import { useRoutingHandler } from 'hooks/useRoutingHandler';
import { SearchHistoriesContextProvider } from 'context/searchHistoriesContext';
import { useGetItemSearchHistories } from 'hooks/useGetItemSearchHistories';
import { useTrackPageView } from 'hooks/useTrackPageView';
import { useOnboardingModal } from 'hooks/useOnboardingModal';
import { OnboardingMoalTemplate } from 'components/templates/OnboardingModal';

SentryInit();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { state: userState, refetch: refetchUser } = useGetMe();
  const onboardingModalstate = useOnboardingModal(userState);
  const {
    state: itemSearchHistoriesState,
    refetch: refetchItemSearchHistories,
  } = useGetItemSearchHistories();
  useExcludeSsrCss();
  useChannelTalk();
  useTrackPageView({ userState });

  // if (Component.displayName === 'Comingsoon') {
  //   return <Component {...pageProps} />;
  // }

  return (
    <UserContextProvider state={userState} refetch={refetchUser}>
      <SearchHistoriesContextProvider
        state={itemSearchHistoriesState}
        refetch={refetchItemSearchHistories}
      >
        <UIContextProvider>
          <ChakraProvider theme={theme} resetCSS>
            {/* FIXME: Element コンポーネントをここで読み込むのはパフォーマンス影響ありそう */}
            <Elements stripe={getStripe()}>
              <DefaultSeo {...SEO} />
              <Component {...pageProps} />
              <OnboardingMoalTemplate {...onboardingModalstate} />
            </Elements>
          </ChakraProvider>
        </UIContextProvider>
      </SearchHistoriesContextProvider>
    </UserContextProvider>
  );
};

export default MyApp;
