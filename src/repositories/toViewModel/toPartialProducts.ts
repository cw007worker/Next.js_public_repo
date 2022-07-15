import { Unit } from 'type/viewModel/common/unitForProductList';
import { PartialUnits } from 'type/viewModel/partialUnits';
import { GetProductsByTagResponse } from 'type/response/getProductsByTag';
import { getPartialUnits } from '../getPartialUnits';

export const toPartialProducts = (
  res: GetProductsByTagResponse
): PartialUnits => {
  const { id, name, description, type } = res.tag;
  const campaign = res.tag.campaign
    ? {
        startAt: res.tag.campaign.start_at,
        endAt: res.tag.campaign.end_at,
        isHeld: res.tag.campaign.is_held,
      }
    : null;

  const units: Unit[] = res.products.map((product) => {
    const imageUrls =
      product.has_size || product.has_variety
        ? product.unit.image_urls
        : product.image_urls;
    return {
      unitId: product.unit.id,
      productId: product.id,
      unitName: product.unit.name ?? undefined,
      productName: product.name,
      brandName: product.brand_name,
      // priceは今の所、unit間で値段の差異がないため、unitの値段をそのままproductの値段として表示する。
      price: product.unit.price,
      originalPrice: product.unit.original_price,
      discountRate: product.unit.discount_rate,
      purchaseRoute: product.unit.purchase_route,
      unitsStockCount: product.units_stock_total_count,
      images:
        imageUrls !== null
          ? imageUrls.map((imageUrl, i) => ({
              alt: `${product.name || product.unit.name}の画像${i}`,
              url: imageUrl,
            }))
          : undefined,
      varietyCount: product.variety_count ?? undefined,
    };
  });

  return {
    id,
    name,
    description,
    campaign,
    units,
    type,
  };
};
