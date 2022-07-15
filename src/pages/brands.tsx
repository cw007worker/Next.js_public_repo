import { BrandsTemplate } from 'components/templates/Brands';
import { useBrandsPage } from 'hooks/pages/useBrandsPage';
import router from 'next/router';
import { Button, Slide, Drawer, DrawerOverlay } from '@chakra-ui/react';
import { FilterByCategories as FilterByCategoriesDrawer } from 'components/templates/Drawer/FilterByCategories';
import { Sort as SortDrawer } from 'components/templates/Drawer/Sort';
import { TransparentBlackLayer } from 'components/atoms/TransparentBlackLayer';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';

const Brands = () => {
  const {
    layoutState,
    brandItemListState,
    isOpenSortDrawer,
    isOpenFilterByCategoriesDrawer,
    handleSortDrawer,
    handleFilterByCategoriesDrawer,
    handleToggleDisplayColor,
    queryState,
    getBrandCategoriesState,
    selectedBrandCategory,
  } = useBrandsPage();

  return (
    <LayoutWithBack
      handleBack={() => router.back()}
      cartItemCount={layoutState.cartItemCount}
    >
      <BrandsTemplate
        {...brandItemListState}
        {...queryState}
        handleSortDrawer={handleSortDrawer}
        handleFilterByCategoriesDrawer={handleFilterByCategoriesDrawer}
        handleToggleDisplayColor={handleToggleDisplayColor}
        selectedBrandCategory={selectedBrandCategory}
      />
      <Drawer
        placement="bottom"
        isOpen={isOpenFilterByCategoriesDrawer}
        onClose={() => handleFilterByCategoriesDrawer(false)}
      >
        <DrawerOverlay />
        <FilterByCategoriesDrawer
          brandCategoriesState={getBrandCategoriesState}
          queryState={queryState}
        />
      </Drawer>
      <Drawer
        placement="bottom"
        isOpen={isOpenSortDrawer}
        onClose={() => handleSortDrawer(false)}
      >
        <DrawerOverlay />
        <SortDrawer queryState={queryState} />
      </Drawer>
    </LayoutWithBack>
  );
};

export default Brands;
