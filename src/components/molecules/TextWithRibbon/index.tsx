import React from 'react';
import { Text, TextProps } from '@chakra-ui/layout';

export const TextWithRibbon: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text
      bgImage="/FirstSale/Ribbon.svg"
      bgRepeat="no-repeat"
      h="43px"
      w="264px"
      fontSize="20px"
      fontWeight="bold"
      lineHeight="43px"
      textAlign="center"
      {...rest}
    >
      {children}
    </Text>
  );
};
