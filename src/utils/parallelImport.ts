import { Unit, UniqueUnit, DefaultUnit } from 'type/viewModel/common/unit';

export const isParallelImport = (purchaseRoute: string): boolean => {
  return purchaseRoute == 'parallel_import';
};
