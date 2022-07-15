import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import CloseButton from './CloseButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: '10px',
      maxWidth: '340px',
      backgroundColor: '#FFFFFF',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      padding: '67px 15px 52px',
    },
    close: {
      position: 'absolute',
      top: '-9px',
      right: '-10px',
    },
    title: {
      fontSize: '24px',
      lineHeight: '18px',
      fontWeight: 'bold',
      marginBottom: '30px',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      [theme.breakpoints.down(360)]: {
        fontSize: '20px',
      },
    },
    text1: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 'bold',
      marginBottom: '16px',
      textAlign: 'center',
      [theme.breakpoints.down(360)]: {
        fontSize: '12px',
      },
    },
    lineBreak: {
      display: 'block',
    },
    text2: {
      fontSize: '14px',
      lineHeight: '40px',
      fontWeight: 'bold',
      marginBottom: '44px',
      textAlign: 'center',
      [theme.breakpoints.down(360)]: {
        fontSize: '12px',
      },
    },
    buttonWrapper: {
      textAlign: 'center',
    },
    button: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#FFFFFF',
      background: '#C4C4C4',
      height: '44px',
      width: '187px',
    },
  })
);

type Props = {
  open: boolean;
  onClose: () => void;
};
const MailConfirmModal: React.FC<Props> = ({ open, onClose }) => {
  const classes = useStyles();
  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.root}>
        <div className={classes.close}>
          <CloseButton onClick={onClose} />
        </div>
        <h2 className={classes.title}>メールを確認してください</h2>
        <p className={classes.text1}>
          認証メールを送信しました。
          <span className={classes.lineBreak}>
            登録するにはメールの確認が必要です。
          </span>
        </p>
        <p className={classes.text2}>もうすぐで登録は完了します。</p>
        <div className={classes.buttonWrapper}>
          <button className={classes.button} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MailConfirmModal;
