import React from 'react';
import { Image } from '@chakra-ui/image';
import { AspectRatio, AspectRatioProps } from '@chakra-ui/react';
import Link from 'next/link';
import { BrandContent as BrandContentType } from 'type/common/brandContent';
import { OptimizedImage } from 'components/atoms/OptimizedImage';

type Props = {
  brandContent: BrandContentType;
  key: number;
} & AspectRatioProps;

export const BrandContent: React.VFC<Props> = ({ brandContent }) => {
  return (
    <Link
      href={{
        pathname: brandContent.href.pathname,
        query: brandContent.href.query,
      }}
      passHref
    >
      <AspectRatio borderRadius={2} ratio={1.343} overflow="hidden">
        <OptimizedImage
          src={brandContent.image.src}
          alt={brandContent.image.alt}
          objectFit="contain"
          layout="fill"
          fallbackSrc="/Fallback/FallbackRectangle.svg"
        />
      </AspectRatio>
    </Link>
  );
};
