import CancelCompletedTemplate from 'components/templates/CancelCompleted';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';
import router from 'next/router';
import { useLayout } from 'hooks/useLayout';
import { useCompletedPage } from 'hooks/pages/cancellation/useCompletedPage';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { Loading } from 'components/molecules/Loading';

const CancellationCompleted = () => {
  const layoutState = useLayout();
  const state = useCompletedPage();
  return (
    <LayoutWithBack
      handleBack={() => router.back()}
      cartItemCount={layoutState.cartItemCount}
    >
      {state.membershipInfo.state === undefined ||
      state.membershipInfo.state?.type == 'loading' ? (
        <Loading />
      ) : state.membershipInfo.state?.type === 'loaded' ? (
        <CancelCompletedTemplate {...state.membershipInfo.state?.data} />
      ) : (
        <ErrorFetchFaild
          message="解約処理は完了しましたが、その情報の取得に失敗しました"
          includeSubMessage={true}
          linkProps={{ path: '/', text: 'ホームへ戻る' }}
        />
      )}
    </LayoutWithBack>
  );
};

export default CancellationCompleted;
