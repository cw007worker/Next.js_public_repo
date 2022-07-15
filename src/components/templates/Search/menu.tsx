import {
  Accordion,
  AccordionItem,
  Box,
  AccordionIcon,
  Grid,
  Text,
} from '@chakra-ui/react';
import React, { VFC } from 'react';
import { AccordionPanel } from 'components/atoms/AccordionPanel';
import { AccordionButton } from 'components/atoms/AccordionButton';
import { AccordingLinkImage } from 'components/molecules/AccordionLinkImage';
import { AccordionLink } from 'components/molecules/AccordionLink';
import { css } from '@emotion/react';
import { SEARCH } from 'constants/search';
import { HookState } from 'hooks/useSearchMenu';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { FilterByTags } from 'components/organisms/FilterByTags';

import { UrlObject } from 'url';
import { SearchHistories } from 'components/organisms/SearchHistories';

export const SearchMenuTemplate: VFC<HookState> = (props) => {
  return (
    <Box>
      {props.itemSearchHistories && props.itemSearchHistories.length > 0 && (
        <SearchHistories itemSearchHistories={props.itemSearchHistories} />
      )}
      <FilterByTags
        tagsForSearchState={props.tagsForSearch}
        handleToggleAccordionIndex={props.handleToggleAccordionIndex}
        accordionIndex={props.accordionIndex}
      />
    </Box>
  );
};
