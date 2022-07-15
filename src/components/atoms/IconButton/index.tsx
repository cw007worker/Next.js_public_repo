import { IconButton as _IconButton } from '@chakra-ui/react';
import { IconButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

export const IconButton: FC<IconButtonProps> = (props) => {
  return (
    <_IconButton
      bg="none"
      _hover={{ bg: 'none' }}
      _focus={{ bg: 'none' }}
      {...props}
    />
  );
};
