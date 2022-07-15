import { NewItemListTemplate } from 'components/templates/NewItemList';
import { useNewItemListPage } from 'hooks/pages/useNewItemListPage';
import router from 'next/router';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';

const NewItemList = () => {
  const state = useNewItemListPage();

  return (
    <LayoutWithBack
      handleBack={() => router.back()}
      cartItemCount={state.layoutState.cartItemCount}
    >
      <NewItemListTemplate {...state} />
    </LayoutWithBack>
  );
};

export default NewItemList;
