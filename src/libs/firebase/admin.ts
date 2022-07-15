import { firebaseAdminCert } from './config';
import * as admin from 'firebase-admin';

export const firebaseAdmin =
  admin.apps[0] ||
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminCert),
  });
