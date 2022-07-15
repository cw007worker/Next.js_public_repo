import React from 'react';
import { GetUnitsByTagResponse } from 'type/response/getUnitsByTag';
import { Pagenation } from 'type/viewModel/common/pagenation';
import { Tag } from 'type/viewModel/common/tag';
import { Unit } from 'type/viewModel/common/unitForProductList';
import { ProductListByTag } from 'type/viewModel/productListByTag';

export const toItemListWithTab = (
  res: GetUnitsByTagResponse
): ProductListByTag => {
  const units: Unit[] = res.units.map((unit) => {
    const imageUrls =
      unit.product.has_size || unit.product.has_variety
        ? unit.image_urls
        : unit.product.image_urls;
    return {
      unitId: unit.id,
      productId: unit.product.id,
      unitName: unit.name ?? undefined,
      brandName: unit.product.brand_name,
      productName: unit.product.name,
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

  const campaign = res.tag.campaign
    ? {
        startAt: res.tag.campaign.start_at,
        endAt: res.tag.campaign.end_at,
        isHeld: res.tag.campaign.is_held,
      }
    : null;

  const tag: Tag = {
    id: res.tag.id,
    name: res.tag.name,
    description: res.tag.description ?? undefined,
    campaign: campaign ?? undefined,
    units: units,
    type: res.tag.type,
  };

  const pagenation: Pagenation = {
    totalCount: res.pagenation.total_count,
    limitValue: res.pagenation.limit_value,
    totalPages: res.pagenation.total_pages,
    currentPage: res.pagenation.current_page,
    previousPage: res.pagenation.previous_page ?? undefined,
    nextPage: res.pagenation.next_page ?? undefined,
  };

  return { tag, pagenation };
};
