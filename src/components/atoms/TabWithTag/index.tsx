import { Box } from '@chakra-ui/layout';
import React from 'react';

type Props = {
  onClick: () => void;
  isSelected?: boolean;
};
export const TabWithTag: React.FC<Props> = ({
  onClick,
  isSelected = false,
  children,
}) => {
  return (
    <Box
      as="button"
      onClick={onClick}
      h="40px"
      borderBottom="3px solid"
      borderColor={isSelected ? 'text.400' : 'white'}
      textStyle={isSelected ? 'h5' : 'h7'}
      whiteSpace="nowrap"
      px="2"
      bg="white"
    >
      {children}
    </Box>
  );
};
