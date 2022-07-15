import { CategoryTag } from 'type/viewModel/common/categoryTag';

export const isTimesaleTag = (categoryTagId: number | undefined) => {
  return String(categoryTagId) === process.env.NEXT_PUBLIC_TIMESALE_TAG_ID;
};

export const hasTimesaleTag = (categories: CategoryTag[] | undefined) => {
  const check = (category: CategoryTag) => isTimesaleTag(category.id);
  return categories && categories.some(check);
};
