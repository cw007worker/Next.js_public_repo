import React from 'react';
import { Image } from '@chakra-ui/react';
import { Box, Text } from '@chakra-ui/layout';
import { TagInfo } from 'type/viewModel/common/tagInfo';
import { ReleasePartyImage } from 'components/molecules/ReleasePartyImage';
import { TimeLeftCounter } from 'components/molecules/TimeLeftCounter';

type Props = {
  tagInfo: TagInfo | undefined;
  isReleaseParty: boolean;
};

export const ProductListHeadLayout: React.VFC<Props> = ({
  tagInfo,
  isReleaseParty,
}) => {
  return (
    <React.Fragment>
      {isReleaseParty && (
        <Image
          src="/SpringNewlyProductsImage.jpg"
          alt="ReleaseParty"
          objectFit="contain"
          layout="fill"
        />
      )}
      {!isReleaseParty && tagInfo && tagInfo.image !== undefined && (
        <Image
          src={tagInfo.image.src}
          alt={tagInfo.image.alt}
          objectFit="contain"
          layout="fill"
        />
      )}
      <Box py="2">
        {isReleaseParty &&
        tagInfo?.campaign !== undefined &&
        tagInfo.campaign.isHeld ? (
          <TimeLeftCounter
            endAt={tagInfo.campaign.endAt}
            justifyContent="center"
          />
        ) : (
          <Text textStyle="h5" px="2.5">
            {tagInfo?.name}の商品一覧
          </Text>
        )}
        <Text textStyle="h8" px="2.5">
          {tagInfo?.description}
        </Text>
      </Box>
    </React.Fragment>
  );
};
