import { SefeSecureTemplate } from 'components/templates/Guide/SefeSecure';
import { LayoutForGuide } from 'components/organisms/Layout/forGuide';
import router from 'next/router';
import { useLayout } from 'hooks/useLayout';

const SefeSecure = () => {
  const layoutState = useLayout();

  return (
    <LayoutForGuide
      handleBack={() => router.back()}
      cartItemCount={layoutState.cartItemCount}
    >
      <SefeSecureTemplate></SefeSecureTemplate>
    </LayoutForGuide>
  );
};

export default SefeSecure;
