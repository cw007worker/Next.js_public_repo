import { Flex, TextProps } from '@chakra-ui/layout';
import React, { forwardRef } from 'react';
import NextImage from 'next/image';
import PremiumVMark from '../../../../static/PremiumVMark.svg';
import { Price } from 'components/atoms/Price';

type Props = {
  children: string | number;
  iconSize?: number;
} & TextProps;
// export const PremiumPrice: React.FC<Props> = ({
//   children,
//   iconSize,
//   ...rest
// }) => {
//   return (
//     <Flex alignItems="center">
//       <NextImage
//         src={PremiumVMark}
//         alt="PremiumVMark"
//         width={iconSize || 14}
//         height={iconSize || 14}
//       />
//       <Price as="span" ml="1.5" {...rest}>
//         {children}
//       </Price>
//     </Flex>
//   );
// };

export const PremiumPrice = forwardRef<any, Props>(
  ({ iconSize, children, ...rest }, ref) => {
    return (
      <Flex alignItems="center" ref={ref}>
        <NextImage
          src={PremiumVMark}
          alt="PremiumVMark"
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

PremiumPrice.displayName = 'PremiumPrice';
