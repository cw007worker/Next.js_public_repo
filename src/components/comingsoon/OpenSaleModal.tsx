import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import Group1276 from '../../../static/Group1276.png';
import Group1512 from '../../../static/Group1512.png';
import LeftFlag from '../../../static/LeftFlag.png';
import RightFlag from '../../../static/RightFlag.png';
import LeftCloud from '../../../static/LeftCloud.png';
import RightCloud from '../../../static/RightCloud.png';
import { Modal } from '@material-ui/core';
import CloseButton from 'components/comingsoon/CloseButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      padding: '10px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
    close: {
      position: 'absolute',
      right: '0',
      top: '0',
      zIndex: 1,
    },
    root: {
      borderRadius: '10px',
      width: '340px',
      backgroundColor: '#FFC542',
      position: 'relative',
      padding: '0 12px 35px',
      overflow: 'hidden',
      zIndex: 0,
      [theme.breakpoints.down(360)]: {
        padding: '30px 12px 20px',
        width: '300px',
      },
    },
    leftFlag: {
      position: 'absolute',
      width: '121.59px',
      height: '91.19px',
      left: '0',
      top: '0',
    },
    rightFlag: {
      position: 'absolute',
      width: '121.59px',
      height: '91.19px',
      right: '0',
      top: '0',
    },
    leftCloud: {
      position: 'absolute',
      width: '164.13px',
      height: '123.1px',
      left: '0',
      bottom: '-3px',
      opacity: 0.7,
      zIndex: -1,
    },
    rightCloud: {
      position: 'absolute',
      width: '164.13px',
      height: '123.1px',
      right: '0',
      bottom: '-3px',
      opacity: 0.7,
      zIndex: -1,
    },
    products: {
      textAlign: 'center',
      marginBottom: 20,
    },
    title: {
      textAlign: 'center',
    },
    titleLineBreak: {
      display: 'block',
      letterSpacing: '10px',
    },
    text: {
      fontSize: '16px',
      lineHeight: '24px',
      textAlign: 'center',
      marginBottom: '12px',
      [theme.breakpoints.down(360)]: {
        fontSize: '12px',
      },
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
  introducingFriend: () => void;
};
const OpenSaleModal: React.FC<Props> = ({
  open,
  onClose,
  introducingFriend,
}) => {
  const classes = useStyles();
  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.wrapper}>
        <CloseButton onClick={onClose} className={classes.close} />
        <div className={classes.root}>
          <div className={classes.leftFlag}>
            <Image src={LeftFlag} alt={'LeftFlag'} />
          </div>
          <div className={classes.rightFlag}>
            <Image src={RightFlag} alt={'RightFlag'} />
          </div>
          <div className={classes.leftCloud}>
            <Image src={LeftCloud} alt={'LeftCloud'} />
          </div>
          <div className={classes.rightCloud}>
            <Image src={RightCloud} alt={'RightCloud'} />
          </div>
          <h2 className={classes.title}>
            <Image
              src={Group1512}
              alt="Group1512"
              height={161.39}
              width={201.91}
            />
          </h2>
          <div className={classes.products}>
            <Image
              src={Group1276}
              alt="Group1276"
              height={134.98}
              width={163.73}
            />
          </div>
          <p className={classes.text}>
            友達紹介ランキング上位の方からご入場していただき、一円でご購入が可能になります。
          </p>
          <div className={classes.buttonWrapper}>
            <button
              className={classes.button}
              onClick={() => {
                onClose();
                introducingFriend();
              }}
            >
              友達紹介のやり方
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OpenSaleModal;
