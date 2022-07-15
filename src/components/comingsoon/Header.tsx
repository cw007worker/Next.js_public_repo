import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PantriiIconWhite from '../../../static/PantriiIconWhite.svg';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
      background: 'transparent',
    },
    pink: {
      backgroundColor: '#FF8080',
    },
    black: {
      backgroundColor: '#000000',
    },
    gradation: {
      background:
        'linear-gradient(180deg, rgba(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)',
    },
    toolbar: {
      minHeight: '50px',
      [theme.breakpoints.down('sm')]: {
        minHeight: '65px',
      },
    },
    icon: {
      marginRight: 'auto',
      padding: '0',
      cursor: 'pointer',
    },
    button: {
      boxShadow: 'none',
      background: '#FFFFFF',
      color: '#333333',
      fontSize: '15px',
      fontWeight: 'bold',
      borderRadius: '6px',
      height: '30px',
      padding: '0 5px',
      '&:hover': {
        opacity: '1',
      },
    },
  })
);

type Props = {
  hasLoginButton?: boolean;
  backgroundColor?: 'transparent' | 'pink' | 'black' | 'gradation';
};
const Header: React.FC<Props> = ({
  hasLoginButton = true,
  backgroundColor = 'transparent',
}) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(
        classes.root,
        backgroundColor === 'pink' && classes.pink,
        backgroundColor === 'black' && classes.black,
        backgroundColor === 'gradation' && classes.gradation
      )}
      position="absolute"
    >
      <Toolbar className={classes.toolbar}>
        <Link href="/comingsoon" passHref>
          <div className={classes.icon}>
            <Image
              src={PantriiIconWhite}
              alt={'PantriiIconWhite'}
              width={102}
              height={34.35}
            />
          </div>
        </Link>
        {/* {hasLoginButton && (
          <Link href="/auth/signIn" passHref>
            <button className={classes.button}>ログイン</button>
          </Link>
        )} */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
