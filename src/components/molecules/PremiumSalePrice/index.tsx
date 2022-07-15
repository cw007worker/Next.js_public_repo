import { Flex, TextProps } from '@chakra-ui/layout';
import React, { forwardRef } from 'react';
import NextImage from 'next/image';
import { Price } from 'components/atoms/Price';

type Props = {
  children: string | number;
  iconSize?: number;
} & TextProps;

export const PremiumSalePrice = forwardRef<any, Props>(
  ({ iconSize, children, ...rest }, ref) => {
    return (
      <Flex alignItems="center" ref={ref}>
        <NextImage
          src="/PremiumSaleVMark.svg"
          alt="PremiumSaleVMark"
          width={iconSize || 14}
          height={iconSize || 14}
        />
        <Price as="span" ml="1.5" {...rest}>
          {children}
        </Price>
      </Flex>
    );
  }
);

PremiumSalePrice.displayName = 'PremiumSalePrice';
