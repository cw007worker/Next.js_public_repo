import { GetUnitsResponse } from 'type/response/getUnits';
import { Unit } from 'type/viewModel/common/unitForProductList';

export const toUnits = (res: GetUnitsResponse): Unit[] => {
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

  return units;
};
