//@ https://github.com/firebase/firebase-admin-node/issues/403
// errorがfirebaseのものかどうか判別するmethodがfirebaseには用意されていない
interface IFirebaseAuthError extends Error {
  code: string;
  message: string;
  stack?: string;
}

export const isFirebaseAuthError = (err: any): err is IFirebaseAuthError => {
  return err.code && err.code.startsWith('auth/');
};
