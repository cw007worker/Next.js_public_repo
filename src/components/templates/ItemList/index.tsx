import React from 'react';
import { Box, Text } from '@chakra-ui/layout';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { ProductListLayout } from 'components/organisms/ProductListLayout';
import { HookState } from 'hooks/useGetItemList';
import { DisplayColorButton } from 'components/molecules/DisplayColorButton';
import { HookState as QueryState } from 'hooks/useQuery';

type Props = {
  queryState: QueryState;
  handleToggleDisplayColor: () => void;
} & HookState;
export const Component: React.VFC<Props> = ({
  queryState,
  handleToggleDisplayColor,
  isError,
  isLoadingInitialData,
  isLoadingMore,
  more,
  isMoreDisable,
  items,
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
    <Box bg="bg.200">
      <Box py="2">
        <Text fontSize="14px" fontWeight="bold" py="19.5" px="20px" bg="white">
          {/* TODO: ソート・絞り込みの状態によって文言を変える。現状は新規商品のみ表示想定なので一旦対応不要。 */}
          お得な新規商品一覧
        </Text>
        <Box display="flex" flexWrap="wrap" px="22px" py="11px" bg="#FAFAFA">
          <DisplayColorButton
            marginLeft="auto"
            enabled={queryState.query.displayColor === 'true'}
            onClick={() => {
              handleToggleDisplayColor();
            }}
          >
            <Text
              fontWeight="bold"
              fontSize="13px"
              color="text.400"
              display="inline-block"
            >
              カラーをまとめる
            </Text>
          </DisplayColorButton>
        </Box>
      </Box>
      <ProductListLayout
        list={items}
        more={more}
        isLast={isLast}
        isMoreLoading={isLoadingMore ?? false}
        py="6px"
      />
    </Box>
  );
};

export const ItemListTemplate = React.memo(Component);
