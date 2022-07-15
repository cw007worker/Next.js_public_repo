import { LayoutForAuth } from 'components/organisms/Layout/forAuth';
import { OnboardingFloatingButton } from 'components/organisms/OnboardingFloatingButton';
import { OnboadingTemplate } from 'components/templates/Onboarding';
import { useOnboardingPage } from 'hooks/pages/useOnboardingPage';
import { Fragment } from 'react';
const Onboarding = () => {
  const state = useOnboardingPage();

  return (
    <Fragment>
      <LayoutForAuth pb="140px">
        <OnboadingTemplate {...state} />
      </LayoutForAuth>
      <OnboardingFloatingButton />
    </Fragment>
  );
};

export default Onboarding;
