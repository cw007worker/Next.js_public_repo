import {
  useGetMembershipInfo,
  HookState as MembershipHookState,
} from 'hooks/useGetMembershipInfo';

type HookState = {
  membershipInfo: MembershipHookState;
};

export const useCompletedPage = (): HookState => {
  const membershipInfo = useGetMembershipInfo();

  return {
    membershipInfo,
  };
};
