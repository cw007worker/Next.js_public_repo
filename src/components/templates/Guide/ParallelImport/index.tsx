import { Fragment, memo, VFC } from 'react';
import Link from 'next/link';
import { Image } from '@chakra-ui/image';
import { Box, Text, AspectRatio } from '@chakra-ui/layout';
import { BannerContent } from 'components/organisms/BannerContent';
import { Button } from 'components/atoms/Button';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { QuestionAnswerForGuide } from 'components/organisms/QuestionAnswer/forGuide';
import {
  PARALLEL_IMPORT_CONTENTS,
  bannerContentsInParallelImportPage,
} from 'constants/parallelImportContents';
import { GridBannerContents } from 'components/organisms/BannerContents/grid';

type Props = {
  handleBack: () => void;
};

const Component: VFC<Props> = (props) => {
  return (
    <Fragment>
      <Box maxW="container.sm" mx="auto">
        <Box bg="#FFF7DA">
          <Image src="/GuidePage/ParallelImport/FirstView.jpg" />
          <Image src="/GuidePage/ParallelImport/Answer.jpg" />
        </Box>
        <Box px="20px" pb="60px">
          <Box pt="30px" pb="10px">
            <Image src="/GuidePage/ParallelImport/Example.jpg" />
          </Box>
          <Box pt="30px">
            <Text textStyle="h5">
              空港の免税店では日本国内のブランド直営店よりも安い価格で商品が購入できるように、日本国内よりも安い価格で販売している海外で買い付けをおこない輸入販売することで、よりお求めやすい価格で販売することができる仕入れ方法です。
            </Text>
          </Box>
        </Box>
        {PARALLEL_IMPORT_CONTENTS.map((content, i) => (
          <QuestionAnswerForGuide
            key={i}
            image={
              content.image !== undefined
                ? {
                    alt: `QuestionImage${i}`,
                    src: content.image,
                  }
                : undefined
            }
            questionText={content.questionText}
            answers={content.answers}
          />
        ))}
        <Box textAlign="center" px="20px" pt="40px" pb="40px">
          <Box pb="30px" px="20px">
            <Text textStyle="h4" textAlign="center">
              お買い物の準備はいいですか？
            </Text>
          </Box>
          <Box pb="30px">
            <Link href={'/'} passHref>
              <Button width="100%" minHeight="48px">
                ホームへ戻る
              </Button>
            </Link>
          </Box>
          <Box pb="30px">
            <Button
              width="100%"
              minHeight="48px"
              bg="gray"
              onClick={props.handleBack}
            >
              前のページへ戻る
            </Button>
          </Box>
        </Box>
      </Box>
      {bannerContentsInParallelImportPage.map((content, i) => (
        <AspectRatio key={i} id={content.image.alt} ratio={1.1574}>
          <BannerContent content={content} />
        </AspectRatio>
      ))}
    </Fragment>
  );
};

export const ParallelImportTemplate = memo(Component);
