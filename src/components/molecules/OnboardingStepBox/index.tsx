import { Box, Text } from '@chakra-ui/react';
import { BoxProps } from '@material-ui/core';
import { Fragment, FC } from 'react';

export type Status = 'processed' | 'complete' | 'unprocessed';

type Props = { status: Status };

export const OnboardingStepBox: FC<Props> = ({ children, status }) => {
  return (
    <Fragment>
      {status === 'processed' ? (
        <Box
          borderRadius="2"
          p="10px"
          border="2px solid"
          borderColor="primary.100"
        >
          {children}
        </Box>
      ) : status === 'unprocessed' ? (
        <Box
          borderRadius="2"
          p="10px"
          border="1px solid"
          borderColor="text.100"
        >
          {children}
        </Box>
      ) : status === 'complete' ? (
        <Box borderRadius="2" p="10px" bg="primary.100">
          {children}
        </Box>
      ) : undefined}
    </Fragment>
  );
};
