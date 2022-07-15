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

export const TableOfContentsButton: React.FC<AspectRatioProps> = ({
  children,
  ...rest
}) => {
  return (
    <AspectRatio
      ratio={6.7708}
      bgImage="/FirstSale/GorgeousButton.svg"
      bgRepeat="no-repeat"
      bgSize="contain"
      {...rest}
    >
      <Center position="relative">
        <Text color="white" textStyle="h5">
          {children}
        </Text>
        <Center h="full" position="absolute" top="0" right="6">
          <TableOfContentsVector w="5" h="5" />
        </Center>
      </Center>
    </AspectRatio>
  );
};
