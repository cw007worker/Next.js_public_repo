import React from 'react';
import { Center, CenterProps } from '@chakra-ui/layout';
import { Heart } from 'components/atoms/Heart';
import { FilledHeart } from 'components/atoms/Heart/filled';

type Props = {
  onClick: () => void;
  disabled: boolean;
  inWishlist: boolean;
} & CenterProps;

export const FavoriteButton: React.FC<Props> = ({
  onClick,
  disabled,
  inWishlist,
  ...rest
}) => {
  return (
    <Center
      as="button"
      onClick={onClick}
      disabled={disabled}
      w="40px"
      h="40px"
      {...rest}
    >
      {inWishlist ? <FilledHeart w="25px" /> : <Heart w="25px" />}
    </Center>
  );
};
