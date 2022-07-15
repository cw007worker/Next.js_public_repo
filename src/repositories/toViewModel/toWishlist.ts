import { GetWishlistResponse } from 'type/response/getWishlist';
import { Pagenation } from 'type/viewModel/common/pagenation';
import { Unit } from 'type/viewModel/common/unitForProductList';
import { Wishlist } from 'type/viewModel/wishlist';

export const toWishlist = (res: GetWishlistResponse): Wishlist => {
  const units: Unit[] = res.units.map((unit) => {
    const imageUrls =
      unit.product.has_size || unit.product.has_variety
        ? unit.image_urls
        : unit.product.image_urls;
    return {
      unitId: unit.id,
      productId: unit.product.id,
      unitName: unit.name ?? undefined,
      productName: unit.product.name,
      brandName: unit.product.brand_name,
      price: unit.price,
      originalPrice: unit.original_price,
      purchaseRoute: unit.purchase_route,
      unitsStockCount: unit.stock,
      images:
        imageUrls !== null
          ? imageUrls.map((imageUrl, i) => ({
              alt: `${unit.name || unit.product.name}の画像${i}`,
              url: imageUrl,
            }))
          : undefined,
    };
  });

  const pagenation: Pagenation = {
    totalCount: res.pagenation.total_count,
    limitValue: res.pagenation.limit_value,
    totalPages: res.pagenation.total_pages,
    currentPage: res.pagenation.current_page,
    previousPage: res.pagenation.previous_page ?? undefined,
    nextPage: res.pagenation.next_page ?? undefined,
  };

  return { units, pagenation };
};
