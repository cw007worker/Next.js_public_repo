import { Box, Text } from '@chakra-ui/layout';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { NoProductlist } from 'components/organisms/NoProductlist';
import { ProductListLayout } from 'components/organisms/ProductListLayout';
import { HookState } from 'hooks/useGetWishlist';
import React from 'react';

export const Component: React.VFC<HookState> = ({
  isError,
  isLoadingInitialData,
  isLoadingMore,
  more,
  isMoreDisable,
  list,
  isLast,
}) => {
  return isLoadingInitialData ? (
    <Loading />
  ) : isError ? (
    <Box>
      <ErrorFetchFaild
        message="コンテンツが取得できませんでした。"
        includeSubMessage={false}
      />
    </Box>
  ) : (
    <Box bg="bg.200" minH="100vh">
      <Box py="2">
        <Text textStyle="h5" px="2.5">
          お気に入り商品一覧
        </Text>
      </Box>
      {list && list.length > 0 ? (
        <ProductListLayout
          list={list}
          more={more}
          isLast={isLast}
          isMoreLoading={isLoadingMore ?? false}
        />
      ) : (
        <NoProductlist text="お気に入り商品はまだありません。" py="12" />
      )}
    </Box>
  );
};

export const WishlistTemplate = React.memo(Component);
