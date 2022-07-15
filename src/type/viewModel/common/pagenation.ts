export type Pagenation = {
  totalCount: number;
  limitValue: number;
  totalPages: number;
  currentPage: number;
  previousPage: number | undefined;
  nextPage: number | undefined;
};
