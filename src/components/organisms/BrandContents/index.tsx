import { Box, BoxProps, SimpleGrid, Text } from '@chakra-ui/layout';
import { HookState } from 'hooks/useBrandContents';
import React from 'react';
import { BrandContent } from 'components/molecules/BrandContent';

type Props = {
  title?: string;
} & HookState &
  BoxProps;

export const BrandContents: React.VFC<Props> = ({
  title,
  brandContentList,
  ...rest
}) => {
  return (
    <Box bg="bg.200" pb="5" px="2.5" {...rest}>
      <Box py="4">
        <Text textAlign="center" textStyle="h4">
          {title || '主なブランドから探す'}
        </Text>
      </Box>
      <SimpleGrid columns={4} spacing="1">
        {brandContentList &&
          brandContentList.map((brandContent, index) => (
            <BrandContent brandContent={brandContent} key={index} />
          ))}
      </SimpleGrid>
    </Box>
  );
};
