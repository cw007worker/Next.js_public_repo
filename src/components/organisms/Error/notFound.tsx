import { VFC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Text } from '@chakra-ui/layout';
import { Button } from 'components/atoms/Button';
import IyashinoWanchan from '../../../../static/IyashinoWanchan.png';

type Props = {
  message: string;
  subMessage?: string;
  linkProps?: {
    path: string;
    text: string;
  };
};

export const NotFound: VFC<Props> = ({ message, subMessage, linkProps }) => {
  return (
    <Box px="8" p="8" maxW="container.sm" mx="auto">
      <Box width="200px" mx="auto">
        <Image src={IyashinoWanchan} />
      </Box>
      <Box maxW="325px" mx="auto">
        <Text textAlign="center" textStyle="h4" pt="8">
          {message}
        </Text>
        {subMessage && (
          <Text textAlign="center" textStyle="h5" pt="4">
            {subMessage}
          </Text>
        )}
      </Box>
      {linkProps && (
        <Box pt="8" textAlign="center">
          <Link href={linkProps.path} passHref>
            <Button width="100%" maxWidth="325px" minHeight="48px">
              {linkProps.text}
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};
