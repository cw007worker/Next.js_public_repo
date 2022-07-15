/**
 * Firebase Authにおける メールリンク経由で行うアクションを実行するためのページ
 * ・パスワードリセット
 * ・Email Link ログイン
 * ・メールアドレスの本人確認（現在は無い）
 */
import React from 'react';
import { AUTH_ACTION_CODE } from 'hooks/useFirebaseAuthActionUrlParser';
import { useActionPage } from 'hooks/pages/auth/useActionPage';
import { EmailLinkTemplate } from 'components/templates/Auth/Action/EmaiLinkSignIn';
import { ResetPasswordTemplate } from 'components/templates/Auth/Action/ResetPassword';

const AuthAction = () => {
  const actionPageState = useActionPage();
  const emailLinkState = actionPageState.emailLinkCertificationState;
  const resetPasswordState = actionPageState.resetPasswordState;

  return (
    <React.Fragment>
      {actionPageState.actionState?.mode === AUTH_ACTION_CODE.RESET_PASSWORD ? (
        <ResetPasswordTemplate {...resetPasswordState} />
      ) : actionPageState.actionState?.mode === AUTH_ACTION_CODE.SIGN_IN ? (
        <EmailLinkTemplate {...emailLinkState} />
      ) : (
        <div>action modeが選択されていない不正なURLです。</div>
      )}
    </React.Fragment>
  );
};

export default AuthAction;
