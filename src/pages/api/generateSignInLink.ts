import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { firebaseAdmin } from 'libs/firebase/admin';
import firebase from 'firebase';
import { actionCodeSettingsForMailLink } from 'libs/firebase/config';
import { firebaseErrorHandler } from 'type/util/errorHandler/firebase';
import { sentryLog } from 'libs/setnry';

const auth = firebaseAdmin.auth();
const actionCode = actionCodeSettingsForMailLink(
  process.env.NEXT_PUBLIC_ROOT_URL
);

export default async function sendSignInLinkToEmail(req: Req, res: Res) {
  // "POST"以外は、"404 Not Found"を返す
  if (req.method !== 'POST') return res.status(404).send('Not Found');
  const { email } = req.body;
  try {
    // ログインリンクの生成
    const emailLink = await auth.generateSignInWithEmailLink(email, actionCode);
    return res.status(200).json({ email: email, emailLink: emailLink });
  } catch (error) {
    if (typeof (error as firebase.auth.AuthError).code !== undefined) {
      sentryLog(error);
      const firebaseError = error as firebase.auth.AuthError;
      return res.writeHead(500).end(firebaseErrorHandler(firebaseError.code));
    } else {
      sentryLog(error);
      console.error(error);
      return res.writeHead(500).end(error);
    }
  }
}
