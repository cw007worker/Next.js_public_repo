import { useCallback, useMemo } from 'react';
import { useRequest } from './useRequest';
import { getCategoryBrandsSchema } from 'type/request/getCategoryBrands';
import { sentryLog } from 'libs/setnry';
import { getCategoryBrands } from 'repositories/getCategoryBrands';
import { createSuccessState, isSuccessState } from 'type/util/fetchData';
import { toCategoryBrands } from 'repositories/toViewModel/toCategoryBrands';

export const useGetCategoryBrands = () => {
  const fetcher = useCallback((id: string) => {
    let parsed;
    try {
      parsed = getCategoryBrandsSchema.parse({ id: id });
    } catch (err) {
      console.error(err);
      sentryLog(err);
      throw new Error('パラメーターが不正です。');
    }
    return getCategoryBrands(parsed);
  }, []);

  const { request, data } = useRequest(fetcher);

  const formatted = useMemo(() => {
    return isSuccessState(data)
      ? createSuccessState(toCategoryBrands(data.data))
      : data;
  }, [data]);

  return {
    request,
    data: formatted,
  };
};
