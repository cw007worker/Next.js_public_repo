import {
  AspectRatio,
  Box,
  BoxProps,
  Center,
  Flex,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import React from 'react';

export const PartialUnitsContentSkeleton: React.VFC<BoxProps> = (...props) => {
  return (
    <Box px="2.5" py="4" bg="bg.100">
      <Box px="1" mb="5">
        <SkeletonText noOfLines={2} spacing="2" />
      </Box>
      <SimpleGrid columns={3} spacing={4} px="1" mb="6">
        {[...Array(6)].map((_, i) => (
          <Box key={i}>
            <Skeleton>
              <AspectRatio ratio={1} mb="1">
                <Center borderTopRadius="5px"></Center>
              </AspectRatio>
            </Skeleton>
            <SkeletonText />
          </Box>
        ))}
      </SimpleGrid>
      <Skeleton h="12" />
    </Box>
  );
};
