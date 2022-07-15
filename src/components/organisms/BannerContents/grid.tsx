import React from 'react';
import { AspectRatio, SimpleGrid, SimpleGridProps } from '@chakra-ui/layout';
import { BannerContent } from 'components/organisms/BannerContent';

type Props = {
  contents: {
    image: {
      alt: string;
      src: string;
    };
    href?: {
      pathname: string;
      query?: any; // TODO: anyやめよう
    };
  }[];
} & SimpleGridProps;

export const GridBannerContents: React.VFC<Props> = ({ contents, ...rest }) => {
  return contents.length > 0 ? (
    <SimpleGrid columns={2} spacing="1" {...rest}>
      {contents.map((content, i) => (
        <React.Fragment key={i}>
          <BannerContent content={content} ratio={2.75} borderRadius="2px" />
        </React.Fragment>
      ))}
    </SimpleGrid>
  ) : null;
};
