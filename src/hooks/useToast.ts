import { useToast as _useToast, UseToastOptions } from '@chakra-ui/toast';
import { useCallback } from 'react';

export const useToast = () => {
  const toast = _useToast();
  const setToast = useCallback(
    (
      options: Omit<UseToastOptions, 'position' | 'duration' | 'isClosable'>
    ) => {
      return toast({
        ...options,
        duration: 5000,
        position: 'bottom-left',
        isClosable: true,
      });
    },
    [toast]
  );
  return setToast;
};
