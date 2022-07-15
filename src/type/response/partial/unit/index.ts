import { z } from 'zod';

//TODO: defaultの反対の意味が思い浮かばなかった。修正求む
export const uniqueUnitSchema = z.object({
  id: z.number(),
  name: z.string(), //FYI:商品種別名、いわゆるSKU
  variety_image: z.union([z.null(), z.string()]), //FYI:Pickerに使用する画像
  image_urls: z.union([z.array(z.string()), z.null()]), //FYI:商品種別に紐づく画像が入る
  price: z.number(),
  original_price: z.number(),
  discount_rate: z.number(),
  stock: z.number(), //FYI:商品種別の在庫数が入る
  size: z.union([z.string(), z.null()]), //has_sizeがfalseの時nullになる
  variety: z.union([z.string(), z.null()]), //SKUが種別を持つ場合は、種別の値が入る。 ex... color（色）flavor（味）material（素材）
  variety_kind: z.union([z.string(), z.null()]), //SKUが種別を持つ場合は、種別の値が入る ex.. variant_typeが"color"の場合 - 赤 - 青 - ..etc
  wishlist_id: z.union([z.number(), z.null(), z.undefined()]),
  purchase_route: z.string(),
});

//@file varietyとsizeがない場合のunit schema
export const defaultUnitSchema = z.object({
  id: z.number(),
  name: z.null(), //アサヒビール１２本入り、アサヒビール９本入りなど固有の名前が入る
  variety_image: z.null(), //FYI:Pickerに使用する画像
  image_urls: z.union([z.array(z.string()), z.null()]), //FYI:商品種別に紐づく画像が入る
  price: z.number(),
  original_price: z.number(),
  discount_rate: z.number(),
  stock: z.number(),
  size: z.null(),
  variety: z.null(), //SKUが種別を持つ場合は、種別の値が入る。 ex... color（色）flavor（味）material（素材）
  variety_kind: z.null(), //SKUが種別を持つ場合は、種別の値が入る ex.. variant_typeが"color"の場合 - 赤 - 青 - ..etc
  wishlist_id: z.union([z.number(), z.null(), z.undefined()]),
  purchase_route: z.string(),
});

export type DefaultUnit = z.infer<typeof defaultUnitSchema>;

export type UniqueUnit = z.infer<typeof uniqueUnitSchema>;

export const unitSchema = z.union([uniqueUnitSchema, defaultUnitSchema]);

export type Unit = z.infer<typeof unitSchema>;

export const isUniqueUnit = (unit: Unit): unit is UniqueUnit => {
  return (unit.name, unit.size, unit.variety, unit.variety_kind) !== null;
};
export const isDefaultUnit = (unit: Unit): unit is DefaultUnit => {
  return (unit.name, unit.size, unit.variety, unit.variety_kind) === null;
};
