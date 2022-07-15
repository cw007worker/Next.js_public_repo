import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { ProductListLayout } from 'components/organisms/ProductListLayout';
import { HookState as GetBrandItemState } from 'hooks/useGetBrandItemList';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { ProductListLayoutWithLabel } from 'components/organisms/ProductListLayout/withLabel';
import { Finder } from 'components/organisms/Finder';
import { HookState as QueryState } from 'hooks/useQuery';
import { ChildCategory } from 'type/viewModel/common/childCategory';
import { Image } from '@chakra-ui/react';
import { ProductListLayoutSkeleton } from 'components/organisms/Skeleton/productListLayout';

type Props = {
  handleSortDrawer: (isOpen: boolean) => void;
  handleFilterByCategoriesDrawer: (isOpen: boolean) => void;
  handleToggleDisplayColor: () => void;
  selectedBrandCategory:
    | {
        id: string;
        name: string;
        data: ChildCategory[] | undefined;
      }
    | {
        id: string;
        name: string;
      }
    | undefined;
} & GetBrandItemState &
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
  handleFilterByCategoriesDrawer,
  handleToggleDisplayColor,
  selectedBrandCategory,
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
          fallbackSrc="/Fallback/FallbackLarge.svg"
        />
      )}
      <Text fontSize="14px" fontWeight="bold" py="19.5" px="20px" bg="white">
        {listMeta?.name}の商品一覧
      </Text>
      <Finder
        query={query}
        handleSortDrawer={handleSortDrawer}
        handleFilterByCategoriesDrawer={handleFilterByCategoriesDrawer}
        handleToggleDisplayColor={handleToggleDisplayColor}
        selectedItemName={
          selectedBrandCategory === undefined ||
          selectedBrandCategory.name === undefined
            ? '全カテゴリー'
            : selectedBrandCategory.name
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

export const BrandsTemplate = React.memo(Component);
