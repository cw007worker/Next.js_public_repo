import { Box, BoxProps, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { VFC } from 'react';
import Link from 'next/link';
import { New } from 'components/atoms/New';

type Props = BoxProps;

export const NewlyProductsNotificationBar: VFC<Props> = (props) => {
  return (
    <Link
      href={{
        pathname: '/itemList',
        query: { sort: '-created_at' },
      }}
      passHref
    >
      <Box bg="#EEEEEE" {...props} py="8px" px="16px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bg="white"
          py="7px"
          px="12.5px"
          height="50px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <New mw="8" h="8" mr="1" />
            <Text textStyle="h4">お得な新商品が追加！</Text>
          </Box>
          <ChevronRightIcon color="#BDBDBD" />
        </Box>
      </Box>
    </Link>
  );
};
