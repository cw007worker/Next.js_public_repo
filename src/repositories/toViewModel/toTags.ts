import { GetTagsResponse } from 'type/response/getTags';
import { Tags } from 'type/viewModel/tags';
import { Brand } from 'type/viewModel/common/brand';
import { CategoryList } from 'type/viewModel/categoryList';
import { getBrandsWithInitial } from 'utils/getBrandWithInitial';

export const toTags = (res: GetTagsResponse): Tags => {
  const categories: CategoryList = res.categories.map((category) => {
    const childCategories = category.child_tags
      ? category.child_tags.map((categoryData) => {
          return {
            id: String(categoryData.id),
            name: categoryData.name,
          };
        })
      : undefined;
    return {
      id: String(category.id),
      name: category.name,
      childCategories,
    };
  });

  const brands: Brand[] = res.brands.map((value) => {
    return {
      id: String(value.id),
      name: value.name,
      imageUrl: value.thumbnail_image_url ?? undefined,
    };
  });

  const brandsWithInitial = getBrandsWithInitial(brands);

  return {
    brands: brandsWithInitial,
    categories: categories,
  };
};
