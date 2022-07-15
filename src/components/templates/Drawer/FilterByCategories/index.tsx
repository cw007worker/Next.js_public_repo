import React, { useEffect } from 'react';
import {
  DrawerContent,
  Props as DrawerContainerProps,
} from 'components/molecules/DrawerContent';
import { DrawerBody } from 'components/molecules/DrawerBody';
import { DrawerHeader } from 'components/molecules/DrawerHeader';
import { Box, Grid } from '@chakra-ui/react';
import { css } from '@emotion/react';

import {
  FetchManageState,
  isFailState,
  isInitState,
} from 'type/util/fetchData';
import { CategoryList } from 'type/viewModel/categoryList';
import { isLoadingState } from 'type/util/fetchData';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { HookState as QueryState } from 'hooks/useQuery';
import { ChevronRightIcon } from '@chakra-ui/icons';

type Props = {
  brandCategoriesState: FetchManageState<CategoryList>;

  queryState: QueryState;
} & DrawerContainerProps;

export const FilterByCategories: React.FC<Props> = ({
  brandCategoriesState,
  queryState,

  ...rest
}) => {
  return (
    <DrawerContent {...rest}>
      <DrawerHeader>カテゴリーから探す</DrawerHeader>
      <DrawerBody>
        {isLoadingState(brandCategoriesState) ||
        isInitState(brandCategoriesState) ? (
          <Loading />
        ) : isFailState(brandCategoriesState) ? (
          <ErrorFetchFaild
            message="カテゴリー情報を取得できませんでした。"
            includeSubMessage={true}
            linkProps={{ path: '/', text: 'ホームへ戻る' }}
          />
        ) : (
          <Grid
            display="grid"
            gridTemplateColumns="repeat(1, 1fr)"
            borderColor="inherit"
            css={css`
              & > * {
                border-bottom: 1px solid;
                border-color: inherit;
              }
              & > *:first-of-type {
                border-top: 1px solid;
                border-color: inherit;
              }
            `}
          >
            <Box
              px="20px"
              py="17px"
              fontWeight={'bold'}
              display="flex"
              alignItems="center"
              onClick={() =>
                queryState.handlePushQuery({
                  category_ids: undefined,
                })
              }
            >
              <Box flex="1" textAlign="left">
                全てのカテゴリー
              </Box>
              <ChevronRightIcon color="#BDBDBD" w="20px" h="20px" />
            </Box>
            {brandCategoriesState.data.map((category, index) => {
              return (
                <React.Fragment key={index}>
                  <Box
                    px="20px"
                    py="17px"
                    fontWeight={'bold'}
                    onClick={() =>
                      queryState.handlePushQuery({
                        category_ids: `${category.id}`,
                      })
                    }
                    display="flex"
                    alignItems="center"
                  >
                    <Box flex="1" textAlign="left">
                      {category.name}
                    </Box>
                    <ChevronRightIcon color="#BDBDBD" w="20px" h="20px" />
                  </Box>
                  <Grid
                    display="grid"
                    gridTemplateColumns="repeat(2, 1fr)"
                    borderColor="inherit"
                    css={css`
                      & > *:nth-of-type(odd) {
                        border-right: 1px solid;
                        border-color: inherit;
                      }
                      & > * {
                        border-bottom: 1px solid;
                        border-color: inherit;
                      }
                      & > *:nth-last-of-type(-n + 2) {
                        margin-bottom: -1px;
                      }
                    `}
                  >
                    {category.childCategories !== undefined &&
                      category.childCategories.map((sub, index) => {
                        return (
                          <Box
                            px="20px"
                            py="13px"
                            key={index}
                            onClick={() =>
                              //TODO: 配列にする
                              queryState.handlePushQuery({
                                //queryに配列の渡し方がわからなかった＋要件として、複数選択できるようにする必要は今のところなし。
                                category_ids: `${sub.id}`,
                              })
                            }
                            display="flex"
                            alignItems="center"
                          >
                            <Box flex="1" textAlign="left">
                              {sub.name}
                            </Box>
                            <ChevronRightIcon
                              color="#BDBDBD"
                              w="20px"
                              h="20px"
                            />
                          </Box>
                        );
                      })}
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>
        )}
      </DrawerBody>
    </DrawerContent>
  );
};
