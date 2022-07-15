import router from 'next/router';
import { useRankingPage } from 'hooks/pages/useRankingPage';
import { RankingTemplate } from 'components/templates/Ranking';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';

const Ranking = () => {
  const { layoutState, productListState } = useRankingPage();

  return (
    <LayoutWithBack
      handleBack={() => router.back()}
      cartItemCount={layoutState.cartItemCount}
    >
      <RankingTemplate {...productListState} />
    </LayoutWithBack>
  );
};

export default Ranking;
