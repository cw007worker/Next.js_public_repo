import { Text, AspectRatio, Box, Center } from '@chakra-ui/layout';
import { PartialUnitsContentWithRanking } from 'components/organisms/PartialUnitsContent/withRanking';
import React from 'react';
import { RankingTag } from 'type/viewModel/common/rankingTag';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { css } from '@emotion/react';

type Props = {
  image:
    | {
        alt: string;
        src: string;
      }
    | undefined;
  questionText: String;
  answers: {
    main: String;
    sub: String;
  }[];
};

export const QuestionAnswerForGuide: React.VFC<Props> = ({
  image,
  questionText,
  answers,
}) => {
  return (
    <Box px="20px" pt="80px">
      <Box
        display="flex"
        justifyContent="space-between"
        bg="#FF782C"
        pl="7px"
        pr="10px"
        py="10px"
        mb="20px"
        borderRadius={'10px'}
        borderBottomLeftRadius={'2px'}
      >
        <Box minWidth="24px" height="20px" position="relative">
          <OptimizedImage
            src="/GuidePage/ParallelImport/Question.svg"
            layout="fill"
          />
        </Box>
        <Text textStyle="h4" color="white" fontWeight="bold" pl="8px">
          {questionText}
        </Text>
      </Box>
      {image !== undefined && (
        <Box width="100%" height="160px" position="relative">
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            objectFit="contain"
            layout="fill"
          />
        </Box>
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        bg="#FFF7DA"
        pl="7px"
        pr="10px"
        py="10px"
      >
        <Box minWidth="24px" height="20px" position="relative">
          <OptimizedImage
            src="/GuidePage/ParallelImport/Answer.svg"
            layout="fill"
          />
        </Box>
        <Box pl="8px">
          {answers.map((answer, i) => (
            <Box pb="10px" key={i}>
              <Text
                textStyle="h4"
                color="black"
                pb="2px"
                css={{
                  whiteSpace: 'pre-line',
                }}
              >
                {answer.main}
              </Text>
              <Text
                textStyle="h7"
                color="black"
                css={{
                  whiteSpace: 'pre-line',
                }}
              >
                {answer.sub}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
