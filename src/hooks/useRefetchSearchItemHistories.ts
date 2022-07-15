import { useEffect, useRef } from 'react';
import { useUpdateSearchHistoriesContext } from 'context/searchHistoriesContext';

export const useRefetchSearchItemHistories = () => {
  const refetchSearchHistories = useUpdateSearchHistoriesContext();
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      refetchSearchHistories();
    }
  }, [refetchSearchHistories]);
};
