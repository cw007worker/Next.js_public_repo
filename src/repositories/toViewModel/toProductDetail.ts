import {
  UniqueUnit,
  DefaultUnit,
  UniqueUnitWithAll,
  UniqueUnitWithSizes,
  UniqueUnitWithVarieties,
} from 'type/viewModel/common/unit';
import {
  ProductDetailWithDefaultUnit,
  ProductDetailWithUniqueUnit,
} from 'type/viewModel/productDetail';
import { GetProductResponse } from 'type/response/getProduct';
import { isDefaultUnit, isUniqueUnit } from 'type/response/partial/unit';
import { Size } from 'type/viewModel/common/size';
import { Variety } from 'type/viewModel/common/variety';

export const toProductDetail = (
  res: GetProductResponse
): ProductDetailWithDefaultUnit | ProductDetailWithUniqueUnit => {
  const uniqueUnitWithAll = new Map<string, UniqueUnitWithAll>();
  const uniqueUnitWithSizes = new Map<string, UniqueUnitWithSizes>();
  const uniqueUnitWithVarieties = new Map<string, UniqueUnitWithVarieties>();
  const defaultUnit = new Map<string, DefaultUnit>();
  const varieties = new Map<string, Variety>();
  const sizes = new Map<string, Size>();

  res.units.forEach((unit) => {
    const productImages: UniqueUnit['images'] =
      res.image_urls !== null
        ? res.image_urls.map((image, i) => ({
            alt: `${unit.name}の画像${i}`,
            url: image,
          }))
        : undefined;
    const unitImages: UniqueUnit['images'] =
      unit.image_urls !== null
        ? unit.image_urls.map((image, i) => ({
            alt: `${unit.name}の画像${i}`,
            url: image,
          }))
        : undefined;

    let images: UniqueUnit['images'] =
      productImages && unitImages
        ? [...unitImages, ...productImages]
        : productImages !== undefined
        ? productImages
        : unitImages !== undefined
        ? unitImages
        : undefined;
    const varietiesLinkToSize = new Map<string, UniqueUnit>();
    const sizesLinkToVariety = new Map<string, UniqueUnit>();

    res.units.forEach((u) => {
      if (res.has_size && res.has_variety) {
        if (unit.size === u.size && u.variety !== null) {
          varietiesLinkToSize.set(u.variety, {
            tag: 'all',
            id: u.id,
            name: u.name,
            images:
              u.image_urls !== null
                ? u.image_urls.map((image, i) => ({
                    alt: `${u.name}の画像${i}`,
                    url: image,
                  }))
                : undefined,
            originalPrice: u.original_price,
            price: u.price,
            stock: u.stock,
            size: u.size ?? '',
            variety: u.variety,
            varietyKind: u.variety_kind ?? '',
            varietyImage: unit.variety_image ?? '',
            wishlistId: unit.wishlist_id ?? null,
            purchaseRoute: unit.purchase_route,
          });
        }
        if (unit.variety === u.variety && u.size !== null) {
          sizesLinkToVariety.set(u.size, {
            tag: 'all',
            id: u.id,
            name: u.name,
            images:
              u.image_urls !== null
                ? u.image_urls.map((image, i) => ({
                    alt: `${u.name}の画像${i}`,
                    url: image,
                  }))
                : undefined,
            originalPrice: u.original_price,
            price: u.price,
            stock: u.stock,
            size: u.size,
            variety: u.variety ?? '',
            varietyKind: u.variety_kind ?? '',
            varietyImage: unit.variety_image ?? '',
            wishlistId: unit.wishlist_id ?? null,
            purchaseRoute: unit.purchase_route,
          });
        }
      }
    });
    if (res.has_size && res.has_variety) {
      uniqueUnitWithAll.set(String(unit.id), {
        tag: 'all',
        id: unit.id,
        name: unit.name ?? '',
        images: images,
        originalPrice: unit.original_price,
        price: unit.price,
        stock: unit.stock,
        size: unit.size ?? '',
        variety: unit.variety ?? '',
        varietyKind: unit.variety_kind ?? '',
        varietyImage: unit.variety_image ?? '',
        wishlistId: unit.wishlist_id ?? null,
        purchaseRoute: unit.purchase_route,
      });
    } else if (res.has_variety && !res.has_size) {
      uniqueUnitWithVarieties.set(String(unit.id), {
        tag: 'varieties',
        id: unit.id,
        name: unit.name ?? '',
        images: images,
        originalPrice: unit.original_price,
        price: unit.price,
        stock: unit.stock,
        variety: unit.variety ?? '',
        varietyKind: unit.variety_kind ?? '',
        varietyImage: unit.variety_image ?? '',
        wishlistId: unit.wishlist_id ?? null,
        purchaseRoute: unit.purchase_route,
      });
    } else if (res.has_size && !res.has_variety) {
      uniqueUnitWithSizes.set(String(unit.id), {
        tag: 'sizes',
        id: unit.id,
        name: unit.name ?? '',
        images: images,
        originalPrice: unit.original_price,
        price: unit.price,
        stock: unit.stock,
        size: unit.size ?? '',
        wishlistId: unit.wishlist_id ?? null,
        purchaseRoute: unit.purchase_route,
      });
    }

    if (unit.size !== null) {
      sizes.set(unit.size, {
        name: unit.size,
        images:
          unit.image_urls !== null
            ? unit.image_urls.map((image, i) => ({
                alt: `${unit.name}の画像${i}`,
                url: image,
              }))
            : undefined,
        stock: unit.stock,
        units: {
          // size に紐づくvarietyをもったunit
          varieties:
            varietiesLinkToSize.size <= 0 ? undefined : varietiesLinkToSize,
        },
      });
    }

    if (unit.variety !== null) {
      varieties.set(unit.variety, {
        name: unit.variety,
        image:
          unit.variety_image !== null
            ? {
                alt: `${unit.name}の画像`,
                url: unit.variety_image,
              }
            : undefined,
        stock: unit.stock,
        varietyKind: unit.variety_kind ?? undefined,
        units: {
          // variety に紐づくsizeをもったunit
          sizes: sizesLinkToVariety.size <= 0 ? undefined : sizesLinkToVariety,
        },
      });
    }
  });

  if (res.has_size && !res.has_variety) {
    const map: ProductDetailWithUniqueUnit = {
      tag: 'sizes',
      id: res.id,
      name: res.name,
      description: res.description ?? undefined,
      images:
        res.image_urls !== null
          ? res.image_urls.map((image, i) => ({
              alt: `${res.name}の画像${i}`,
              url: image,
            }))
          : undefined,
      hasVariety: res.has_variety,
      hasSize: res.has_size,
      units: uniqueUnitWithSizes,
      sizes: sizes,
      brands: res.brand_tags.map((t) => ({
        id: t.id,
        name: t.name,
        description: undefined,
      })),
      categories: res.category_tags.map((t) => ({
        id: t.id,
        name: t.name,
        description: undefined,
        campaign: undefined,
      })),
    };
    return map;
  } else if (!res.has_size && res.has_variety) {
    const map: ProductDetailWithUniqueUnit = {
      tag: 'varieties',
      id: res.id,
      name: res.name,
      description: res.description ?? undefined,
      images:
        res.image_urls !== null
          ? res.image_urls.map((image, i) => ({
              alt: `${res.name}の画像${i}`,
              url: image,
            }))
          : undefined,
      hasVariety: res.has_variety,
      hasSize: res.has_size,
      units: uniqueUnitWithVarieties,
      varieties: varieties,
      brands: res.brand_tags.map((t) => ({
        id: t.id,
        name: t.name,
        description: undefined,
      })),
      categories: res.category_tags.map((t) => ({
        id: t.id,
        name: t.name,
        description: undefined,
        campaign: undefined,
      })),
    };
    return map;
  } else if (res.has_size && res.has_variety) {
    const map: ProductDetailWithUniqueUnit = {
      tag: 'all',
      id: res.id,
      name: res.name,
      description: res.description ?? undefined,
      images:
        res.image_urls !== null
          ? res.image_urls.map((image, i) => ({
              alt: `${res.name}の画像${i}`,
              url: image,
            }))
          : undefined,
      hasVariety: res.has_variety,
      hasSize: res.has_size,
      units: uniqueUnitWithAll,
      sizes: sizes,
      varieties: varieties,
      brands: res.brand_tags.map((t) => ({
        id: t.id,
        name: t.name,
        description: undefined,
      })),
      categories: res.category_tags.map((t) => ({
        id: t.id,
        name: t.name,
        description: undefined,
        campaign: undefined,
      })),
    };
    return map;
  } else if (!res.has_size && !res.has_variety) {
    const unit = res.units[0];
    const productImages: UniqueUnit['images'] =
      res.image_urls !== null
        ? res.image_urls.map((image, i) => ({
            alt: `${unit.name || res.name}の画像${i}`,
            url: image,
          }))
        : undefined;
    const unitImages: UniqueUnit['images'] =
      unit.image_urls !== null
        ? unit.image_urls.map((image, i) => ({
            alt: `${unit.name || res.name}の画像${i}`,
            url: image,
          }))
        : undefined;
    let images: DefaultUnit['images'] =
      productImages !== undefined && unitImages !== undefined
        ? [...productImages, ...unitImages]
        : productImages !== undefined
        ? productImages
        : unitImages !== undefined
        ? unitImages
        : undefined;
    defaultUnit.set(String(unit.id), {
      tag: 'default',
      id: unit.id,
      stock: unit.stock,
      originalPrice: unit.original_price,
      price: unit.price,
      images,
      wishlistId: unit.wishlist_id ?? null,
      purchaseRoute: unit.purchase_route,
    });

    const map: ProductDetailWithDefaultUnit = {
      tag: 'default',
      id: res.id,
      name: res.name,
      description: res.description ?? undefined,
      images:
        res.image_urls !== null
          ? res.image_urls.map((image, i) => ({
              alt: `${res.name}の画像${i}`,
              url: image,
            }))
          : undefined,
      units: defaultUnit,
      brands: res.brand_tags.map((t) => ({
        id: t.id,
        name: t.name,
        description: undefined,
      })),
      categories: res.category_tags.map((t) => ({
        id: t.id,
        name: t.name,
        description: undefined,
        campaign: undefined,
      })),
    };

    return map;
  }
  throw new Error('予期せぬデータを取得しました。');
};
