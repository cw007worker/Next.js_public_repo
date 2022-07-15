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
import { SearchBar } from 'components/molecules/SearchBar';
import { SearchForm } from '../SearchForm';

type Props = {
  handleBack?: () => void;
  cartItemCount: number | undefined;
  headerPageTitle?: string;
  keyword?: string;
} & FlexProps;
export const HeaderWithBackWithSearchBar: React.FC<Props> = ({
  handleBack,
  cartItemCount,
  headerPageTitle,
  keyword,
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
      <SearchForm mx="1.5" w="full" keyword={keyword} />
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
