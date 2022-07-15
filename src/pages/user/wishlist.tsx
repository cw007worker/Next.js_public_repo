import { useWishlistPage } from 'hooks/pages/useWishlistPage';
import { WishlistTemplate } from 'components/templates/Wishlist';
import { LayoutWithBottomTab } from 'components/organisms/Layout/withBottomTab';

const Wishlist = () => {
  const { layoutState, wishlistState } = useWishlistPage();

  return (
    <LayoutWithBottomTab
      isMembership={layoutState.isMembership}
      name={layoutState.fullName}
      cartItemCount={layoutState.cartItemCount}
      currentPage={layoutState.currentPage}
    >
      <WishlistTemplate {...wishlistState} />
    </LayoutWithBottomTab>
  );
};

export default Wishlist;
