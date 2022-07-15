import React, { useEffect } from 'react';
import {
  DrawerContent,
  Props as DrawerContainerProps,
} from 'components/molecules/DrawerContent';
import { DrawerBody } from 'components/molecules/DrawerBody';
import { DrawerHeader } from 'components/molecules/DrawerHeader';
import { Text, Box, Grid } from '@chakra-ui/react';
import { css } from '@emotion/react';

import {
  FetchManageState,
  isFailState,
  isInitState,
} from 'type/util/fetchData';
import { BrandList } from 'type/viewModel/brandList';
import { isLoadingState } from 'type/util/fetchData';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { HookState as QueryState } from 'hooks/useQuery';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { ChevronRightIcon } from '@chakra-ui/icons';

type Props = {
  categoryBrandsState: FetchManageState<BrandList>;
  queryState: QueryState;
} & DrawerContainerProps;

export const FilterByBrands: React.FC<Props> = ({
  categoryBrandsState,
  queryState,
  ...rest
}) => {
  return (
    <DrawerContent {...rest}>
      <DrawerHeader>ブランドから探す</DrawerHeader>
      <DrawerBody>
        {isLoadingState(categoryBrandsState) ||
        isInitState(categoryBrandsState) ? (
          <Loading />
        ) : isFailState(categoryBrandsState) ? (
          <ErrorFetchFaild
            message="カテゴリー情報を取得できませんでした。"
            includeSubMessage={true}
            linkProps={{ path: '/', text: 'ホームへ戻る' }}
          />
        ) : (
          <Grid
            display="grid"
            backgroundColor="#EEEEEE"
            gridTemplateColumns="repeat(1, 1fr)"
            borderColor="inherit"
            css={css`
              & > * {
                border-bottom: 1px solid;
                border-color: inherit;
              }
              & > *:last-of-type {
                border-bottom: unset;
              }
              & > *:first-of-type {
                border-top: 1px solid;
                border-color: inherit;
              }
            `}
          >
            <Box
              px="20px"
              py="13px"
              display="flex"
              alignItems="center"
              justifyContent="left"
              backgroundColor="bg.100"
              onClick={() =>
                queryState.handlePushQuery({
                  brand_ids: undefined,
                })
              }
            >
              <Box flex="1" textAlign="left">
                全てのブランド
              </Box>
              <ChevronRightIcon color="#BDBDBD" w="20px" h="20px" />
            </Box>
            {categoryBrandsState.data.map((brandList, index) => (
              <React.Fragment key={index}>
                <Text textStyle="h5" lineHeight="8" color="text.300" px="5">
                  {brandList.initialCharacter}
                </Text>
                <Grid
                  gridTemplateColumns="repeat(2, 1fr)"
                  borderColor="inherit"
                  backgroundColor="bg.100"
                  css={css`
                    & > * {
                      border-bottom: 1px solid;
                      border-color: inherit;
                    }
                    & > *:nth-child(-n + 2) {
                      border-top: 1px solid;
                      border-color: inherit;
                    }
                    & > *:nth-of-type(odd) {
                      border-right: 1px solid;
                      border-color: inherit;
                    }
                  `}
                >
                  {brandList.data.map((brand, index) => {
                    return (
                      <Box
                        px="20px"
                        py="13px"
                        display="flex"
                        alignItems="center"
                        justifyContent="left"
                        key={brand.id}
                        onClick={() =>
                          queryState.handlePushQuery({
                            brand_ids: `${brand.id}`,
                          })
                        }
                      >
                        <Box flex="1" textAlign="left">
                          {brand.name}
                        </Box>
                        <ChevronRightIcon color="#BDBDBD" w="20px" h="20px" />
                      </Box>
                    );
                  })}
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        )}
      </DrawerBody>
    </DrawerContent>
  );
};
