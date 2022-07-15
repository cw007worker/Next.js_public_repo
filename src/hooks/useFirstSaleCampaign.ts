import {
  usePartialProducts,
  HookState as PartialUnitsHookState,
} from './usePartialProducts';
import React from 'react';
import { FIRST_SALE_UNITS } from 'constants/partialUnits';

export type HookState = {
  tagId: number;
  state: PartialUnitsHookState;
};

export const useFirstSaleCampaign = (): HookState => {
  const tagId = Number(process.env.NEXT_PUBLIC_SPRING_SALE_TAG_ID);
  const state = usePartialProducts(FIRST_SALE_UNITS.springSale);

  return {
    tagId,
    state,
  };
};
