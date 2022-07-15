import { VFC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Text } from '@chakra-ui/layout';
import { Button } from 'components/atoms/Button';
import IyashinoWanchan from '../../../../static/IyashinoWanchan.png';

type Props = {
  message: string;
  includeSubMessage: boolean;
  linkProps?: {
    path: string;
    text: string;
  };
};

export const ErrorFetchFaild: VFC<Props> = ({
  message,
  includeSubMessage,
  linkProps,
}) => {
  return (
    <Box px="8" p="8" maxW="container.sm" mx="auto">
      <Box width="200px" mx="auto">
        <Image src={IyashinoWanchan} />
      </Box>
      <Box maxW="325px" mx="auto">
        <Text textAlign="center" textStyle="h4" pt="8">
          {message}
        </Text>
        {includeSubMessage && (
          <Text textAlign="center" textStyle="h5" pt="4">
            pantriiのエンジニアはこの問題を認識しており 解決に向けて作業中です！
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
