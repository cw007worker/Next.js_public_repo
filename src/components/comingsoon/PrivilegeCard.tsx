import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import Check from '../../../static/Check.svg';
import Lock from '../../../static/Lock.svg';
import clsx from 'clsx';
import { Backdrop } from '@material-ui/core';
import PrivilegeDetail from './PrivilegeDetail';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: '5px',
      textAlign: 'center',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      maxWidth: '400px',
      margin: '0 auto',
      background: '#FFFFFF',
    },
    wrapper: {
      position: 'relative',
      padding: '26px 0 11px',
      borderRadius: '10px',
      overflow: 'hidden',
      zIndex: 0,
    },
    lockStatusWrapper: {
      position: 'relative',
      height: '0',
    },
    lockStatus: {
      position: 'absolute',
      bottom: '-20px',
      left: '50%',
      transform: 'translateX(-50%)',
      height: '40px',
      width: '40px',
      border: '2px solid #BDBDBD',
      backgroundColor: '#FFFFFF',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    cardSubTitle: {
      fontSize: '14px',
      lineHeight: '18px',
      fontWeight: 700,
      letterSpacing: '0.25px',
      textAlign: 'center',
      marginBottom: '8px',
    },
    cardTitle: {
      fontSize: '22px',
      lineHeight: '22px',
      fontWeight: 'bold',
      letterSpacing: '0.25px',
      textAlign: 'center',
      marginBottom: '12px',
    },
    lockedColor: {
      color: '#BDBDBD',
    },
    detailButton: {
      padding: '8px 0',
      marginBottom: '10px',
      borderRadius: '3px',
      width: '163px',
      fontSize: '14px',
      lineHeight: '18px',
      fontWeight: 700,
      color: '#333333',
      background: 'transparent',
      border: '1px solid #333333',
    },
    backdrop: {
      zIndex: 2,
    },
    detail: {
      position: 'fixed',
      bottom: '-60vh',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '600px',
      height: '60vh',
      borderRadius: '10px 10px 0 0',
      background: '#FFFFFF',
      transition: '0.3s all',
      zIndex: 2,
    },
    fadeIn: {
      bottom: 0,
    },
    caution: {
      fontSize: 14,
      lineHeight: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      [theme.breakpoints.down(360)]: {
        fontSize: 12,
      },
    },
  })
);

type Props = {
  isLocked: boolean;
  isInviting?: boolean;
  hasDetail: boolean;
  background: any;
  subTitle: string;
  title: string;
  caution?: string;
  detailTitle?: string;
  contentTitle?: string;
  content?: any;
};
const PrivilegeCard: React.FC<Props> = ({
  isLocked,
  isInviting = false,
  hasDetail,
  background,
  subTitle,
  title,
  caution,
  detailTitle,
  contentTitle,
  content,
}) => {
  const classes = useStyles();
  const [top, setTop] = React.useState(0);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const handleOpen = () => {
    setDetailOpen(true);
    // スクロールロック開始の処理
    document.body.style.position = 'fixed';
    document.body.style.top = `-${top}px`;
  };
  const handleClose = () => {
    setDetailOpen(false);
    // スクロールロック解除の処理
    const bodyTop = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(bodyTop || '0') * -1);
  };
  const getScrollTop = () => {
    setTop(
      Math.max(
        window.pageYOffset,
        window.screenTop,
        //@ts-ignore TODO: 修正しよう
        document.scrollingElement.scrollTop,
        document.documentElement.scrollTop,
        document.body.scrollTop
      )
    );
  };
  React.useEffect(() => {
    window.addEventListener('scroll', getScrollTop);
    return () => window.removeEventListener('scroll', getScrollTop);
  });

  return (
    <React.Fragment>
      <div className={classes.lockStatusWrapper}>
        {isLocked ? (
          <div className={classes.lockStatus}>
            <Image src={Lock} alt={'Lock'} height={21} width={16} />
          </div>
        ) : (
          <div className={classes.lockStatus}>
            <Image src={Check} alt={'Check'} height={13.74} width={20} />
          </div>
        )}
      </div>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          {!isLocked && background}
          <p className={classes.cardSubTitle}>{subTitle}</p>
          <h3
            className={clsx(classes.cardTitle, isLocked && classes.lockedColor)}
          >
            {title}
          </h3>
          {caution && <p className={classes.caution}>{caution}</p>}
          {hasDetail && (
            <button className={classes.detailButton} onClick={handleOpen}>
              特典の詳細
            </button>
          )}
        </div>
      </div>
      {hasDetail && (
        <Backdrop
          className={classes.backdrop}
          open={detailOpen}
          onClick={handleClose}
        >
          <div
            className={clsx(classes.detail, detailOpen && classes.fadeIn)}
            onClick={(e) => e.stopPropagation()}
          >
            <PrivilegeDetail
              isLocked={isLocked}
              isInviting={isInviting}
              title={detailTitle || subTitle}
              contentTitle={contentTitle || title}
              handleClose={handleClose}
            >
              {content}
            </PrivilegeDetail>
          </div>
        </Backdrop>
      )}
    </React.Fragment>
  );
};

export default PrivilegeCard;
