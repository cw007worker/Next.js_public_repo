import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { auth } from 'libs/firebase';

export const useAuthSignOut = () => {
  const router = useRouter();

  const signOut = async (event: any) => {
    event.preventDefault();
    auth()
      .signOut()
      .then(() => {
        Cookies.remove('authorization_token');
        router.push('/comingsoon/auth/signIn');
      })
      .catch((error) => {
        console.error(error);
        // TODO: Error Handling
      });
  };
  return { signOut };
};
