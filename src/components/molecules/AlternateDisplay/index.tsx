import React, { FC } from 'react';
import { Grid, GridProps } from '@chakra-ui/react';
import { css } from '@emotion/react';

type Props = {
  type?: 'even' | 'odd';
} & GridProps;

export const AlternateDisplay: FC<Props> = ({
  children,
  type = 'odd',
  ...props
}) => {
  return (
    <Grid
      justifyContent="space-between"
      height="100%"
      alignItems="start"
      css={css`
        & > :nth-of-type(${type}) {
          align-self: end;
        }
        & > * {
          justify-self: center;
        }
      `}
      {...props}
    >
      {children}
    </Grid>
  );
};
