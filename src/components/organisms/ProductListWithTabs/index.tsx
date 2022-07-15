import { Box, BoxProps, Heading } from '@chakra-ui/layout';
import { TabWithTag } from 'components/atoms/TabWithTag';
import { Loading } from 'components/molecules/Loading';
import { TabListWithTag } from 'components/molecules/TabListWithTag';
import { ErrorFetchFaild } from '../Error/fetchFailed';
import { HookState } from 'hooks/useProductListWithTab';
import React from 'react';
import { ProductListLayout } from '../ProductListLayout';
import { ProductListLayoutSkeleton } from '../Skeleton/productListLayout';

export const ProductListWithTabs: React.VFC<HookState & BoxProps> = (props) => {
  const {
    tabs,
    list,
    currentTab,
    selectTab,
    more,
    isLoadingInitialData,
    isLoadingMore,
    isError,
    isLast,
    ...rest
  } = props;
  return (
    <Box>
      <TabListWithTag>
        {tabs.map((tab, i) => (
          <TabWithTag
            key={i}
            isSelected={currentTab === tab}
            onClick={() => selectTab(tab)}
          >
            {tab.name}
          </TabWithTag>
        ))}
      </TabListWithTag>
      <Box minHeight="calc(100vh - 60px)" pt="5">
        {isLoadingInitialData ? (
          <ProductListLayoutSkeleton />
        ) : isError ? (
          <Box>
            <ErrorFetchFaild
              message="コンテンツが取得できませんでした。"
              includeSubMessage={false}
            />
          </Box>
        ) : (
          <ProductListLayout
            list={list}
            more={more}
            isMoreLoading={isLoadingMore ?? false}
            isLast={isLast}
            {...rest}
          />
        )}
      </Box>
    </Box>
  );
};
