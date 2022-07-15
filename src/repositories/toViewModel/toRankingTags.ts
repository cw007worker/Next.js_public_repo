import { GetRankingTagsResponse } from 'type/response/getRankingTags';
import { ProductForRanking } from 'type/viewModel/common/productForRanking';
import { RankingTag } from 'type/viewModel/common/rankingTag';
export const toRankingTags = (res: GetRankingTagsResponse): RankingTag[] => {
  const rankingTags: RankingTag[] = res.ranking_tags.map((r) => {
    const products: ProductForRanking[] = [];

    r.products.map((p, index) => {
      const imageUrls =
        p.has_size || p.has_variety ? p.unit.image_urls : p.image_urls;

      products.push({
        id: p.id,
        name: p.name,
        brandName: p.brand_name,
        description: p.description || undefined,
        hasSize: p.has_size,
        hasVariety: p.has_variety,
        images:
          imageUrls !== null
            ? imageUrls.map((imageUrl, i) => ({
                alt: `${p.unit.name || p.name}の画像${i}`,
                url: imageUrl,
              }))
            : undefined,
        unit: {
          unitId: p.unit.id,
          productId: p.id,
          unitName: p.unit.name ?? undefined,
          productName: p.name,
          brandName: p.brand_name,
          price: p.unit.price,
          originalPrice: p.unit.original_price,
          discountRate: p.unit.discount_rate,
          purchaseRoute: p.unit.purchase_route,
          unitsStockCount: p.units_stock_total_count,
          images:
            imageUrls !== null
              ? imageUrls.map((imageUrl, i) => ({
                  alt: `${p.unit.name || p.name}の画像${i}`,
                  url: imageUrl,
                }))
              : undefined,
        },
        ranking: index + 1,
      });
    });

    return {
      id: r.id,
      name: r.name,
      description: r.description ?? undefined,
      products,
    };
  });

  return rankingTags;
};
