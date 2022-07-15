import { LayoutForAuth } from 'components/organisms/Layout/forAuth';
import { usePaymentPage } from 'hooks/pages/onboarding/usePaymentPage';
import { PaymentTemplate } from 'components/templates/Onboarding/Payment';
import { useOnboardingRoutingHandler } from 'hooks/pages/onboarding/useOnboardingRoutingHandler';

const PaymentPage = () => {
  useOnboardingRoutingHandler();
  const hookState = usePaymentPage();
  const pageState = hookState.pageState;

  return (
    <LayoutForAuth>
      <PaymentTemplate {...hookState} />
    </LayoutForAuth>
  );
};

export default PaymentPage;
