import { LayoutForAuth } from 'components/organisms/Layout/forAuth';
import { usePlanPage } from 'hooks/pages/onboarding/usePlanPage';
import { OnboardingPlanTemplate } from 'components/templates/Onboarding/Plan';
import { useOnboardingRoutingHandler } from 'hooks/pages/onboarding/useOnboardingRoutingHandler';

const Plan = () => {
  // useOnboardingRoutingHandler();
  const state = usePlanPage();

  return (
    <LayoutForAuth>
      <OnboardingPlanTemplate {...state} />
    </LayoutForAuth>
  );
};

export default Plan;
