import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import {
  OptimizedImage,
  Props as OptimizedImageProps,
} from 'components/atoms/OptimizedImage';
import { VFC } from 'react';
import { UrlObject } from 'url';

type AccordingLinkImageProps = {
  href: string | UrlObject;
  name: string;
  imagePath: string;
  alt: string;
} & OptimizedImageProps;

export const AccordingLinkImage: VFC<AccordingLinkImageProps> = ({
  href,
  name,
  imagePath,
  alt,
  ...rest
}) => {
  return (
    <Link passHref href={href}>
      <Box position="relative" w="full" h="full">
        <OptimizedImage alt={alt} {...rest} />
      </Box>
    </Link>
  );
};
