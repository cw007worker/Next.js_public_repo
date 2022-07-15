import { Fragment, VFC, memo, useEffect } from 'react';
import { HookState } from 'hooks/useEmailLinkCertification';
import Footer from 'components/comingsoon/Footer';
import Header from 'components/comingsoon/Header';
import Loading from 'components/comingsoon/Loading';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      background: '#000000',
      paddingTop: '50px',
      minHeight: '100vh',
      [theme.breakpoints.down('sm')]: {
        paddingTop: '65px',
      },
    },
    root: {
      padding: '43px 45px 200px',
    },
    wrapper: {
      color: '#FFFFFF',
      maxWidth: '320px',
      margin: '0 auto',
    },
    title: {
      fontSize: '20px',
      lineHeight: '50px',
      fontWeight: 'bold',
      textAlign: 'left',
      margin: '0 0 20px',
    },
  })
);

const Component: VFC<HookState> = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Header hasLoginButton={false} backgroundColor="black" />
      <main className={classes.main}>
        {props.processState?.type === 'loading' ? (
          <div>
            <Loading />
          </div>
        ) : props.processState?.type === 'error' ? (
          <div className={classes.root}>
            <div className={classes.wrapper}>
              <h1 className={classes.title}>無効なURLです</h1>
              <p>お開きいただいたURLは、期限が切れたURLの可能性があります。</p>
              <p>
                認証を続行するには、お手数ですが下記の手順をお確かめください
              </p>
              <br />
              <p>
                1.{' '}
                <strong>
                  【pantrii(パントリー)】メールアドレス認証のお知らせ
                </strong>
                という題のメールが届いている確認する
              </p>
              <br />
              <p>
                2.{' '}
                <strong>
                  【pantrii(パントリー)】メールアドレス認証のお知らせ
                </strong>
                が複数届いている場合は、受信日時が一番新しいものを開く
              </p>
              <br />
              <p>3. 再度、「ここをクリックして認証する」をクリックする</p>
              <br />
              <br />
              <p>
                もし、上記の手順を踏んでも、認証が続行しない場合は、再度{' '}
                <a
                  href="https://pantrii.jp/comingsoon"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://pantrii.jp/comingsoon
                </a>{' '}
                からメールアドレスを入力して、1〜3の手順をお踏みください。
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </main>
      <Footer backgroundColor="black" />
    </Fragment>
  );
};

export const EmailLinkTemplate = memo(Component);
