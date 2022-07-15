import { BoxProps, Box, CSSObject } from '@chakra-ui/react';
import { FC } from 'react';

type Props = {
  layerProps?: CSSObject;
} & BoxProps;

export const LayerMast: FC<Props> = ({ children, layerProps, ...rest }) => {
  return (
    <Box
      position="relative"
      __css={{
        '&::after': {
          content: '""',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          ...layerProps,
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
