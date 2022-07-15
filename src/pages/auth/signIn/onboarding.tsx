import { SignInOnboardingTemplate } from 'components/templates/Auth/SignIn/onboarding';
import { useSignInOnboardingPage } from 'hooks/pages/useSignInOnboardingPage';
import { LayoutForAuth } from 'components/organisms/Layout/forAuth';

/**
 * Onboarding離脱したユーザー向けのログインページ
 */
const SignInOnboarding = () => {
  const state = useSignInOnboardingPage();

  return (
    <LayoutForAuth>
      <SignInOnboardingTemplate {...state} />
    </LayoutForAuth>
  );
};

export default SignInOnboarding;
