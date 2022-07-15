import { Box, BoxProps, chakra } from '@chakra-ui/react';
import { FC } from 'react';

type Props = { enabled: boolean } & BoxProps;
export const DisplayColorButton: FC<Props> = ({
  enabled,
  children,
  ...rest
}) => {
  return (
    <Box
      display="inline-flex"
      justifyItems="center"
      alignItems="center"
      cursor="pointer"
      {...rest}
    >
      {enabled ? (
        <IMG
          src="/CheckedCircleIcon.svg"
          display="inline-block"
          marginRight="5px"
        />
      ) : (
        <IMG
          src="/CheckCircleIcon.svg"
          display="inline-block"
          marginRight="5px"
        />
      )}
      {children}
      {/* <IMG src="/ArrowIcon.svg" display="inline-block" /> */}
    </Box>
  );
};

const IMG = chakra('img');
