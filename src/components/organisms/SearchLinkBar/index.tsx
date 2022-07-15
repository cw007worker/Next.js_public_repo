import { Box, BoxProps, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { VFC } from 'react';
import Link from 'next/link';

type Props = BoxProps;

export const SearchLinkBar: VFC<Props> = (props) => {
  return (
    <Link href="/search/menu" passHref>
      <Box bg="#EEEEEE" {...props} py="8px" px="16px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bg="white"
          py="7px"
          px="12.5px"
          borderRadius={'4px'}
        >
          <Box width="24px" height="24px" position="relative">
            <OptimizedImage src="/SearchIcon.svg" layout="fill" />
          </Box>
          <Text fontSize="14px" fontWeight="bold">
            ブランドやカテゴリーから探す
          </Text>
          <ChevronRightIcon color="#BDBDBD" />
        </Box>
      </Box>
    </Link>
  );
};
