import { AspectRatio, Box } from '@chakra-ui/layout';
import { TextWithRibbon } from 'components/molecules/TextWithRibbon';
import { PartialUnitsContentWithRanking } from 'components/organisms/PartialUnitsContent/withRanking';
import Image from 'next/image';
import React from 'react';
import { RankingTag } from 'type/viewModel/common/rankingTag';

type Props = {
  contents: RankingTag[];
  handleMore: (tagId: number) => void;
};

export const FirstSaleRankingContents: React.VFC<Props> = ({
  contents,
  handleMore,
}) => {
  return (
    <Box bgColor="#F3E8CB">
      <Box
        py="6"
        bgImage="/FirstSale/NiceBg.svg"
        bgRepeat="no-repeat"
        bgSize="contain"
        bgPos="top"
      >
        <Box px="10" pb="5">
          <AspectRatio ratio={3.6533} maxW="275px" mx="auto">
            <Image
              src="/FirstSale/RankingTitle.svg"
              alt="2022最新人気商品ランキング"
              layout="fill"
              objectFit="contain"
            />
          </AspectRatio>
        </Box>
        {contents.map((content, i) => (
          <Box key={i} py="2.5">
            <PartialUnitsContentWithRanking
              rankingTag={content}
              handleMore={handleMore}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
