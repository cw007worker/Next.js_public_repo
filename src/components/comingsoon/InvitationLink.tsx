import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import TwitterIcon from '../../../static/TwitterIcon.svg';
import LineIcon from '../../../static/LineIcon.svg';
import CopyIcon from '../../../static/CopyIcon.svg';
import QuestionMark from '../../../static/QuestionMark.svg';
import CopyBallon from './CopyBallon';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '8px 12px',
    },
    card: {
      background: '#FFFFFF',
      borderRadius: '5px',
      padding: '10px 20px 16px',
      maxWidth: '400px',
      margin: '0 auto',
    },
    title: {
      fontSize: '16px',
      lineHeight: '28px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '13px',
    },
    sns: {
      marginBottom: '28px',
      textAlign: 'center',
    },
    twitter: {
      background: '#3797EF',
    },
    line: {
      background: '#06C755',
    },
    shareButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 48,
      borderRadius: 3,
      '&:not(:last-child)': {
        marginBottom: 16,
      },
    },
    shareText: {
      fontSize: 14,
      fontWeight: 700,
      textAlign: 'center',
      width: 120,
      color: '#FFFFFF',
      marginLeft: 10,
    },
    copy: {
      cursor: 'pointer',
      position: 'relative',
    },
    copyButton: {
      margin: '0 auto 6px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    copyIcon: {
      height: '16px',
      width: '13.82px',
    },
    copyText: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
      marginLeft: 10,
    },
    url: {
      width: '100%',
      padding: '0 17px',
      backgroundColor: '#EEEEEE',
      borderRadius: '8px',
      fontSize: '20px',
      lineHeight: '50px',
      fontWeight: 'bold',
      marginBottom: '12px',
      cursor: 'pointer',
    },
    copyBallon: {
      position: 'absolute',
      top: '-7px',
      left: '50%',
      transform: 'translateX(-50%)',
      opacity: 0,
      transition: '0.2s opacity',
    },
    isCopy: {
      opacity: 1,
    },
    helpButton: {
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#FFFFFF',
    },
    helpIcon: {
      height: '16px',
      width: '16px',
    },
    helpText: {
      fontSize: '12px',
      lineHeight: '18px',
      marginLeft: '4px',
    },
  })
);

//@ts-ignore TODO: 修正しよう
const messageSendToTwitter = (url) => {
  const message = `コスメやファッションがお得にお買い物ができる通販サイト『pantrii（パントリー）』の招待URLはこちらです。今登録した人だけが先行体験できます！

${url}`;

  return encodeURIComponent(message);
};

//@ts-ignore TODO: 修正しよう
const messageSendToLine = (url) => {
  const message = `コスメやファッションがお得にお買い物ができる通販サイト『pantrii（パントリー）』の招待URLはこちらです。今登録した人だけが先行体験できます！

${url}`;

  return encodeURIComponent(message);
};

type Props = {
  url: string;
  introducingFriend: () => void;
};
const InvitationLink: React.FC<Props> = ({ url, introducingFriend }) => {
  const classes = useStyles();
  const [isCopy, setIsCopy] = React.useState(false);
  const copy = () => {
    const text: any = document.getElementById('url');
    text.select();
    document.execCommand('Copy');
    if (window.getSelection) {
      //@ts-ignore TODO: 修正しよう
      window.getSelection().removeAllRanges();
    }
    setIsCopy(true);
    window.setTimeout(() => setIsCopy(false), 2000);
  };

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <h2 className={classes.title}>友達を招待して順番をあげよう</h2>
        <div className={classes.sns}>
          <a
            href={`https://twitter.com/intent/tweet?url=${messageSendToTwitter(
              url
            )}`}
            target="_balnk"
            className={clsx(classes.shareButton, classes.twitter)}
          >
            <Image
              src={TwitterIcon}
              alt="TwitterIcon"
              height={17.13}
              width={21}
            />
            <p className={classes.shareText}>Twitterでシェア</p>
          </a>
          <a
            href={`https://line.me/R/msg/text/?${messageSendToLine(url)}`}
            target="_balnk"
            className={clsx(classes.shareButton, classes.line)}
          >
            <Image src={LineIcon} alt="LineIcon" height={20} width={21} />
            <p className={classes.shareText}>LINEでシェア</p>
          </a>
        </div>
        <div className={classes.copy} onClick={copy}>
          <div className={classes.copyButton}>
            <div className={classes.copyIcon}>
              <Image src={CopyIcon} alt={'CopyIcon'} />
            </div>
            <p className={classes.copyText}>タップでコピーする</p>
          </div>
          <input
            className={classes.url}
            id="url"
            type="text"
            value={url}
            readOnly
          />
          <CopyBallon
            className={clsx(classes.copyBallon, isCopy && classes.isCopy)}
          />
        </div>
        <button className={classes.helpButton} onClick={introducingFriend}>
          <div className={classes.helpIcon}>
            <Image src={QuestionMark} alt={'QuestionMark'} />
          </div>
          <p className={classes.helpText}>友達紹介のやり方</p>
        </button>
      </div>
    </div>
  );
};

export default InvitationLink;
