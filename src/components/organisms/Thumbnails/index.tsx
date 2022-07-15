import { Flex, Box, Image, FlexProps } from '@chakra-ui/react';
import { css } from '@emotion/react';
import React, { VFC } from 'react';
import { Thumbnail } from 'components/atoms/Thumbnail';

type Props = {
  images:
    | {
        alt: string;
        url: string;
      }[]
    | undefined;
  current: number;
  toSlide: (index: number) => void;
} & FlexProps;

const Component: VFC<Props> = ({ images, toSlide, current, ...rest }) => {
  return (
    <Flex
      css={css`
        & > :nth-of-type(n):not(:last-of-type) {
          margin-right: 18px;
        }
      `}
      overflowX={{ base: 'scroll', md: 'initial' }}
      flexWrap={{ base: 'unset', md: 'wrap' }}
      {...rest}
    >
      {images !== undefined &&
        images.map((image, i) => (
          <Thumbnail
            key={`${image.alt}-${i}`}
            onClick={() => toSlide(i)}
            varient={i === current ? 'active' : 'none'}
            src={image.url}
            alt={image.alt}
            boxSize="50px"
            objectFit="contain"
            cursor="pointer"
            fallbackSrc="../../../../static/Fallback.jpg"
          />
        ))}
    </Flex>
  );
};

export const Thumbanils = React.memo(Component);
