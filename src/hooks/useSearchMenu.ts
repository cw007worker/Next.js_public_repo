import { useLayout, HookState as LayoutHookState } from 'hooks/useLayout';
import { useEffect, useMemo, useState } from 'react';
import { ExpandedIndex } from '@chakra-ui/react';
import { useUIContext, useUIUpdateContext } from 'context/uiContext';
import { InitialState, uiActionTypes } from 'reducer/ui';
import { ItemSearchHistory } from 'type/viewModel/common/itemSearchHistory';
import { useSearchHistoriesContext } from 'context/searchHistoriesContext';
import { isSuccessState } from 'type/util/fetchData';
import { useGetTags } from 'hooks/useGetTags';
import { FetchManageState } from 'type/util/fetchData';
import { Tags } from 'type/viewModel/tags';

export type HookState = {
  handleToggleAccordionIndex: (indexes: ExpandedIndex) => void;
  accordionIndex: ExpandedIndex | undefined;
  uiState: InitialState | undefined;
  updateUi: any;
  itemSearchHistories: ItemSearchHistory[] | undefined;
  tagsForSearch: FetchManageState<Tags>;
};

export const useSearchMenu = () => {
  const updateUi = useUIUpdateContext();
  const uiState = useUIContext();
  const handleToggleAccordionIndex = (indexes: ExpandedIndex) => {
    updateUi({
      type: uiActionTypes.search.SET_ACCORDION_INDEX,
      payload: indexes,
    });
    // setAccordionIndex(indexes);
  };
  const itemSearchHistoriesState = useSearchHistoriesContext();
  const itemSearchHistories = useMemo(
    () =>
      isSuccessState(itemSearchHistoriesState)
        ? itemSearchHistoriesState.data.data
        : undefined,
    [itemSearchHistoriesState]
  );
  const { data: tagsForSearch } = useGetTags();

  return {
    handleToggleAccordionIndex,
    accordionIndex: uiState?.search.accordionIndex,
    uiState,
    updateUi,
    itemSearchHistories,
    tagsForSearch,
  };
};
