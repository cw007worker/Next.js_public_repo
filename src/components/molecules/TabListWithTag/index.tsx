import { Box, Flex } from '@chakra-ui/layout';
import { css } from '@emotion/react';
import React from 'react';

export const TabListWithTag: React.FC = ({ children }) => {
  return (
    <Box
      overflow="scroll"
      bg="white"
      zIndex="sticky"
      css={css`
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none;
        }
        position: sticky;
        top: 60px;
      `}
    >
      <Flex>{children}</Flex>
    </Box>
  );
};
