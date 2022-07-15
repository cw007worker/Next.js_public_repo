import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from 'libs/firebase';

export const useAuthObserver = () => {
  const router = useRouter();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        router.push('/comingsoon/mypage');
      } else {
        router.push('/comingsoon/auth/signIn');
      }
    });
  }, []);
};
