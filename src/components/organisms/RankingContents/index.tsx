import { AspectRatio, Box } from '@chakra-ui/layout';
import { PartialUnitsContentWithRanking } from 'components/organisms/PartialUnitsContent/withRanking';
import React from 'react';
import { RankingTag } from 'type/viewModel/common/rankingTag';

type Props = {
  contents: RankingTag[];
  handleMore: (tagId: number) => void;
};

export const RankingContents: React.VFC<Props> = ({ contents, handleMore }) => {
  return (
    <Box>
      {contents.map((content, i) => (
        <Box key={i} py="2.5">
          <PartialUnitsContentWithRanking
            rankingTag={content}
            handleMore={handleMore}
          />
        </Box>
      ))}
    </Box>
  );
};
