import { ChildCategory } from './common/childCategory';

export type CategoryList = {
  id: string;
  name: string;
  childCategories: undefined | ChildCategory[];
}[];
