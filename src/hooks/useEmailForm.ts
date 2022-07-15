import { useEffect } from 'react';

type FormValues = {
  email: string;
};

export const useEmailForm = () => {
  // URLをparseして招待tokenを取得
  useEffect(() => {
    const setInviteTokenFromUrlToLocalStorage = () => {
      const url = window.location.href;
      const parser = new URL(url);
      const inviteToken = parser.searchParams.get('invite_token');
      // inviteTokenが存在した場合のみ、localstorageへの保存処理を実行。
      if (inviteToken) {
        window.localStorage.setItem('inviteToken', inviteToken);
      }
    };
    setInviteTokenFromUrlToLocalStorage();
  }, []);

  const certificateWithEmailLinkRequest = async (
    data: FormValues,
    event: any
  ) => {
    event.preventDefault();
    let { email } = data;
    let invite_token = window.localStorage.getItem('inviteToken');

    // local_storageがoffになっているユーザーが居るぽいので、
    // invite_tokenがこの時点で無い時は、再度URLから取得してみる。
    if (!invite_token) {
      const url = window.location.href;
      const parser = new URL(url);
      invite_token = parser.searchParams.get('invite_token');
    }

    window.localStorage.setItem('emailForAuth', email);

    // TODO: API routesへのリクエストは別のディレクトリとかに切り出したいかも
    fetch('/api/sendSignInLinkToEmail', {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ email, invite_token }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  };
  return { certificateWithEmailLinkRequest };
};
