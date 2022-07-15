import { LayoutWithSearchBar } from 'components/organisms/Layout/withSearchBar';
import { SearchMenuTemplate } from 'components/templates/Search/menu';
import { useSearchMenuPage } from 'hooks/pages/search/useSearchMenuPage';
import router from 'next/router';

const SearchMenu = () => {
  const hooksState = useSearchMenuPage();
  return (
    <LayoutWithSearchBar
      handleBack={() => router.back()}
      cartItemCount={hooksState.layoutState.cartItemCount}
      keyword={hooksState.unitsBySearchState.keyword}
      currentPage={hooksState.layoutState.currentPage}
      isButtomTabShow={true}
    >
      {/* <SearchWordTemplate /> */}
      <SearchMenuTemplate {...hooksState.searchMenuState} />
    </LayoutWithSearchBar>
  );
};

export default SearchMenu;
