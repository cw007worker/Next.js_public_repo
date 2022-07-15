import { GetBrandCategoriesResponse } from 'type/response/getBrandCategories';
import { CategoryList } from 'type/viewModel/categoryList';

export const toBrandCategories = (
  res: GetBrandCategoriesResponse
): CategoryList => {
  const brandCategories: CategoryList = res.categories.map((category) => {
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

  return brandCategories;
};
