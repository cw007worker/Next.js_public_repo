import { Box } from '@chakra-ui/layout';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { ProductListHeadLayout } from 'components/organisms/ProductListHeadLayout';
import { ProductListLayout } from 'components/organisms/ProductListLayout';
import { HookState } from 'hooks/useGetProductListByRankingTag';
import React from 'react';

export const RankingTemplate: React.VFC<HookState> = ({
  isError,
  isLoadingInitialData,
  isLoadingMore,
  tagInfo,
  more,
  isLast,
  list,
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
    <Box bg="bg.200">
      <ProductListHeadLayout tagInfo={tagInfo} isReleaseParty={false} />
      <ProductListLayout
        list={list}
        more={more}
        isMoreLoading={isLoadingMore ?? false}
        isLast={isLast}
        isRanking={true}
        py="6px"
      />
    </Box>
  );
};
