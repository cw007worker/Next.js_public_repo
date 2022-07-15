import React from 'react';
import Link from 'next/link';
import { Box, BoxProps, Center, Flex, Spacer, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

export const ReferralLink: React.VFC<BoxProps> = (props) => {
  return (
    <Link
      href={{
        pathname: '/referral',
      }}
      passHref
    >
      <Box bg="#EEEEEE" {...props} pt="16px" pb="8px" px="8px">
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
            <Text textStyle="h5">
              😃&nbsp;友達を招待して
              <Text color="action.notification" as="span">
                最大¥5000OFF！
              </Text>
            </Text>
          </Box>
          <ChevronRightIcon color="#BDBDBD" />
        </Box>
      </Box>
    </Link>
    // NOTE：NewlyProductsNotificationBar を一旦非表示にしているので、一時的にReferralLinkのUIを変えている
    // <Link
    //   href={{
    //     pathname: '/referral',
    //   }}
    //   passHref
    // >
    //   <Flex alignItems="center" py="8px" px="16px" bg="bg.100" height="50px" {...props}>
    //     <Text textStyle="h5">
    //       😃&nbsp;友達を招待して
    //       <Text color="action.notification" as="span">
    //         最大¥5000OFF！
    //       </Text>
    //     </Text>
    //     <Spacer />
    //     <Center>
    //       <ChevronRightIcon color="#BDBDBD" w="18px" h="18px" />
    //     </Center>
    //   </Flex>
    // </Link>
  );
};
