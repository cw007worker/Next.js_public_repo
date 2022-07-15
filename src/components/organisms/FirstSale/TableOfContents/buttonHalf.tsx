import { Button, ButtonProps } from '@chakra-ui/button';
import {
  AspectRatio,
  AspectRatioProps,
  Box,
  Center,
  Text,
  TextProps,
} from '@chakra-ui/layout';
import React from 'react';
import { TableOfContentsVector } from './vector';

export const TableOfContentsButtonHalf: React.FC<AspectRatioProps> = ({
  children,
  ...rest
}) => {
  return (
    <AspectRatio
      ratio={3.2917}
      bgImage="/FirstSale/GorgeousButtonHalf.svg"
      bgRepeat="no-repeat"
      bgSize="contain"
      {...rest}
    >
      <Center position="relative">
        <Text color="white" textStyle="h8" fontWeight="bold">
          {children}
        </Text>
        <Center h="full" position="absolute" top="0" right="3.5">
          <TableOfContentsVector w="5" h="5" />
        </Center>
      </Center>
    </AspectRatio>
  );
};
