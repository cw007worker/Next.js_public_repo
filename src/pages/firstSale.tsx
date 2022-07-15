import { Layout } from 'components/organisms/Layout';
import { useLayout } from 'hooks/useLayout';
import { ClosePageTemplate } from 'components/templates/Close';

const FirstSale = () => {
  const state = useLayout();

  return (
    <Layout
      isMembership={state.isMembership}
      name={state.fullName}
      cartItemCount={state.cartItemCount}
    >
      <ClosePageTemplate
        message="初売りキャンペーンは終了しました"
        subMessage="ご好評いただいた初売りキャンペーンは終了しました🙇🏻‍♂️ キャンペーンは定期的に開催予定ですのでまたの機会の是非ご利用くださいませ🙋🏻‍♀️"
      />
    </Layout>
  );
};

export default FirstSale;
