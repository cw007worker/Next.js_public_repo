import { Box, Link, SimpleGrid, Text } from '@chakra-ui/layout';
import { Link as _Link } from '@chakra-ui/react';
import React from 'react';
import { showChannelTalk } from 'utils/channelTalk';

export const Footer = () => {
  return (
    <Box bg="text.400" p="5">
      <Box maxW="container.lg" mx="auto">
        <SimpleGrid spacing="2.5" columns={[2, null, 4]} mb="5">
          <Link href="https://www.notion.so/parchie/87f54db8dc3c434c94fdd649ffd20179">
            <Text textStyle="h7" color="text.200">
              特定商取引法
            </Text>
          </Link>
          <Link href="https://www.notion.so/parchie/2f4eae21c4a044ae87653e599f2395f5">
            <Text textStyle="h7" color="text.200">
              プライバシーポリシー
            </Text>
          </Link>
          <Link href="https://www.notion.so/parchie/89ab836bf6a04f3899321ba5272a7c83">
            <Text textStyle="h7" color="text.200">
              利用規約
            </Text>
          </Link>
          <Link onClick={showChannelTalk}>
            <Text textStyle="h7" color="text.200">
              お問い合わせ
            </Text>
          </Link>
        </SimpleGrid>
        <Text textStyle="h9" color="text.200">
          2021 © parchie Corporation. All rights reserved.︎
        </Text>
      </Box>
    </Box>
  );
};
