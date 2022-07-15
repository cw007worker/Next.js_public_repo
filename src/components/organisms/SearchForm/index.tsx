import { Box, BoxProps } from '@chakra-ui/react';
import { SearchBar } from 'components/molecules/SearchBar';
import React from 'react';
import { useSearchForm } from 'hooks/useSearchForm';
import { Center, Input, InputProps } from '@chakra-ui/react';
import { SearchIcon } from 'components/atoms/Icons/Search';

type Props = {
  keyword?: string;
} & BoxProps;
export const SearchForm: React.VFC<Props> = ({ keyword, ...props }) => {
  const { handleSubmit, handleChange, formValue } = useSearchForm({
    defaultKeyword: keyword,
  });

  return (
    <Box {...props}>
      <form onSubmit={handleSubmit}>
        <Box position="relative" {...props}>
          <Input
            h="34px"
            border="none"
            borderRadius="52px"
            bg="bg.200"
            pl="10"
            pr="3"
            py="1.5"
            placeholder="何をお探しですか？"
            color="text.400"
            _placeholder={{ color: 'text.200' }}
            type="text"
            value={formValue.keyword}
            onChange={handleChange}
          />
          <Center position="absolute" left="3" top="0" h="full" zIndex="1">
            <SearchIcon w="17.5px" h="17.5px" />
          </Center>
        </Box>
      </form>
    </Box>
  );
};
