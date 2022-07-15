import { CancellationQuestionnaireTemplate } from 'components/templates/CancellationQuestionnaire';
import { useQuestionnairePage } from 'hooks/pages/cancellation/useQuestionnairePage';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';
import router from 'next/router';
import Loading from 'components/comingsoon/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';

const ContractCancellation = () => {
  const { pageState, back, layoutState, postQuestionnaireResultState } =
    useQuestionnairePage();

  return (
    <LayoutWithBack
      handleBack={() => router.back()}
      cartItemCount={layoutState.cartItemCount}
    >
      {pageState === undefined || pageState.type === 'loading' ? (
        <Loading />
      ) : pageState.type === 'error' ? (
        <ErrorFetchFaild
          message="アンケート情報の取得に失敗しました"
          includeSubMessage={true}
          linkProps={{ path: '/', text: 'ホームへ戻る' }}
        />
      ) : (
        <CancellationQuestionnaireTemplate
          questionnaire={pageState.data.cancelQuestionnaire}
          back={back}
          {...postQuestionnaireResultState}
        />
      )}
    </LayoutWithBack>
  );
};

export default ContractCancellation;
