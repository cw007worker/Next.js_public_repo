import { Button } from 'components/atoms/Button';
import { FixedButtonWrapper } from 'components/atoms/FixedButtonWrapper';
import { FavoriteButton } from 'components/molecules/FavoriteButton';
import React from 'react';

type Props = {
  isSoldOut: boolean | undefined;
  handleAddCart: () => void;
  disableAddCartBtn: boolean;
  isLoadingAddCartBtn: boolean;
  handleUpdateWishlist: () => void;
  isLoadingUpdateWishlistBtn: boolean;
  inWishlist: boolean;
};

export const ProductDetailFixedButtons: React.VFC<Props> = ({
  isSoldOut,
  handleAddCart,
  disableAddCartBtn,
  isLoadingAddCartBtn,
  handleUpdateWishlist,
  isLoadingUpdateWishlistBtn,
  inWishlist,
}) => {
  return (
    <FixedButtonWrapper>
      <FavoriteButton
        onClick={handleUpdateWishlist}
        disabled={isLoadingUpdateWishlistBtn}
        inWishlist={inWishlist}
        mr="3"
      />
      {isSoldOut ? (
        <Button
          onClick={handleAddCart}
          disabled={true}
          isLoading={isLoadingAddCartBtn}
          width="100%"
          maxWidth="325px"
          minHeight="48px"
          bg="text.100"
          color="text.300"
        >
          完売しました
        </Button>
      ) : (
        <Button
          onClick={handleAddCart}
          disabled={disableAddCartBtn}
          isLoading={isLoadingAddCartBtn}
          width="100%"
          maxWidth="325px"
          minHeight="48px"
        >
          カートに入れる
        </Button>
      )}
    </FixedButtonWrapper>
  );
};
