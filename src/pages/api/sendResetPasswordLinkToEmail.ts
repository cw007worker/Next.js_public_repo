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

export default async function sendResetPasswordLinkToEmail(req: Req, res: Res) {
  if (req.method !== 'POST') return res.status(404).send('Not Found');
  const { email } = req.body;
  try {
    // リセットリンクの作成
    const resetLink = await auth.generatePasswordResetLink(email, actionCode);
    // 認証メールの送信
    await sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send(mailContent(email, resetLink));
  } catch (error) {
    if (typeof (error as firebase.auth.AuthError).code !== undefined) {
      sentryLog(error);
      console.error(error);
      const firebaseError = error as firebase.auth.AuthError;
      return res
        .status(400)
        .json({ message: firebaseErrorHandler(firebaseError.code) });
    } else {
      sentryLog(error);
      console.error(error);
      return res.status(500).json({ message: error });
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
    subject: '【pantrii(パントリー)】パスワードリセット完了のお願い',
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
      <p>ショッピングを再開するには<br>
      以下のリンクを押してパスワードをリセットしてください。</p><br>
      <br>
      <br>
      <a href="${link}">パスワードをリセット</a>
      
      
      <p>ショッピングサイト<br>
      pantrii(パントリー)</p>
    </div>
    <div>
      ------------------------------------------------------------------<br>
      ※このリンクの有効期限は、60分以内です。<br>
      また一度クリックした場合は<br>
      ※クリックは1回のみ有効です。<br>
      上記URLをクリックしても画面が開かない場合は、<br>
      期限が切れている可能性があります。お手数ですが再度
      <a href="https://pantrii.jp/auth/resetPasswordRequest">こちらのページ</a>
      でリセットURLをリクエストしてください<br>
      ※このメールにお心当たりのない場合、<br>
      　どなたかが登録の際に誤ってあなたのメールアドレスを<br>
      　入力した可能性があります。<br>
      　本メールを破棄していただければ仮登録のままとなり、60分を過ぎますと<br>
      　あなたのメールアドレス情報は削除されますのでご安心ください<br>
    </div>
  `;
};
