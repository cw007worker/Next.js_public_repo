import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react';

type Props = BoxProps;

export const TransparentBlackLayer: FC<Props> = ({ children, ...rest }) => {
  return (
    <Box
      height="100%"
      width="100%"
      top="0"
      left="0"
      position="fixed"
      bgColor="black"
      opacity="0.5"
      zIndex="overlay"
      {...rest}
    >
      {children}
    </Box>
  );
};
