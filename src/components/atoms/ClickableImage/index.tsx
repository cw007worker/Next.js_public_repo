import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import { SelectedIcon } from './SelectedIcon';

type Props = {
  isSelected: boolean;
} & BoxProps;

export const ClickableImage: FC<Props> = ({
  isSelected,
  children,
  ...boxProps
}) => {
  return (
    <Box
      width="100%"
      height="100%"
      objectFit="contain"
      position="relative"
      {...boxProps}
      __css={
        isSelected
          ? {
              '&::after': {
                content: '""',
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.8)',
                position: 'absolute',
                top: 0,
                left: 0,
              },
            }
          : undefined
      }
    >
      {children}
      {isSelected && (
        <Box
          position="absolute"
          width="50px"
          height="50px"
          margin="auto"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="9999999"
        >
          <SelectedIcon />
        </Box>
      )}
    </Box>
  );
};
