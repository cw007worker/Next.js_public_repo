import { useCallback } from 'react';
import { addNewCard } from 'repositories/addNewCard';
import { addNewCardSchema } from 'type/request/addNewCard';
import { FetchManageState } from 'type/util/fetchData';
import { useRequest } from 'hooks/useRequest';
import { sentryLog } from 'libs/setnry';

export type State = FetchManageState<{ status: number; message: null }>;

export const useAddNewCard = () => {
  const fetcher = useCallback((card_token: string) => {
    let parsed;
    try {
      parsed = addNewCardSchema.parse({ card_token });
    } catch (e) {
      console.error(e);
      sentryLog(e);
      throw new Error('パラメーターが不正です。');
    }
    return addNewCard(parsed);
  }, []);

  const { data: state, request } = useRequest(fetcher);

  return {
    state,
    request,
  };
};
