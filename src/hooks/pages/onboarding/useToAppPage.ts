import { useAppState } from 'hooks/useAppState';

export const useToAppPage = () => {
  const { isApp } = useAppState();

  return { isApp };
};
