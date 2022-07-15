import { Box, BoxProps, chakra } from '@chakra-ui/react';
import { FC } from 'react';

type Props = BoxProps;
export const FilterButton: FC<Props> = ({ children, ...rest }) => {
  return (
    <Box
      display="inline-flex"
      justifyItems="center"
      alignItems="center"
      cursor="pointer"
      {...rest}
    >
      <IMG
        src="/FilterIcon.svg"
        display="inline-block"
        height="13.5px"
        width="13.5"
        marginRight="5px"
      />
      {children}
      <IMG src="/ArrowIcon.svg" display="inline-block" marginLeft="5px" />
    </Box>
  );
};

const IMG = chakra('img');
