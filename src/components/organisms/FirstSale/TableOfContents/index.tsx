import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/layout';
import RoundedButton from 'components/atoms/RoundedButton';
import React from 'react';
import { TableOfContentsButton } from './button';
import Link from 'next/link';
import { TableOfContentsButtonHalf } from './buttonHalf';

const CONTENTS: {
  title: string;
  id: string;
}[] = [
  {
    title: '新春SALE',
    id: 'springSale',
  },
  {
    title: '新春人気商品ランキング',
    id: 'popularityRanking',
  },
  {
    title: '殿堂入りコスメ',
    id: 'hallOfFame',
  },
  {
    title: 'SNSで話題のコスメ',
    id: 'hotTopicOnSns',
  },
  {
    title: '香水',
    id: 'bannerFirstSaleFragrance',
  },
];

const MINI_CONTENTS: {
  title: string;
  id: string;
}[] = [
  // {
  //   title: "香水",
  //   id: "bannerFirstSaleFragrance",
  // },
  // {
  //   title: "バッグ・シューズ　　",
  //   id: "bagsAndShoes",
  // },
];

export const FirstSaleTableOfContents = () => {
  return (
    <Box bgColor="#F3E8CB">
      <Box
        bgImage="/FirstSale/GoldGrainLighter.svg"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPos="top"
        p="6"
      >
        <Text
          fontSize="15px"
          fontWeight="bold"
          lineHeight="26px"
          textAlign="center"
          mb="10"
        >
          2022新春セール第1弾開催！
          <br />
          初売りに乗り遅れた人も大丈夫！
          <br />
          正直、買えば買うほど赤字です。
          <br />
        </Text>
        <Box maxW="325px" mx="auto">
          <VStack spacing={3.5} align="stretch" mb="3.5">
            {CONTENTS.map((content, i) => (
              <Box key={i}>
                <Link href={`#${content.id}`} passHref>
                  <TableOfContentsButton mx="auto">
                    {content.title}
                  </TableOfContentsButton>
                </Link>
              </Box>
            ))}
          </VStack>
          <SimpleGrid columns={2} spacingX="2" spacingY="3.5" mx="auto">
            {MINI_CONTENTS.map((content, i) => (
              <Box key={i}>
                <Link href={`#${content.id}`} passHref>
                  <TableOfContentsButtonHalf>
                    {content.title}
                  </TableOfContentsButtonHalf>
                </Link>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};
