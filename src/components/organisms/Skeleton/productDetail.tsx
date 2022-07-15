import {
  AspectRatio,
  Box,
  BoxProps,
  Center,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import React from 'react';

export const ProducteDetailSkeleton: React.VFC<BoxProps> = ({ ...props }) => {
  return (
    <Box bgColor="white" borderRadius="5px" position="relative" {...props}>
      <Skeleton h="332px" borderTopRadius="5px" borderBottomRadius={0}>
        <AspectRatio ratio={1}>
          <Center borderTopRadius="5px"></Center>
        </AspectRatio>
      </Skeleton>
      <Box>
        <SkeletonText noOfLines={1} h="30px" w="100px" p="2" />
      </Box>
      <Box>
        <SkeletonText noOfLines={1} h="30px" spacing='8' p="2" />
        <SkeletonText noOfLines={1} h="30px" w="100px" p="2" />
        <SkeletonText noOfLines={1} h="30px" w="100px" p="2" />
        <SkeletonText noOfLines={1} h="30px" w="250px" spacing='8' p="2" />
      </Box>
      <Box pt="20" px="20">
        <SkeletonText noOfLines={1} mx="auto" h="30px" spacing='8' p="2" />
      </Box>
      <Box>
        <SkeletonText noOfLines={1} h="30px" spacing='8' p="2" />
        <SkeletonText noOfLines={1} h="30px" spacing='8' p="2" />
        <SkeletonText noOfLines={1} h="30px" spacing='8' p="2" />
        <SkeletonText noOfLines={1} h="30px" spacing='8' p="2" />
      </Box>
    </Box>
  );
};
