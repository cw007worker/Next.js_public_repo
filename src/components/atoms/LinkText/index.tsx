import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';

type Props = {
  href: string;
} & TextProps;
export const LinkText: React.VFC<Props> = ({ href, children, ...rest }) => {
  return (
    <Link href={href} passHref>
      <Text
        textStyle="h7"
        color="action.assistant"
        textDecoration="underline"
        {...rest}
      >
        {children}
      </Text>
    </Link>
  );
};
