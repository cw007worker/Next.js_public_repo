import { LayoutForAuth } from 'components/organisms/Layout/forAuth';
import { RegisterTemplate } from 'components/templates/Onboarding/Register';
import { useRegisterPage } from 'hooks/pages/onboarding/useRegisterPage';
import { useOnboardingRoutingHandler } from 'hooks/pages/onboarding/useOnboardingRoutingHandler';

const RegisterPage = () => {
  const state = useRegisterPage();
  useOnboardingRoutingHandler();

  return (
    <LayoutForAuth>
      <RegisterTemplate {...state} />
    </LayoutForAuth>
  );
};

export default RegisterPage;
