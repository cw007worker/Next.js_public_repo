import { Box, Center, Flex, FlexProps } from '@chakra-ui/layout';
import { IconButton } from 'components/atoms/IconButton';
import { HumbergerMenu } from 'components/molecules/Humberger';
import Link from 'next/link';
import router from 'next/router';
import { FC } from 'react';
import Logo from '../../../../static/Logo.svg';
import { CartIcon } from './CartIcon';
import { WithCounter } from 'components/atoms/WithCounter';
import { Heart } from 'components/atoms/Heart';
import { Image } from '@chakra-ui/image';
import { Coupon } from 'components/atoms/Coupon';

type Props = {
  name: string | undefined;
  cartItemCount: number | undefined;
  isMembership: boolean | undefined;
} & FlexProps;

export const Header: FC<Props> = ({
  isMembership,
  cartItemCount,
  name,
  ...rest
}) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      {...rest}
      height="60px"
    >
      <Flex alignItems="center">
        <Box w="80px" h="28px" />
        {/* 一旦アイコンは非表示にする */}
        {/* <HumbergerMenu isMembership={isMembership} name={name} />
        <Link
          href={{
            pathname: '/user/wishlist',
          }}
          passHref
        >
          <Center w="10">
            <Heart w="21px" />
          </Center>
        </Link> */}
      </Flex>
      <Link
        href={{
          pathname: '/',
        }}
        passHref
      >
        <Image src={Logo.src} alt="Logo" height="28px" width="82px" />
      </Link>
      <Flex alignItems="center">
        <Link
          href={{
            pathname: '/user/coupon',
          }}
          passHref
        >
          <Center w="10">
            <Coupon w="28px" h="28" />
          </Center>
        </Link>
        <WithCounter count={cartItemCount}>
          <IconButton
            icon={<CartIcon w="28px" />}
            aria-label="Cart"
            onClick={() => router.push('/cart')}
          />
        </WithCounter>
      </Flex>
    </Flex>
  );
};
