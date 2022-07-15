import Link from 'next/link';
import { Box, Text, Link as ChakraLink } from '@chakra-ui/react';
import { chakra, ChakraComponent } from '@chakra-ui/react';

// TODO: 複数箇所で使われていて、とりあえず切り出しただけなので、汎用性のある形にする
export const LoginBox = () => {
  return (
    <Box>
      <Text textStyle="h6" mb="3" textAlign="center">
        既に登録済みの方は
        <Link href={{ pathname: '/auth/signIn' }} passHref>
          <ChakraLink textDecoration="underline" color="action.attention2">
            こちら
          </ChakraLink>
        </Link>
      </Text>
    </Box>
  );
};
