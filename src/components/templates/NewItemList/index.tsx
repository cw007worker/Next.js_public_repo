import React from 'react';
import { Box, Text, VStack, AspectRatio } from '@chakra-ui/layout';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { HookState } from 'hooks/pages/useNewItemListPage';
import { PartialUnitsContent } from 'components/organisms/PartialUnitsContent';
import { PartialUnitsContentSkeleton } from 'components/organisms/Skeleton/partialUnitsContent';
import { NewlyProductsNotificationBar } from 'components/organisms/NewlyProductsNotificationBar';
import { TabListWithTag } from 'components/molecules/TabListWithTag';
import { TabWithTag } from 'components/atoms/TabWithTag';
import router from 'next/router';
import { BannerContent } from 'components/organisms/BannerContent';

const Component: React.VFC<HookState> = ({ partialProductsList, bannerContent }) => {
  return (
    <>
      {bannerContent?.image && (
        <BannerContent content={bannerContent} ratio={1.49} />
      )}
      {/* <NewlyProductsNotificationBar /> */}
      <VStack spacing={4} align="stretch">
        {partialProductsList.map((p, i) => (
          <Box key={i}>
            {p.state?.type === 'loaded' && p.partialUnits ? (
              <PartialUnitsContent
                key={i}
                partialUnits={p.partialUnits}
                name={p.name}
                handleMore={p.handleMore}
                isNew={p.isNew}
              />
            ) : p.state?.type === 'loading' ? (
              <PartialUnitsContentSkeleton />
            ) : (
              <Box>
                <ErrorFetchFaild
                  message="コンテンツが取得できませんでした。"
                  includeSubMessage={false}
                />
              </Box>
            )}
          </Box>
        ))}
      </VStack>
    </>
  );
};

export const NewItemListTemplate = React.memo(Component);
