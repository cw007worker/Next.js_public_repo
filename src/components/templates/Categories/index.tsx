import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { ProductListLayout } from 'components/organisms/ProductListLayout';
import { HookState as GetCategoryItemState } from 'hooks/useGetCategoryItemList';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { ProductListLayoutWithLabel } from 'components/organisms/ProductListLayout/withLabel';
import { Finder } from 'components/organisms/Finder';
import { HookState as QueryState } from 'hooks/useQuery';
import { Brand } from 'type/viewModel/common/brand';
import { Image } from '@chakra-ui/react';
import { ProductListLayoutSkeleton } from 'components/organisms/Skeleton/productListLayout';

type Props = {
  handleSortDrawer: (isOpen: boolean) => void;
  handleFilterByBrandsDrawer: (isOpen: boolean) => void;
  handleToggleDisplayColor: () => void;
  selectedCategoryBrand: Brand;
} & GetCategoryItemState &
  QueryState;
export const Component: React.VFC<Props> = ({
  isError,
  isLoadingInitialData,
  isLoadingMore,
  listMeta,
  more,
  isLast,
  items,
  query,
  handleSortDrawer,
  handleFilterByBrandsDrawer,
  handleToggleDisplayColor,
  selectedCategoryBrand,
}) => {
  return isLoadingInitialData ? (
    <ProductListLayoutSkeleton mt="145px" />
  ) : isError ? (
    <Box>
      <ErrorFetchFaild
        message="コンテンツが取得できませんでした。"
        includeSubMessage={false}
      />
    </Box>
  ) : (
    <Box bg="bg.200">
      {listMeta?.image && (
        <Image
          src={listMeta.image.src}
          alt={listMeta.image.alt}
          objectFit="contain"
          layout="fill"
        />
      )}
      <Text fontSize="14px" fontWeight="bold" py="19.5" px="20px" bg="white">
        {listMeta?.name}の商品一覧
      </Text>
      <Finder
        query={query}
        handleSortDrawer={handleSortDrawer}
        handleFilterByCategoriesDrawer={handleFilterByBrandsDrawer}
        handleToggleDisplayColor={handleToggleDisplayColor}
        selectedItemName={
          selectedCategoryBrand === undefined
            ? '全ブランド'
            : selectedCategoryBrand.name
        }
      />
      <ProductListLayout
        list={items}
        more={more}
        isMoreLoading={isLoadingMore ?? false}
        isLast={isLast}
        py="6px"
      />
    </Box>
  );
};

export const CategoriesTemplate = React.memo(Component);
