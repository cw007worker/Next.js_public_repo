export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBSE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

export const firebaseAdminCert = {
  projectId: process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PROJECT_ID,
  clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_KEY_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PRIVATE_KEY?.replace(
    /\\n/g,
    '\n'
  ),
};

// Action Code
export const actionCodeSettingsForMailLink = (root_url: string | undefined) => {
  if (root_url === undefined) {
    throw new Error('urlが空です');
  }
  return {
    url: `${root_url}/auth/action`,
    handleCodeInApp: true,
  };
};
