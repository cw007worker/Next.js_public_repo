import { ParallelImportTemplate } from 'components/templates/Guide/ParallelImport';
import { LayoutForGuide } from 'components/organisms/Layout/forGuide';
import router from 'next/router';
import { useLayout } from 'hooks/useLayout';

const ParallelImport = () => {
  const layoutState = useLayout();

  return (
    <LayoutForGuide
      handleBack={() => router.back()}
      cartItemCount={layoutState.cartItemCount}
    >
      <ParallelImportTemplate handleBack={() => router.back()} />
    </LayoutForGuide>
  );
};

export default ParallelImport;
