import { GetCategoryBrandsResponse } from 'type/response/getCategoryBrands';
import { BrandList } from 'type/viewModel/brandList';
import { Brand } from 'type/viewModel/common/brand';
import { getBrandsWithInitial } from 'utils/getBrandWithInitial';

export const toCategoryBrands = (res: GetCategoryBrandsResponse): BrandList => {
  const categoryBrands: Brand[] = res.brands.map((value) => {
    return {
      id: String(value.id),
      name: value.name,
      imageUrl: value.thumbnail_image_url ?? undefined,
    };
  });

  const categoryBrandsWithInitial = getBrandsWithInitial(categoryBrands);

  return categoryBrandsWithInitial;
};
