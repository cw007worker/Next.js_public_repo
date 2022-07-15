import { useEffect, useRef } from 'react';
import { useUpdateUserContext } from 'context/userContext';

export const useRefetchUser = () => {
  const refetchUser = useUpdateUserContext();
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      refetchUser();
    }
  }, [refetchUser]);
};
