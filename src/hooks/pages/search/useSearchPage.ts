import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import {
  useGetUnitsBySearch,
  HookState as GetUnitsBySearchState,
} from 'hooks/useGetUnitsBySearch';
import {
  useSearchMenu,
  HookState as SearchMenuState,
} from 'hooks/useSearchMenu';
import {
  useSearchForm,
  HookState as searchFormState,
} from 'hooks/useSearchForm';
import router from 'next/router';

export type HookState = {
  layoutState: LayoutState;
  unitsBySearchState: GetUnitsBySearchState;
  searchMenuState: SearchMenuState;
  searchFormState: searchFormState;
  handleBack: () => void;
};

export const useSearchPage = (): HookState => {
  const unitsBySearchState = useGetUnitsBySearch();
  const layoutState = useLayout();
  const searchFormState = useSearchForm({
    defaultKeyword: unitsBySearchState.keyword,
  });
  const searchMenuState = useSearchMenu();

  const handleBack = () => {
    router.push('/search/menu');
  };

  return {
    layoutState,
    unitsBySearchState,
    searchMenuState,
    searchFormState,
    handleBack,
  };
};
