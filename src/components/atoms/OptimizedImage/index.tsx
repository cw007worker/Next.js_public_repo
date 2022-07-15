//@file defaultの設定とかを後々設定できるようにnext/imageをただwrapしたコンポーネント
// https://nextjs.org/docs/api-reference/next/image
import Image, { ImageProps } from 'next/image';
import { forwardRef, useState, VFC } from 'react';

//@see https://github.com/vercel/next.js/issues/26735
export type Props = {
  fallbackSrc?: string;
  src: undefined | string;
} & Omit<ImageProps, 'src'>;

export const OptimizedImage: VFC<Props> = ({ fallbackSrc, src, ...rest }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // eslint-disable-next-line jsx-a11y/alt-text
  const showFallbackSrc =
    fallbackSrc !== undefined &&
    (!loaded || error || src === '' || src === undefined);
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      onError={() => {
        setError(true);
      }}
      //@ts-ignore
      src={showFallbackSrc ? fallbackSrc : src === undefined ? '' : src}
      onLoadingComplete={() => {
        setLoaded(true);
      }}
      {...rest}
    />
  );
};
