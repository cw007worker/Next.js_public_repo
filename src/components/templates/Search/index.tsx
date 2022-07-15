import React from 'react';
import { HookState } from 'hooks/useGetUnitsBySearch';
import { Loading } from 'components/molecules/Loading';
import { Box, Text } from '@chakra-ui/react';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { ProductListLayout } from 'components/organisms/ProductListLayout';
import { NoProductlist } from 'components/organisms/NoProductlist';

export const Component: React.VFC<HookState> = ({
  isError,
  isLoadingInitialData,
  isLoadingMore,
  more,
  isLast,
  list,
  keyword,
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
      <Text fontSize="14px" fontWeight="bold" py="19.5" px="20px" bg="white">
        {keyword}の検索結果
      </Text>
      {list && list.length > 0 ? (
        <ProductListLayout
          list={list}
          more={more}
          isMoreLoading={isLoadingMore ?? false}
          isLast={isLast}
          py="6px"
        />
      ) : (
        <NoProductlist text="商品が見つかりませんでした" py="12" />
      )}
    </Box>
  );
};

export const SearchTemplate = React.memo(Component);
