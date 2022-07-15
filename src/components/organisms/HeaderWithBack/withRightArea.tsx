import { Text, Box, Flex, FlexProps, Center } from '@chakra-ui/layout';
import Link from 'next/link';
import { IconButton } from 'components/atoms/IconButton';
import { CartIcon } from 'components/organisms/Header/CartIcon';
import { WithCounter } from 'components/atoms/WithCounter';
import React from 'react';
import Image from 'next/image';
import LeftVector from '../../../../static/LeftVector.svg';
import Logo from '../../../../static/Logo.svg';
import router from 'next/router';

type Props = {
  handleBack?: () => void;
  cartItemCount: number | undefined;
  headerPageTitle?: string;
} & FlexProps;
export const HeaderWithBackWithRightArea: React.FC<Props> = ({
  handleBack,
  cartItemCount,
  headerPageTitle,
  ...rest
}) => {
  const initialHandleBack = () => {
    router.back();
  };
  return (
    <Flex justifyContent="space-between" alignItems="center" h="60px" {...rest}>
      <IconButton
        icon={
          <Image
            src={LeftVector}
            alt="LeftVector button"
            objectFit="contain"
            height="28px"
          />
        }
        aria-label="LeftVector"
        onClick={handleBack || initialHandleBack}
      />
      <Link
        href={{
          pathname: '/',
        }}
        passHref
      >
        {headerPageTitle ? (
          <Text textStyle="h4">{headerPageTitle}</Text>
        ) : (
          <Image src={Logo.src} alt="Logo" height="28px" width="82px" />
        )}
      </Link>
      <Flex alignItems="center">
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
