import React from 'react';
import Link from 'next/link';
import { AspectRatioProps, AspectRatio } from '@chakra-ui/layout';
import { OptimizedImage } from 'components/atoms/OptimizedImage';

type Props = {
  content: {
    image: {
      alt: string;
      src: string;
    };
    href?: {
      pathname: string;
      query?: any; // TODO: anyやめよう
    };
  };
} & AspectRatioProps;

export const BannerContent: React.VFC<Props> = ({ content, ...rest }) => {
  return (
    <React.Fragment>
      {content.href !== undefined ? (
        <Link
          key={content.image.alt}
          href={{
            pathname: content.href.pathname,
            query: content.href.query,
          }}
          passHref
        >
          <AspectRatio {...rest}>
            <OptimizedImage
              src={content.image.src}
              alt={content.image.alt}
              objectFit="contain"
              layout="fill"
            />
          </AspectRatio>
        </Link>
      ) : (
        <AspectRatio {...rest}>
          <OptimizedImage
            src={content.image.src}
            alt={content.image.alt}
            fallbackSrc="/Fallback/FallBackSmall.jpg"
            objectFit="contain"
            layout="fill"
            priority={true}
          />
        </AspectRatio>
      )}
    </React.Fragment>
  );
};
