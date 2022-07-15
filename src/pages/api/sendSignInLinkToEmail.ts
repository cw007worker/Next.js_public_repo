import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { firebaseAdmin } from 'libs/firebase/admin';
import firebase from 'firebase';
import { actionCodeSettingsForMailLink } from 'libs/firebase/config';
import { firebaseErrorHandler } from 'type/util/errorHandler/firebase';
import { sentryLog } from 'libs/setnry';

const auth = firebaseAdmin.auth();
const sgMail = require('@sendgrid/mail');
const actionCode = actionCodeSettingsForMailLink(
  process.env.NEXT_PUBLIC_ROOT_URL
);

export default async function sendSignInLinkToEmail(req: Req, res: Res) {
  // "POST"以外は、"404 Not Found"を返す
  if (req.method !== 'POST') return res.status(404).send('Not Found');
  const { email, invite_token } = req.body;
  try {
    // ログインリンクの生成
    const signInlink = await auth.generateSignInWithEmailLink(
      email,
      actionCode
    );
    const link = `${signInlink}&email=${email}&invite_token=${invite_token}`;
    // 認証メールの送信
    await sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send(mailContent(email, link));
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
  return res.status(200).json({ message: 'success' });
}

/**
 * sendgrid経由で送信するメールの設定
 */
const mailContent = (email: string, link: string) => {
  return {
    to: email,
    from: 'noreply@pantrii.jp',
    subject: '【pantrii(パントリー)】メールアドレス認証のお知らせ',
    text: textMessage(email, link),
    html: textMessage(email, link),
    headers: { 'X-Sent-Using': 'SendGrid-API' },
  };
};

const textMessage = (email: string, link: string) => {
  return `
    <div>
      ${email} 様<br>
      <br>
      <p>pantriiの先行体験に登録していただきありがとうございます。<br>
      以下のリンクを押してメールアドレスの認証を完了してください。</p><br>
      <br>
      <br>
      <a href="${link}">ここをクリックして認証する</a>
      
      
      <p>ショッピングサイト<br>
      pantrii(パントリー)</p>
    </div>
    <div>
      ------------------------------------------------------------------<br>
      ※このリンクの有効期限は、60分以内です。<br>
      ※上記URLをクリックしても画面が開かない場合は、<br>
      　URLをコピーし、ブラウザのアドレス欄にペースト(貼付け)して下さい。<br>
      ※クリックは1回のみ有効です。途中で操作を止めた場合は、WEB画面での<br>
      　こちらのpantriiのページから再度登録を行って下さい。<br>
      ※このメールにお心当たりのない場合、<br>
      　どなたかが登録の際に誤ってあなたのメールアドレスを<br>
      　入力した可能性があります。<br>
      　本メールを破棄していただければ仮登録のままとなり、60分を過ぎますと<br>
      　あなたのメールアドレス情報は削除されますのでご安心ください<br>
    </div>
  `;
};
