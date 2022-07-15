import router from 'next/router';
import { auth } from 'libs/firebase/index';
import {
  useRestartOnboardingHandler,
  HookState as RestartOnboardingState,
} from 'hooks/useRestartOnboardingHandler';
import { sentryLog } from 'libs/setnry';

type FormValues = {
  email: string;
};

export type HookState = {
  restartOnboardingState: RestartOnboardingState;
  handleEmailSubmit: (data: FormValues, event: any) => void;
};

export const useComingsoonPage = (): HookState => {
  const restartOnboardingState = useRestartOnboardingHandler();

  const handleEmailSubmit = async (data: FormValues, event: any) => {
    event.preventDefault();
    const { email } = data;
    window.localStorage.setItem('emailForOnboarding', email);
    /**
     * emailがfirebaseに登録されているかどうかチェックする
     */
    let signInMethods;
    try {
      signInMethods = await auth().fetchSignInMethodsForEmail(email);
    } catch (error) {
      sentryLog(error);
      // FIXME: エラー握りつぶさないようにしたいが、一旦'onboarding'に飛ばすようにする。
      // onboarding/registerのメアド入力覧のdefault valuesに使用する
      router.push('/onboarding');
      return;
    }

    if (signInMethods.length > 0) {
      router.push('/auth/signIn/onboarding');
    } else {
      // onboarding/registerのメアド入力覧のdefault valuesに使用する
      router.push('/onboarding');
    }
  };

  return {
    restartOnboardingState,
    handleEmailSubmit,
  };
};
