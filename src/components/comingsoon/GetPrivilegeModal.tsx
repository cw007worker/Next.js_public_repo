import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import Group1577 from '../../../static/Group1577.svg';
import GetPrivilegeBack from '../../../static/GetPrivilegeBack.svg';
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
    content: {
      position: 'relative',
      background: '#000000',
      borderRadius: '10px 10px 0 0',
      padding: '28px 0 32px',
    },
    image: {
      textAlign: 'center',
      marginBottom: 8,
    },
    title: {
      fontSize: '24px',
      lineHeight: '30px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '8px',
      color: '#FFD84D',
    },
    text: {
      fontSize: 12,
      lineHeight: '20px',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: '7.65px',
      color: '#FFFFFF',
    },
    lineBreak: {
      display: 'block',
    },
    closeWrapper: {
      backgroundColor: '#FFFFFF',
      padding: '23px 0 28px',
      textAlign: 'center',
      borderRadius: '0 0 10px 10px',
    },
    close: {
      fontSize: '16px',
      lineHeight: '50px',
      textAlign: 'center',
      padding: '0 23px',
      color: '#828282',
      backgroundColor: '#FFFFFF',
    },
  })
);

type Props = {
  open: boolean;
  onClose: () => void;
};
const GetPrivilegeModal: React.FC<Props> = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.root}>
        <div className={classes.content}>
          <Image
            src={GetPrivilegeBack}
            alt="GetPrivilegeBack"
            layout="fill"
            objectFit="cover"
          />
          <div className={classes.image}>
            <Image
              src={Group1577}
              alt={'Group1577'}
              width={192.68}
              height={168.22}
            />
          </div>
          <h2 className={classes.title}>特典を獲得しました！</h2>
          <p className={classes.text}>
            マイページ画面下部で獲得した特典を
            <span className={classes.lineBreak}>確認することができます。</span>
          </p>
        </div>
        <div className={classes.closeWrapper}>
          <button className={classes.close} onClick={onClose}>
            閉じる
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GetPrivilegeModal;
