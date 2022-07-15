import { LayoutForAuth } from 'components/organisms/Layout/forAuth';
import { ResetPasswordRequestTemplate } from 'components/templates/Auth/ResetPasswordRequest';
import { ResetPasswordRequestSentTemplate } from 'components/templates/Auth/ResetPasswordRequest/sent';
import { useResetPasswordRequestPage } from 'hooks/pages/useResetPasswordRequestPage';

const ResetPasswordReqest = () => {
  const state = useResetPasswordRequestPage();
  const resetPasswordRequestState = state.resetPasswordRequestState;

  return (
    <LayoutForAuth>
      {resetPasswordRequestState.isSuccess ? (
        <ResetPasswordRequestSentTemplate {...resetPasswordRequestState} />
      ) : (
        <ResetPasswordRequestTemplate {...resetPasswordRequestState} />
      )}
    </LayoutForAuth>
  );
};

export default ResetPasswordReqest;
