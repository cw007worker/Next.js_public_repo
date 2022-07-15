import React from 'react';
import Link from 'next/link';
import { Flex, FlexProps, Spacer, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { UrlObject } from 'url';

type Props = {
  href: string | UrlObject;
  icon: JSX.Element;
} & FlexProps;
export const LinkBoxWithIcon: React.FC<Props> = (props) => {
  const { href, icon, children, ...rest } = props;

  return (
    <Link passHref href={href}>
      <Flex alignItems="center" px="30px" {...rest}>
        {icon}
        <Text textStyle="h7" ml="4">
          {children}
        </Text>
        <Spacer />
        <ChevronRightIcon color="text.200" w="18px" h="18px" />
      </Flex>
    </Link>
  );
};
