import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  Box,
  AccordionIcon,
  Grid,
  Text,
} from '@chakra-ui/react';
import { Tags } from 'type/viewModel/tags';
import { AccordionPanel } from 'components/atoms/AccordionPanel';
import { AccordionButton } from 'components/atoms/AccordionButton';
import { AccordionLink } from 'components/molecules/AccordionLink';
import { css } from '@emotion/react';
import {
  FetchManageState,
  isFailState,
  isInitState,
  isLoadingState,
} from 'type/util/fetchData';
import { ExpandedIndex } from '@chakra-ui/react';
import { InitialState, uiActionTypes } from 'reducer/ui';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { Loading } from 'components/molecules/Loading';
import { UrlObject } from 'url';

type Props = {
  tagsForSearchState: FetchManageState<Tags>;
  handleToggleAccordionIndex: (indexes: ExpandedIndex) => void;
  accordionIndex: ExpandedIndex | undefined;
};

export const FilterByTags: React.FC<Props> = ({
  tagsForSearchState,
  handleToggleAccordionIndex,
  accordionIndex,
}) => {
  return (
    <>
      {isLoadingState(tagsForSearchState) || isInitState(tagsForSearchState) ? (
        <Loading />
      ) : isFailState(tagsForSearchState) ? (
        <ErrorFetchFaild
          message="カテゴリー・ブランド情報を取得できませんでした。"
          includeSubMessage={true}
        />
      ) : (
        <Accordion
          allowMultiple
          css={css`
            & > :first-of-type {
              border-top: none;
            }
          `}
          index={accordionIndex}
          allowToggle={true}
          onChange={(index: number[]) => handleToggleAccordionIndex(index)}
        >
          <AccordionItem>
            <AccordionButton
              p="20px"
              onClick={() => handleToggleAccordionIndex(0)}
            >
              <Box
                flex="1"
                textAlign="left"
                fontSize={'16px'}
                fontWeight={'bold'}
              >
                ブランドから探す
              </Box>
              <AccordionIcon color="#BDBDBD" />
            </AccordionButton>

            <AccordionPanel backgroundColor="#EEEEEE">
              <Box pb="2.5">
                {tagsForSearchState.data.brands.map((brand, index) => (
                  <React.Fragment key={index}>
                    <Text textStyle="h5" lineHeight="8" color="text.300" px="5">
                      {brand.initialCharacter}
                    </Text>
                    <Grid
                      gridTemplateColumns="repeat(2, 1fr)"
                      borderColor="inherit"
                      backgroundColor="#EEEEEE"
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
                      {brand.data.map((b, index) => {
                        const href: UrlObject = {
                          pathname: '/brands',
                          query: {
                            brandId: b.id,
                          },
                        };
                        return (
                          <AccordionLink
                            display="flex"
                            px="20px"
                            py="13px"
                            key={index}
                            backgroundColor="bg.100"
                            href={href}
                          >
                            {b.name}
                          </AccordionLink>
                        );
                      })}
                    </Grid>
                  </React.Fragment>
                ))}
              </Box>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton
              p="20px"
              onClick={() => handleToggleAccordionIndex(1)}
            >
              <Box
                flex="1"
                textAlign="left"
                fontSize={'16px'}
                fontWeight={'bold'}
              >
                カテゴリーから探す
              </Box>
              <AccordionIcon color="#BDBDBD" />
            </AccordionButton>

            <AccordionPanel>
              <Grid
                display="grid"
                gridTemplateColumns="repeat(1, 1fr)"
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
                {tagsForSearchState.data.categories.map((category, index) => {
                  const href: UrlObject = {
                    pathname: '/categories',
                    query: {
                      categoryId: category.id,
                    },
                  };
                  return (
                    <React.Fragment key={index}>
                      <AccordionLink
                        px="20px"
                        py="17px"
                        href={href}
                        fontWeight={'bold'}
                      >
                        {category.name}
                      </AccordionLink>
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
                            const href: UrlObject = {
                              pathname: '/categories',
                              query: {
                                categoryId: sub.id,
                              },
                            };
                            return (
                              <AccordionLink
                                px="20px"
                                py="13px"
                                key={index}
                                href={href}
                              >
                                {sub.name}
                              </AccordionLink>
                            );
                          })}
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
};
