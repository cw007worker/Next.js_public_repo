import { Box, BoxProps, chakra } from '@chakra-ui/react';
import { FC } from 'react';

type Props = BoxProps;
export const SortButton: FC<Props> = ({ children, ...rest }) => {
  return (
    <Box
      display="inline-flex"
      justifyItems="center"
      alignItems="center"
      cursor="pointer"
      {...rest}
    >
      <IMG src="/SortIcon.svg" display="inline-block" marginRight="5px" />
      {children}
    </Box>
  );
};

const IMG = chakra('img');
