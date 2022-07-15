import { Box, BoxProps, Center, Text } from '@chakra-ui/layout';
import React from 'react';
import { FirstRankingLabel } from './first';
import { OtherRankingLabel } from './other';
import { SecondRankingLabel } from './second';
import { ThirdRankingLabel } from './third';

type Props = {
  ranking: number;
} & BoxProps;

export const RankingLabel: React.VFC<Props> = ({ ranking, ...rest }) => {
  return (
    <Box {...rest}>
      <Box w="37px" h="24px" position="relative">
        <Box position="absolute" top="0" left="0">
          {ranking === 1 ? (
            <FirstRankingLabel w="37px" h="24px" />
          ) : ranking === 2 ? (
            <SecondRankingLabel w="37px" h="24px" />
          ) : ranking === 3 ? (
            <ThirdRankingLabel w="37px" h="24px" />
          ) : (
            <OtherRankingLabel w="37px" h="24px" />
          )}
        </Box>
        <Center w="37px" h="15px" pt="5px" position="absolute" top="0" left="0">
          <Text
            fontSize="10px"
            fontWeight="bold"
            lineHeight="15px"
            color="white"
          >
            {ranking}
          </Text>
        </Center>
      </Box>
    </Box>
  );
};
