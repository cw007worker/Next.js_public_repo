import React from 'react';
import { HookState } from 'hooks/useGetDeliveries';
import { Box, VStack } from '@chakra-ui/react';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { OrderInfoCard } from 'components/organisms/OrderInfoCard';
import { MoreButton } from 'components/atoms/MoreButton';
import { NoOrders } from 'components/organisms/NoOrders';

export const Component: React.VFC<HookState> = ({
  isError,
  isLoadingInitialData,
  isLoadingMore,
  more,
  list,
  isLast,
}) => {
  return (
    <Box minH="100vh" bg="bg.200">
      {isLoadingInitialData ? (
        <Loading />
      ) : isError ? (
        <ErrorFetchFaild
          message="コンテンツが取得できませんでした。"
          includeSubMessage={false}
        />
      ) : (
        <Box>
          {list && list.length > 0 ? (
            <Box>
              <VStack spacing={5} align="stretch" px="3" py="12">
                {list?.map((delivery, index) => (
                  <OrderInfoCard key={index} delivery={delivery} />
                ))}
              </VStack>
              <MoreButton
                onClick={more}
                isLoading={isLoadingMore}
                loadingText="読み込み中"
                hidden={isLast}
              >
                もっと見る
              </MoreButton>
            </Box>
          ) : (
            <NoOrders py="20" />
          )}
        </Box>
      )}
    </Box>
  );
};

export const OrdersTemplate = React.memo(Component);
