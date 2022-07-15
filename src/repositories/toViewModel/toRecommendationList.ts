import { GetRecommendationsResponse } from 'type/response/getRecommendations';
import { Pagenation } from 'type/viewModel/common/pagenation';
import { Recommendation } from 'type/viewModel/common/recommendations';
import { RecommendationList } from 'type/viewModel/recommendationList';

export const toRecommendationList = (
  res: GetRecommendationsResponse
): RecommendationList => {
  const recommendations: Recommendation[] = res.units.map((unit) => {
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

  return {
    recommendations,
    pagenation,
  };
};
