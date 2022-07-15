import { LayoutWithBack } from 'components/organisms/Layout/withBack';
import { LayoutWithSearchBar } from 'components/organisms/Layout/withSearchBar';
import { SearchTemplate } from 'components/templates/Search';
import { useSearchPage } from 'hooks/pages/search/useSearchPage';
import { SearchMenuTemplate } from 'components/templates/Search/menu';
import router from 'next/router';

const Search = () => {
  const {
    layoutState,
    unitsBySearchState,
    searchFormState,
    searchMenuState,
    handleBack,
  } = useSearchPage();
  return (
    <LayoutWithSearchBar
      handleBack={() => handleBack()}
      cartItemCount={layoutState.cartItemCount}
      keyword={unitsBySearchState.keyword}
    >
      <SearchTemplate {...unitsBySearchState} />
    </LayoutWithSearchBar>
  );
};

export default Search;
