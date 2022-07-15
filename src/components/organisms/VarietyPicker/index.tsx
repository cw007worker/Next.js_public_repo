import { Flex, Box, Text, FlexProps } from '@chakra-ui/react';
import { VarietyChip } from 'components/molecules/VarietyChip';
import { css } from '@emotion/react';
import React, { VFC } from 'react';
type Props = {
  varieties: {
    type: string;
    name: string;
    image:
      | {
          alt: string;
          url: string;
        }
      | undefined;
    totalStock: number;
    disabled: boolean;
    selected: boolean;
  }[];
  setVarietyChoice: (varietyChoice: string, varietyType: string) => void;
} & FlexProps;

const Component: VFC<Props> = ({ varieties, setVarietyChoice, ...rest }) => {
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
      {varieties.map((variety) => (
        <Box key={variety.name}>
          <VarietyChip
            variety={variety}
            onClick={() => setVarietyChoice(variety.name, variety.type)}
          />
        </Box>
      ))}
    </Flex>
  );
};

export const ValietyPicker = React.memo(Component);
