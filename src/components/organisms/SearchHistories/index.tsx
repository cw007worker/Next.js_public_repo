import { Box, BoxProps, SimpleGrid, Text } from '@chakra-ui/layout';
import { ItemSearchHistory } from 'type/viewModel/common/itemSearchHistory';
import React from 'react';
import { AccordionLink } from 'components/molecules/AccordionLink';
import { AccordionPanel } from '@chakra-ui/react';

type Props = {
  title?: string;
  itemSearchHistories: ItemSearchHistory[];
} & BoxProps;

export const SearchHistories: React.VFC<Props> = ({
  title,
  itemSearchHistories,
  ...rest
}) => {
  return (
    <Box bg="#EEEEEE" pb="5" {...rest}>
      <Box py="4" pb="5" px="5" bg="white" border="1px" borderColor="#EEEEEE">
        <Text textStyle="h4">{title || '最近の検索'}</Text>
      </Box>
      <SimpleGrid>
        {itemSearchHistories &&
          itemSearchHistories.map((itemSearchHistory, index) => (
            <AccordionLink
              display="flex"
              px="20px"
              py="13px"
              key={index}
              backgroundColor="bg.100"
              border="1px"
              borderColor="#EEEEEE"
              href={{
                pathname: '/search',
                query: { keyword: encodeURI(itemSearchHistory.keyword) },
              }}
            >
              {itemSearchHistory.keyword}
            </AccordionLink>
          ))}
      </SimpleGrid>
    </Box>
  );
};
