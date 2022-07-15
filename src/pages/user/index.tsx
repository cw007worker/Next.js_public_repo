import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { useUserPage } from 'hooks/pages/useUserPage';
import { UserTemplate } from 'components/templates/User';
import { LayoutWithBottomTab } from 'components/organisms/Layout/withBottomTab';

const User = () => {
  const state = useUserPage();

  return (
    <LayoutWithBottomTab
      isMembership={state.layoutState.isMembership}
      name={state.layoutState.fullName}
      cartItemCount={state.layoutState.cartItemCount}
      currentPage={state.layoutState.currentPage}
    >
      <UserTemplate {...state} />
    </LayoutWithBottomTab>
  );
};

export default User;
