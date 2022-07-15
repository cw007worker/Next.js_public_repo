import { Box, BoxProps, Center, Flex, Text } from '@chakra-ui/layout';
import { Link } from '@chakra-ui/react';
import { RoundedBox } from 'components/atoms/RoundedBox';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';
import { UrlObject } from 'url';
import RightVector from '../../../../static/RightVector.svg';

type Props = {
  href: string | UrlObject;
  hasInfo?: boolean;
} & BoxProps;
export const RoundedLinkBox: React.FC<Props> = ({
  href,
  hasInfo = false,
  children,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <NextLink href={href} passHref>
        <Link _hover={{ textDecoration: 'none' }}>
          <RoundedBox pl="5" py="2.5">
            <Flex justifyContent="center">
              <Text
                textStyle="h7"
                noOfLines={1}
                color={hasInfo ? 'text.400' : 'text.200'}
                flex="1"
              >
                {children}
              </Text>
              <Center w="12">
                <Image
                  src={RightVector}
                  alt="RightVector"
                  width={7.41}
                  height={12}
                />
              </Center>
            </Flex>
          </RoundedBox>
        </Link>
      </NextLink>
    </Box>
  );
};
