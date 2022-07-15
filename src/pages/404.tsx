import { Layout } from 'components/organisms/Layout';
import { ErrorTemplate } from 'components/templates/Error';
import { useLayout } from 'hooks/useLayout';

const Custom404 = () => {
  const { isMembership, fullName, cartItemCount } = useLayout();
  return (
    <Layout
      isMembership={isMembership}
      name={fullName}
      cartItemCount={cartItemCount}
    >
      <ErrorTemplate />
    </Layout>
  );
};

export default Custom404;
