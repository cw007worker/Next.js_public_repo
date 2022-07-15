import router from 'next/router';
import { Drawer, Box, Button, DrawerOverlay } from '@chakra-ui/react';
import { Sort as SortDrawer } from 'components/templates/Drawer/Sort';
import { useCategoriesPage } from 'hooks/pages/useCategoriesPage';
import { TransparentBlackLayer } from 'components/atoms/TransparentBlackLayer';
import { CategoriesTemplate } from 'components/templates/Categories';
import { FilterByBrands } from 'components/templates/Drawer/FilterByBrands';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';

const Categories = () => {
  const {
    layoutState,
    categoryItemListState,
    isOpenSortDrawer,
    isOpenFilterByBrandsDrawer,
    handleFilterByBrandsDrawer,
    handleSortDrawer,
    handleToggleDisplayColor,
    queryState,
    getCategoryBrandsState,
    selectedCategoryBrand,
  } = useCategoriesPage();

  return (
    <LayoutWithBack
      handleBack={() => router.back()}
      cartItemCount={layoutState.cartItemCount}
    >
      <CategoriesTemplate
        {...categoryItemListState}
        {...queryState}
        handleSortDrawer={handleSortDrawer}
        handleFilterByBrandsDrawer={handleFilterByBrandsDrawer}
        handleToggleDisplayColor={handleToggleDisplayColor}
        selectedCategoryBrand={selectedCategoryBrand}
      />
      <Drawer
        placement="bottom"
        onClose={() => handleFilterByBrandsDrawer(false)}
        isOpen={isOpenFilterByBrandsDrawer}
      >
        <DrawerOverlay />
        <FilterByBrands
          categoryBrandsState={getCategoryBrandsState}
          queryState={queryState}
        />
      </Drawer>
      <Drawer
        placement="bottom"
        onClose={() => handleSortDrawer(false)}
        isOpen={isOpenSortDrawer}
      >
        <DrawerOverlay />
        <SortDrawer queryState={queryState} />
      </Drawer>
    </LayoutWithBack>
  );
};

export default Categories;
