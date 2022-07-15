import { GetItemSearchHistoriesResponse } from 'type/response/getItemSearchHistories';
import { ItemSearchHistory } from 'type/response/partial/itemSearchHistory';
import { ItemSearchHistories } from 'type/viewModel/itemSearchHistories';

export const toItemSearchHistories = (
  res: GetItemSearchHistoriesResponse
): ItemSearchHistories => {
  const itemSearchHistories: ItemSearchHistory[] =
    res.item_search_histories.map((history) => ({
      id: history.id,
      keyword: history.keyword,
    }));

  return {
    data: itemSearchHistories,
  };
};
