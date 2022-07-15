import { Box, BoxProps, Center, Input, InputProps } from '@chakra-ui/react';
import { SearchIcon } from 'components/atoms/Icons/Search';
import React from 'react';

type Props = {
  inputProps: InputProps;
} & BoxProps;
export const SearchBar: React.VFC<Props> = ({ inputProps, ...props }) => {
  return (
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
        {...inputProps}
      />
      <Center position="absolute" left="3" top="0" h="full" zIndex="1">
        <SearchIcon w="17.5px" h="17.5px" />
      </Center>
    </Box>
  );
};
