import { Box } from '@chakra-ui/react';
import React from 'react';

type Props = {
  isSelected: boolean;
  onClick: () => void;
};
export const CouponTab: React.FC<Props> = ({
  isSelected,
  onClick,
  children,
}) => {
  return (
    <Box
      as="button"
      h="40px"
      w="full"
      borderBottom="3px solid"
      borderColor={isSelected ? 'text.400' : 'white'}
      textStyle="h5"
      color={isSelected ? 'text.400' : 'text.300'}
      whiteSpace="nowrap"
      px="2"
      onClick={onClick}
    >
      {children}
    </Box>
  );
};
