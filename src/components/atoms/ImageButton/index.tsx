import { Image, Box, BoxProps, chakra } from '@chakra-ui/react';
import { FC } from 'react';

type Props = {
  image: { alt: string; url: string } | undefined;
  varient?: 'none' | 'selected' | 'disabled';
} & BoxProps;

export const ImageButton: FC<Props> = ({ image, ...rest }) => {
  return image !== undefined ? (
    <Box
      as="button"
      {...(rest.varient === 'disabled'
        ? {
            pointerEvents: 'none',
            opacity: '0.4',
            cursor: 'not-allowed',
          }
        : rest.varient === 'selected'
        ? {
            outline: '2px solid #3797EF',
            outlineOffset: '2px',
          }
        : '')}
      {...rest}
    >
      <Image
        src={image.url}
        alt={image.alt}
        borderRadius="full"
        fallbackSrc="../../../../static/Fallback.jpg"
      />
    </Box>
  ) : (
    //TODO: 何かしらdefault画像を入れる
    <p>画像がありません</p>
  );
};
