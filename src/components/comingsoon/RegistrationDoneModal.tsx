import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import Box from '../../../static/Box.svg';
import { Modal } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '340px',
      padding: '0 10px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
    wrapper: {
      borderRadius: '10px',
      backgroundColor: '#FFFFFF',
    },
    topImage: {
      position: 'relative',
      backgroundColor: '#000000',
      height: '140px',
      borderRadius: '10px 10px 0 0',
      overflow: 'hidden',
    },
    image: {
      position: 'absolute',
      bottom: -42.63,
      left: '50%',
      transform: 'translateX(-50%)',
    },
    textsWrapper: {
      padding: '32px 8px 28px',
    },
    title: {
      fontSize: '20px',
      lineHeight: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '27px',
    },
    text: {
      fontSize: '14px',
      lineHeight: '25px',
      textAlign: 'center',
      marginBottom: '33px',
    },
    lineBreak: {
      display: 'block',
    },
    buttonWrapper: {
      textAlign: 'center',
    },
    button: {
      padding: '16px 23px',
      borderRadius: '9px',
      backgroundColor: '#FF8080',
      fontSize: '16px',
      lineHeight: '18px',
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
  })
);

type Props = {
  open: boolean;
  onClose: () => void;
  getPrivilege?: () => void;
};
const RegistrationDoneModal: React.FC<Props> = ({
  open,
  onClose,
  getPrivilege,
}) => {
  const classes = useStyles();
  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <div className={classes.topImage}>
            <div className={classes.image}>
              <Image src={Box} alt={'Box'} height={114.63} width={108} />
            </div>
          </div>
          <div className={classes.textsWrapper}>
            <h2 className={classes.title}>事前登録が完了しました！</h2>
            <p className={classes.text}>
              ご登録いただいたメールアドレスにて
              <span className={classes.lineBreak}>
                登録完了メールを送信しておりますので
              </span>
              <span className={classes.lineBreak}>ご確認ください。</span>
              <span className={classes.lineBreak}>
                それでは、サービスリリースをお楽しみに！
              </span>
            </p>
            <div className={classes.buttonWrapper}>
              <button className={classes.button} onClick={getPrivilege}>
                特典をGETする
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RegistrationDoneModal;
