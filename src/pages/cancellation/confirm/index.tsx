import { CancellationConfirmTemplate } from 'components/templates/CancellationConfirm';
import { useConfirmPage } from 'hooks/pages/cancellation/useConfirmPage';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';
import router from 'next/router';
import { useLayout } from 'hooks/useLayout';

const CancellationConfirm = () => {
  const { layoutState, ...state } = useConfirmPage();

  return (
    <LayoutWithBack
      handleBack={() => router.back()}
      cartItemCount={layoutState.cartItemCount}
    >
      {state.pageState !== undefined && state.pageState.type === 'loaded' ? (
        <CancellationConfirmTemplate
          membership={state.pageState.data}
          back={state.back}
          cancelComplete={state.cancelComplete}
        />
      ) : state.pageState !== undefined && state.pageState.type === 'error' ? (
        <ErrorFetchFaild
          message="データの取得に失敗しました"
          includeSubMessage={true}
          linkProps={{ path: '/', text: 'ホームへ戻る' }}
        />
      ) : (
        <Loading />
      )}
    </LayoutWithBack>
  );
};

export default CancellationConfirm;
