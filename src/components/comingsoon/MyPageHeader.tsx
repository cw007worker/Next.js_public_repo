import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PantriiIconWhite from '../../../static/PantriiIconBlack.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Slide, useScrollTrigger } from '@material-ui/core';
import React from 'react';
import LogoutButton from './LogoutButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
      backgroundColor: '#FFFFFF',
    },
    toolbar: {
      minHeight: '50px',
      [theme.breakpoints.down('sm')]: {
        minHeight: '40px',
      },
    },
    icon: {
      padding: '0',
      marginBottom: -6,
      cursor: 'pointer',
      [theme.breakpoints.down(360)]: {
        width: 80,
        height: 26.94,
      },
    },
    title: {
      fontSize: '14px',
      lineHeight: '18px',
      color: '#333333',
      marginLeft: '12px',
      [theme.breakpoints.down(360)]: {
        fontSize: '12px',
      },
    },
    email: {
      marginLeft: 'auto',
      fontSize: '12px',
      padding: '0 5px',
      letterSpacing: '0.38px',
      cursor: 'pointer',
      maxWidth: '34%',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      color: '#333333',
    },
    sama: {
      fontSize: '12px',
      color: '#333333',
    },
    logoutButton: {
      padding: '10px',
      background: '#FFFFFF',
      color: '#333333',
      boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
      zIndex: 1000,
      position: 'fixed',
      right: 0,
      top: '50px',
      [theme.breakpoints.down('sm')]: {
        top: '70px',
      },
    },
  })
);

type MyPageHeaderProps = {
  email: string;
};
const MyPageHeader: React.FC<MyPageHeaderProps> = ({ email }) => {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const [openLogoutButton, setOpenLogoutButton] = React.useState(false);

  return (
    <React.Fragment>
      {/* <Slide appear={false} direction='down' in={!trigger} > */}
      <AppBar className={classes.root} position="absolute">
        <Toolbar className={classes.toolbar}>
          <Link href="" passHref>
            <div className={classes.icon}>
              <Image
                src={PantriiIconWhite}
                alt={'PantriiIconWhite'}
                width={82}
                height={28}
              />
            </div>
          </Link>
          <h2 className={classes.title}>事前登録ページ</h2>
          <p
            className={classes.email}
            onClick={() => setOpenLogoutButton(!openLogoutButton)}
          >
            {email}
          </p>
          <p className={classes.sama}>様</p>
        </Toolbar>
      </AppBar>
      <Slide appear={false} direction="down" in={openLogoutButton}>
        <div className={classes.logoutButton}>
          <LogoutButton />
        </div>
      </Slide>
      {/* </Slide> */}
    </React.Fragment>
  );
};

export default MyPageHeader;
