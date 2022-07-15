import { useCallback, useMemo } from 'react';
import { useRequest } from './useRequest';
import { getBrandCategoriesSchema } from 'type/request/getBrandCategories';
import { sentryLog } from 'libs/setnry';
import { getBrandCategories } from 'repositories/getBrandCategories';
import { createSuccessState, isSuccessState } from 'type/util/fetchData';
import { GetBrandCategoriesResponse } from 'type/response/getBrandCategories';
import { toBrandCategories } from 'repositories/toViewModel/toBrandCategories';

export const useGetBrandCategories = () => {
  const fetcher = useCallback((id: string) => {
    let parsed;
    try {
      parsed = getBrandCategoriesSchema.parse({ id: id });
    } catch (err) {
      console.error(err);
      sentryLog(err);
      throw new Error('パラメーターが不正です。');
    }
    return getBrandCategories(parsed);
  }, []);

  const { request, data } = useRequest<GetBrandCategoriesResponse>(fetcher);

  const formatted = useMemo(() => {
    return isSuccessState(data)
      ? createSuccessState(toBrandCategories(data.data))
      : data;
  }, [data]);

  return {
    request,
    data: formatted,
  };
};
