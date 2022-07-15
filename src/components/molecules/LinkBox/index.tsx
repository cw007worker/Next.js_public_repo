import React from 'react';
import Link from 'next/link';
import { Flex, FlexProps, Spacer, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { UrlObject } from 'url';

type Props = {
  href: string | UrlObject;
} & FlexProps;
export const LinkBox: React.FC<Props> = (props) => {
  const { href, children, ...rest } = props;

  return (
    <Link passHref href={href}>
      <Flex alignItems="center" px="15px" {...rest}>
        <Text textStyle="h7" ml="4">
          {children}
        </Text>
        <Spacer />
        <ChevronRightIcon color="text.200" w="18px" h="18px" />
      </Flex>
    </Link>
  );
};
