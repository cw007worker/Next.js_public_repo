import { GuaranteeTemplate } from 'components/templates/Guide/Guarantee';
import router from 'next/router';
import { LayoutForGuide } from 'components/organisms/Layout/forGuide';
import { useLayout } from 'hooks/useLayout';

const SefeSecure = () => {
  const layoutState = useLayout();

  return (
    <LayoutForGuide
      handleBack={() => router.back()}
      cartItemCount={layoutState.cartItemCount}
    >
      <GuaranteeTemplate></GuaranteeTemplate>
    </LayoutForGuide>
  );
};

export default SefeSecure;
