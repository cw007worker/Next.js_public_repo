import React from 'react';
import { TopTemplate } from 'components/templates/Top';
import { useTopPage } from 'hooks/pages/useTopPage';
import { BannerContent } from 'components/organisms/BannerContent';
import { bannerPageTopContent, bannerTopAppInstall } from 'utils/bannerManager';
import { useRefetchUser } from 'hooks/useRefetchUser';
import { LayoutWithBottomTab } from 'components/organisms/Layout/withBottomTab';
import { Container } from '@chakra-ui/react';

const Top = () => {
  useRefetchUser(); // ここのrefetchは必要か調べる。
  const state = useTopPage();

  return (
    <React.Fragment>
      {!state.isApp && (
        <Container maxW="container.sm">
          <BannerContent content={bannerTopAppInstall} ratio={4.6875} />
        </Container>
      )}
      <LayoutWithBottomTab
        isMembership={state.layoutState.isMembership}
        name={state.layoutState.fullName}
        cartItemCount={state.layoutState.cartItemCount}
        currentPage={state.layoutState.currentPage}
      >
        <TopTemplate {...state} />
      </LayoutWithBottomTab>
    </React.Fragment>
  );
};

export default Top;
