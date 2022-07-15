import { useLayout, HookState as LayoutHookState } from 'hooks/useLayout';
import { useEffect, useState } from 'react';
import {
  useGetUnitsBySearch,
  HookState as GetUnitsBySearchState,
} from 'hooks/useGetUnitsBySearch';
import {
  useSearchMenu,
  HookState as SearchMenuState,
} from 'hooks/useSearchMenu';
import { useUpdateSearchHistoriesContext } from 'context/searchHistoriesContext';
import { useRefetchSearchItemHistories } from 'hooks/useRefetchSearchItemHistories';

export type HookState = {
  layoutState: LayoutHookState;
  unitsBySearchState: GetUnitsBySearchState;
  searchMenuState: SearchMenuState;
};

export const useSearchMenuPage = () => {
  const unitsBySearchState = useGetUnitsBySearch();
  const layoutState = useLayout();
  const searchMenuState = useSearchMenu();
  useRefetchSearchItemHistories();

  return {
    layoutState,
    unitsBySearchState,
    searchMenuState,
  };
};
