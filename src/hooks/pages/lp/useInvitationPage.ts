import { useAppState } from 'hooks/useAppState';
import { useEffect } from 'react';

export const useInvitationPage = () => {
  const { isApp } = useAppState()
  useEffect(() => {
    if (typeof window == 'undefined') return;

    window.location.href = 'https://apps.apple.com/jp/app/pantrii/id1600594589';
  }, []);

  return { isApp }
};
