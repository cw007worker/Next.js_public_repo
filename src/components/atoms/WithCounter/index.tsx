import { FC, useMemo } from 'react';
import { BoxProps, Box } from '@chakra-ui/react';

type Props = {
  count: number | undefined;
} & BoxProps;

import { css } from '@emotion/react';

export const WithCounter: FC<Props> = ({ children, count, ...rest }) => {
  const formattedCount = useMemo(() => {
    return count === undefined
      ? undefined
      : count >= 99
      ? '"99"'
      : count <= 0
      ? '""'
      : `'${count}'`;
  }, [count]);
  return (
    <Box
      {...rest}
      css={
        count !== undefined &&
        count > 0 &&
        css`
          & > *:first-of-type {
            position: relative;
          }
          & > *::after {
            top: 4px;
            right: 5px;
            content: ${formattedCount};
            position: absolute;
            font-size: 10px;
            vertical-align: middle;
            text-align: center;
            width: 14px;
            height: 14px;
            color: white;
            background-color: #ff4c6c;
            border-radius: 50%;
          }
        `
      }
    >
      {children}
    </Box>
  );
};
