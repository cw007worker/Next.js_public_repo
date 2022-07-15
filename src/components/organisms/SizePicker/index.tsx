import { Flex, FlexProps } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { SizeChip } from 'components/molecules/SizeChip';
import React, { VFC } from 'react';

type Props = {
  sizes: {
    name: string;
    totalStock: number;
    disabled: boolean;
    selected: boolean;
  }[];
  setSizeChoice: (size: string) => void;
} & FlexProps;

const Component: VFC<Props> = ({ sizes, setSizeChoice, ...rest }) => {
  return (
    <Flex
      css={css`
        & > :nth-of-type(n):not(:last-of-type) {
          margin-right: 18px;
        }
      `}
      overflowX={{ base: 'scroll', md: 'initial' }}
      p="4px"
      flexWrap={{ base: 'unset', md: 'wrap' }}
      {...rest}
    >
      {sizes.map((size, i) => (
        <SizeChip
          key={`${size.name}-${i}`}
          size={size}
          onClick={() => setSizeChoice(size.name)}
        />
      ))}
    </Flex>
  );
};

export const SizePicker = React.memo(Component);
