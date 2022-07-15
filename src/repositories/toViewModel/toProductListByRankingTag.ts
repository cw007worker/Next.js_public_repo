import { ProductListByRankingTag } from 'type/viewModel/productListByRankingTag';
import { GetProductsByRankingTagResponse } from 'type/response/getProductsByRankingTag';
import { Pagenation } from 'type/viewModel/common/pagenation';
import { RankingTag } from 'type/viewModel/common/rankingTag';
import { ProductForRanking } from 'type/viewModel/common/productForRanking';

export const toProductListByRankingTag = (
  res: GetProductsByRankingTagResponse
): ProductListByRankingTag => {
  const products: ProductForRanking[] = res.products.map((product, index) => {
    const imageUrls =
      product.has_size || product.has_variety
        ? product.unit.image_urls
        : product.image_urls;
    return {
      id: product.id,
      name: product.name,
      brandName: product.brand_name,
      images:
        imageUrls !== null
          ? imageUrls.map((imageUrl, i) => ({
              alt: `${product.name || product.unit.name}の画像${i}`,
              url: imageUrl,
            }))
          : undefined,
      description: product.description ?? undefined,
      hasVariety: product.has_variety,
      hasSize: product.has_size,
      unit: {
        unitId: product.unit.id,
        productId: product.id,
        unitName: product.unit.name ?? undefined,
        productName: product.name,
        brandName: product.brand_name,
        price: product.unit.price,
        originalPrice: product.unit.original_price,
        discountRate: product.unit.discount_rate,
        purchaseRoute: product.unit.purchase_route,
        unitsStockCount: product.units_stock_total_count,
        images:
          imageUrls !== null
            ? imageUrls.map((imageUrl, i) => ({
                alt: `${product.unit.name || product.name}の画像${i}`,
                url: imageUrl,
              }))
            : undefined,
      },
      ranking: index + 1,
    };
  });

  const rankingTag: RankingTag = {
    id: res.ranking_tag.id,
    name: res.ranking_tag.name,
    description: res.ranking_tag.description ?? undefined,
    products: products,
  };

  const pagenation: Pagenation = {
    totalCount: res.pagenation.total_count,
    limitValue: res.pagenation.limit_value,
    totalPages: res.pagenation.total_pages,
    currentPage: res.pagenation.current_page,
    previousPage: res.pagenation.previous_page ?? undefined,
    nextPage: res.pagenation.next_page ?? undefined,
  };

  return { rankingTag, pagenation };
};
