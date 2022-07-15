import { SignInTemplate } from 'components/templates/Auth/SignIn';
import { useSignInPage } from 'hooks/pages/useSignInPage';
import { LayoutForAuth } from 'components/organisms/Layout/forAuth';

/**
 * 本サービス用のログインページ
 */
const SignIn = () => {
  const state = useSignInPage();
  const signInWithPasswordState = state.signInWithPasswordState;

  return (
    <LayoutForAuth>
      <SignInTemplate {...signInWithPasswordState} />
    </LayoutForAuth>
  );
};

export default SignIn;
