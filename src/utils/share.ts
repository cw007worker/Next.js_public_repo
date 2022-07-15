export const shareMessage = (url: string | undefined) => {
  const message = `コスメやファッションがお得にお買い物ができる通販サイト『pantrii（パントリー）』の招待URLはこちらです。

${url}`;

  return encodeURIComponent(message);
};

export const createShareMessageForReferral = (code: string) => {
  const message = `
／
10%オフ(最大¥5,000)招待クーポン
#コスメ 💄🧴
をお得にゲットしよう
＼
招待コード【${code}】を使うと #pantrii で最大 ¥5000 OFF
Pantriiなら、話題のコスメやファッションが会員限定価格でお得に
⇒ ${process.env.NEXT_PUBLIC_ROOT_URL}/lp/invitation?${code}
  `;

  return encodeURIComponent(message);
};
