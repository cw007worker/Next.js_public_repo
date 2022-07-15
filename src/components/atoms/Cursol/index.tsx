import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

type Props = {
  current: number;
  length: number;
  toSlide: (index: number) => void;
} & BoxProps;

export const Cursol: FC<Props> = ({ current, length, toSlide, ...rest }) => {
  return (
    <Box
      textAlign="center"
      css={css`
        & > :nth-of-type(1n):not(:last-child) {
          margin-right: 10px;
        }
      `}
      {...rest}
    >
      {[...Array(length)].map((_, i) => {
        if (i === current) {
          return <Dot key={i} variants="active" onClick={() => toSlide(i)} />;
        }
        return <Dot key={i} onClick={() => toSlide(i)} />;
      })}
    </Box>
  );
};

const Dot = styled.span<{ variants?: 'active' }>`
  border-radius: 50%;
  height: 6px;
  width: 6px;
  background-color: #e0e0e0;
  display: inline-block;
  ${(props) =>
    props.variants === 'active' &&
    `
    background-color: #767676;
  `}
`;
