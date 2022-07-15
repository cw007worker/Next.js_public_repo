import {
  AspectRatio,
  Box,
  BoxProps,
  Center,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import React from 'react';

export const ProductCardSkeleton: React.VFC<BoxProps> = ({ ...props }) => {
  return (
    <Box bgColor="white" borderRadius="5px" position="relative" {...props}>
      <Skeleton borderTopRadius="5px" borderBottomRadius={0}>
        <AspectRatio ratio={1}>
          <Center borderTopRadius="5px"></Center>
        </AspectRatio>
      </Skeleton>
      <Box p="2">
        <SkeletonText noOfLines={1} h="18px" mb="2" />
        <SkeletonText noOfLines={2} />
      </Box>
    </Box>
  );
};
