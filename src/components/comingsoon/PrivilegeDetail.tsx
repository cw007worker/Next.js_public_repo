import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import Check from '../../../static/Check.svg';
import Lock from '../../../static/Lock.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      height: '100%',
    },
    lockStatus: {
      position: 'absolute',
      top: '-30px',
      left: '50%',
      transform: 'translateX(-50%)',
      height: '60px',
      width: '60px',
      border: '3px solid #BDBDBD',
      backgroundColor: '#FFFFFF',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3,
    },
    wrapper: {
      padding: '8px 31px 25px',
      height: 'calc(100% - 87px)',
      overflowY: 'scroll',
    },
    title: {
      fontSize: '16px',
      lineHeight: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333333',
      padding: '50px 0 4px',
    },
    contentTitleWrapper: {
      padding: '20px 0 28px',
      borderRadius: '10px',
      backgroundColor: '#FFF8DF',
      marginBottom: '10px',
    },
    contentSubTitle: {
      fontSize: '16px',
      lineHeight: '26px',
      textAlign: 'center',
      marginBottom: '10px',
    },
    contentTitle: {
      fontSize: '20px',
      lineHeight: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text: {
      fontSize: '14px',
      lineHeight: '22px',
      textAlign: 'center',
    },
    lineBreak: {
      display: 'block',
    },
    redText: {
      color: 'red',
      fontSize: '14px',
    },
    miniText: {
      fontSize: '10px',
      lineHeight: '20px',
      textAlign: 'center',
      marginBottom: '20px',
    },
    content: {
      border: '1px solid #C4C4C4',
      borderRadius: '10px',
      padding: '16px 16px 13px',
      marginBottom: '25px',
    },
    closeWrapper: {
      textAlign: 'center',
    },
    close: {
      fontSize: '15px',
      textAlign: 'center',
      marginBottom: '25px',
      width: '95px',
      color: '#767676',
      background: '#FFFFFF',
    },
  })
);

type Props = {
  isLocked: boolean;
  isInviting: boolean;
  title: string;
  contentTitle: string;
  handleClose: () => void;
  children: React.ReactNode;
};
const PrivilegeDetail: React.FC<Props> = ({
  isLocked,
  isInviting,
  title,
  contentTitle,
  handleClose,
  children,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.lockStatus}>
        {isLocked ? (
          <Image src={Lock} alt={'Lock'} height={31.5} width={24} />
        ) : (
          <Image src={Check} alt={'Check'} height={24} width={31} />
        )}
      </div>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.wrapper}>
        <div className={classes.contentTitleWrapper}>
          <p className={classes.contentSubTitle}>特典</p>
          <h4 className={classes.contentTitle}>{contentTitle}</h4>
        </div>
        <p className={classes.text}>
          {isInviting ? (
            <React.Fragment>
              サイト内でご購入時にお使いいただける
              <span className={classes.lineBreak}>
                5%OFFクーポンを差し上げます。
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              以下の商品が<span className={classes.redText}>1円</span>
              でご購入いただける
              <span className={classes.lineBreak}>1円祭りにご招待します。</span>
            </React.Fragment>
          )}
        </p>
        <p className={classes.miniText}>
          ※事前登録終了後に本登録することが必須条件となります。
        </p>
        <div className={classes.content}>{children}</div>
        <div className={classes.closeWrapper}>
          <button className={classes.close} onClick={handleClose}>
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivilegeDetail;
