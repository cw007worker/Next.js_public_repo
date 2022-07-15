import { useRouter } from 'next/router';
import { useMemo } from 'react';

export type Query = {
  /**
   * @default recommended
   */
  sort?: '-created_at' | 'created_at' | '-price' | 'price' | 'recommended';
  brand_ids?: string;
  category_ids?: string;
  /**
   * @default false
   */
  displayColor?: 'true' | 'false';
};

export const defaultPage = 1;
export const defaultQuantity = 24;
export const defaultSort = {
  key: 'recommended',
  value: 'おすすめ順',
};
export const defaultDisplayColor = 'false';

export type HookState = {
  reset: () => void;
  handlePushQuery: (query: Query) => void;
  query: Query;
  isReady: boolean;
};
export const useQuery = () => {
  const router = useRouter();

  //@see https://zenn.dev/kiyokiyoabc/articles/d3a8464367094a
  const isReady = useMemo(() => {
    return router.isReady;
  }, [router.isReady]);

  // {foo: undefined}とするとqueryをdeleteできる
  const handlePushQuery = (query: Query) => {
    router.query = {
      ...router.query,
      ...query,
    };
    router.push(router);
  };

  const reset = () => {
    router.query = {};
    router.push(router);
  };

  const query = useMemo(() => {
    return router.query as Query;
  }, [router.query]);

  return {
    reset,
    handlePushQuery,
    query,
    isReady,
  };
};
