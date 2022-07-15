import { ItemListTemplate } from 'components/templates/ItemList';
import { useItemListPage } from 'hooks/pages/useItemListPage';
import router from 'next/router';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';

const ItemList = () => {
  const { layoutState, getItemsState, queryState, handleToggleDisplayColor } =
    useItemListPage();

  return (
    <LayoutWithBack
      handleBack={() => router.back()}
      cartItemCount={layoutState.cartItemCount}
    >
      <ItemListTemplate
        queryState={queryState}
        handleToggleDisplayColor={handleToggleDisplayColor}
        {...getItemsState}
      />
    </LayoutWithBack>
  );
};

export default ItemList;
