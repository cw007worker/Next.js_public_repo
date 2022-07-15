import MembershipSettingTemplate from 'components/templates/MembershipSetting';
import router from 'next/router';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { useMembershipSettingPage } from 'hooks/pages/user/useMembershipSettingPage';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';

const MembershipSetting = () => {
  const { membership, layoutState } = useMembershipSettingPage();

  return (
    <LayoutWithBack
      handleBack={() => router.back()}
      cartItemCount={layoutState.cartItemCount}
      headerPageTitle="マイページ"
    >
      {membership.state === undefined ||
      membership.state?.type === 'loading' ? (
        <Loading />
      ) : membership.state.type === 'error' ? (
        <ErrorFetchFaild
          message="ユーザー情報の取得に失敗しました"
          includeSubMessage={true}
          linkProps={{ path: '/', text: 'ホームへ戻る' }}
        />
      ) : (
        <MembershipSettingTemplate membership={membership.state.data} />
      )}
    </LayoutWithBack>
  );
};

export default MembershipSetting;
