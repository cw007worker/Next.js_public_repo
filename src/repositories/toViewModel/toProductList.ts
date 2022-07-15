import React from 'react';
import { GetProductsResponse } from 'type/response/getProducts';
import { GetUnitsResponse } from 'type/response/getUnits';
import { Item } from 'type/viewModel/common/item';
import { Pagenation } from 'type/viewModel/common/pagenation';
import { ItemList } from 'type/viewModel/itemList';

export const toProductList = (
  res: GetUnitsResponse | GetProductsResponse
): ItemList => {
  let items: Item[];
  if ('products' in res) {
    items = res.products.map((product) => {
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
  } else if ('units' in res) {
    items = res.units.map((unit) => {
      const imageUrls = unit.image_urls ?? unit.product.image_urls;
      return {
        unitId: unit.id,
        productId: unit.product.id,
        unitName: unit.name ?? undefined,
        productName: unit.product.name,
        brandName: unit.product.brand_name,
        // priceは今の所、unit間で値段の差異がないため、unitの値段をそのままproductの値段として表示する。
        price: unit.price,
        originalPrice: unit.original_price,
        discountRate: unit.discount_rate,
        purchaseRoute: unit.purchase_route,
        unitsStockCount: unit.stock,
        images:
          imageUrls !== null
            ? imageUrls.map((imageUrl, i) => ({
                alt: `${unit.name || unit.product.name}の画像${i}`,
                url: imageUrl,
              }))
            : undefined,
        varietyCount: undefined,
      };
    });
  } else {
    // TODO products も返せるようにする
    throw new Error('unitが存在しません。');
  }

  const pagenation: Pagenation = {
    totalCount: res.pagenation.total_count,
    limitValue: res.pagenation.limit_value,
    totalPages: res.pagenation.total_pages,
    currentPage: res.pagenation.current_page,
    previousPage: res.pagenation.previous_page ?? undefined,
    nextPage: res.pagenation.next_page ?? undefined,
  };

  return { items, pagenation };
};
