import React from 'react';
import Link from 'next/link';
import { Box } from '@chakra-ui/layout';
import { Container } from '@chakra-ui/react';
import { Image } from '@chakra-ui/image';

export const SafeAndSecureLink: React.VFC = (props) => {
  return (
    <Container maxW="container.lg" bg="bg.200" p="20px">
      <Link href={{ pathname: '/safeSecure' }} passHref>
        <Box>
          {/* 読み込み中のalt属性が表示されるのが嫌なので、指定しない */}
          <Image src="../../../../static/SafeAndSecureThumbnail.jpg" alt="" />
        </Box>
      </Link>
    </Container>
  );
};
