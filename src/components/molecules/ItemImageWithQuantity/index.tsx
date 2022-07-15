import { AspectRatio, AspectRatioProps, Box, Image } from '@chakra-ui/react';
import { ItemQuantity } from 'components/atoms/ItemQuantity';
import React from 'react';

type Props = {
  image: { url: string; alt: string } | undefined;
  quantity: number;
} & AspectRatioProps;
export const ItemImageWithQuantity: React.VFC<Props> = ({
  image,
  quantity,
  ...rest
}) => {
  return (
    <AspectRatio ratio={1} position="relative" {...rest}>
      <Box>
        <Image src={image && image.url} alt={image && image.alt} />
        <ItemQuantity
          quantity={quantity}
          position="absolute"
          bottom="2.5"
          right="2.5"
        />
      </Box>
    </AspectRatio>
  );
};
