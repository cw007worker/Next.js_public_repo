import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import router from 'next/router';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';
import { ReferralTemplate } from 'components/templates/Referral';
import { useReferralPage } from 'hooks/pages/useReferralPage';
import { LayoutWithBottomTab } from 'components/organisms/Layout/withBottomTab';

const Referral = () => {
  const {
    layoutState,
    pageState,
    twitterShareLink,
    lineShareLink,
    handleCopy,
  } = useReferralPage();

  return (
    <LayoutWithBottomTab
      isMembership={layoutState.isMembership}
      name={layoutState.fullName}
      cartItemCount={layoutState.cartItemCount}
      currentPage={layoutState.currentPage}
    >
      {pageState === undefined || pageState?.type === 'loading' ? (
        <Loading />
      ) : pageState.type === 'error' ? (
        <ErrorFetchFaild
          message="情報が取得できませんでした。"
          includeSubMessage={true}
          linkProps={{ path: '/', text: 'ホームへ戻る' }}
        />
      ) : (
        <ReferralTemplate
          referralInfo={pageState.data}
          twitterShareLink={twitterShareLink}
          lineShareLink={lineShareLink}
          handleCopy={handleCopy}
        />
      )}
    </LayoutWithBottomTab>
  );
};

export default Referral;
