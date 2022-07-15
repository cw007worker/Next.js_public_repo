//@see https://firebase.google.com/docs/reference/js/v8/firebase.User
import firebase from 'firebase';

export const firebaseErrorHandler = (code: firebase.auth.Error['code']) => {
  switch (code) {
    case AUTH_ERROR_CODE_MAP.EMAIL_ALREADY_IN_USE:
      return 'このメールアドレスはすでに使われています。';
    case AUTH_ERROR_CODE_MAP.EMAIL_NOT_FOUND:
      return '未登録のメールアドレスです。';
    case AUTH_ERROR_CODE_MAP.INVALID_EMAIL:
      return 'このメールアドレスは無効です。';
    case AUTH_ERROR_CODE_MAP.WEAK_PASSWORD:
      return '推測されやすいパスワードです。';
    case AUTH_ERROR_CODE_MAP.USER_DISABLED:
      return '指定していただいたアカウントは管理者によって凍結されています。';
    case AUTH_ERROR_CODE_MAP.USER_NOT_FOUND:
      return '申し訳ありません。こちらのメールアドレスで登録したアカウントが見つかりません。';
    case AUTH_ERROR_CODE_MAP.WRONG_PASSWORD:
      return 'パスワードが誤っています。若しくはパスワードが登録されていません。';
    case AUTH_ERROR_CODE_MAP.REQUIRES_RECENT_LOGIN:
      return 'この操作は機密性が高く、直近で認証を行っている必要があります。処理を続けるには再度認証を行う必要があります。';
    case AUTH_ERROR_CODE_MAP.INVALID_USER_TOKEN:
      return '認証情報が古くなっています。処理を続けるには再度ログインする必要があります。';
    case AUTH_ERROR_CODE_MAP.WEB_STORAGE_UNSUPPORTED:
      return 'お使いのブラウザはサポートされていません。';
    case AUTH_ERROR_CODE_MAP.TOO_MANY_REQUESTS:
      return '異常な操作を検知したため、ブロックしました。暫くしてからお試しください。';
    case AUTH_ERROR_CODE_MAP.INVALID_PHONE_NUMBER:
      return '使用できない電話番号です。日本の携帯番号でお試しください。';
    case AUTH_ERROR_CODE_MAP.PROVIDE_ALREADY_LINKED:
      return '登録は成功しています。';
    case AUTH_ERROR_CODE_MAP.CREDENTIAL_ALREADY_IN_USE:
      return 'すでに登録済みか、認証コードが無効です。';
    case AUTH_ERROR_CODE_MAP.INVALID_VERIFICATION_CODE:
      return 'SMSコードが正しくありません。';
    case AUTH_ERROR_CODE_MAP.EXPIRED_ACTION_CODE:
      return 'お開きいただいたURLの有効期限が切れています。';
    case AUTH_ERROR_CODE_MAP.INVALID_ACTION_CODE:
      return 'お開きいただいたURLが無効です。';
    default:
      return '予期せぬエラーが発生しました。';
  }
};

export const AUTH_ERROR_CODE_MAP = {
  EMAIL_NOT_FOUND: 'auth/email-not-found',
  EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
  USER_DISABLED: 'auth/user-disabled',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  OPERATIOM_NOT_ALLOWED: 'auth/operation-not-allowed',
  WEAK_PASSWORD: 'auth/weak-password',
  REQUIRES_RECENT_LOGIN: 'auth/requires-recent-login',
  INVALID_USER_TOKEN: 'auth/invalid-user-token',
  WEB_STORAGE_UNSUPPORTED: 'auth/web-storage-unsupported',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  INVALID_PHONE_NUMBER: 'auth/invalid-phone-number',
  PROVIDE_ALREADY_LINKED: 'auth/provider-already-linked',
  CREDENTIAL_ALREADY_IN_USE: 'auth/credential-already-in-use',
  INVALID_VERIFICATION_CODE: 'auth/invalid-verification-code',
  EXPIRED_ACTION_CODE: 'auth/expired-action-code',
  INVALID_ACTION_CODE: 'auth/invalid-action-code',
};
