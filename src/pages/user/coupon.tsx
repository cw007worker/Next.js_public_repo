import { Layout } from 'components/organisms/Layout';
import { CouponTemplate } from 'components/templates/Coupon';
import { useCouponPage } from 'hooks/pages/useCouponPage';

const Coupon = () => {
  const { layoutState, ...rest } = useCouponPage();

  return (
    <Layout
      isMembership={layoutState.isMembership}
      name={layoutState.fullName}
      cartItemCount={layoutState.cartItemCount}
    >
      <CouponTemplate {...rest} />
    </Layout>
  );
};

export default Coupon;
