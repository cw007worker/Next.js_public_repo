import React from 'react';
import { AspectRatio, AspectRatioProps } from '@chakra-ui/layout';
import { OptimizedImage } from 'components/atoms/OptimizedImage';

export const ReleasePartyImage: React.VFC<AspectRatioProps> = (props) => {
  return (
    <AspectRatio {...props}>
      <OptimizedImage
        src="/SpringHasCome.png"
        alt="SpringHasCome"
        objectFit="contain"
        layout="fill"
        priority={true}
      />
    </AspectRatio>
  );
};
