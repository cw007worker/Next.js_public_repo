import { GetProductsForPersonalizeResponse } from 'type/response/getProductsForPersonalize';
import { ProductsForPersonalize } from 'type/viewModel/productsForPersonalize';

export const toProductsForPersonalize = (
  res: GetProductsForPersonalizeResponse
): ProductsForPersonalize => {
  const products: ProductsForPersonalize['productsForPersonalize'] =
    res.products.map((p) => {
      return {
        id: p.id,
        imageUrl: p.image_url,
      };
    });
  return {
    productsForPersonalize: products,
  };
};
