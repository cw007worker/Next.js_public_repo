import { useOnboardingRoutingHandler } from 'hooks/pages/onboarding/useOnboardingRoutingHandler';
import { usePersonalizePage } from 'hooks/pages/onboarding/usePersonalizePage';
import { PersonalizeTempllate } from 'components/templates/Onboarding/Personalize';
import { LayoutForAuth } from 'components/organisms/Layout/forAuth';

const Personalize = () => {
  useOnboardingRoutingHandler();
  const state = usePersonalizePage();
  return (
    <LayoutForAuth>
      <PersonalizeTempllate {...state} />
    </LayoutForAuth>
  );
};

export default Personalize;
