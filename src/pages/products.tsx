import { useProductDetailPage } from 'hooks/pages/useProductDetailPage';
import { ProductDetailTemplate } from 'components/templates/ProductDetail';
import router from 'next/router';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';

const ProductDetail = () => {
  const state = useProductDetailPage();
  return (
    <LayoutWithBack
      handleBack={() => router.back()}
      cartItemCount={state.layoutState.cartItemCount}
    >
      <ProductDetailTemplate {...state} />
    </LayoutWithBack>
  );
};

export default ProductDetail;
